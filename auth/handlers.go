package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/peterzernia/open-kitchen/models"
	"github.com/peterzernia/open-kitchen/utils"
)

func userWithToken(user models.User) gin.H {
	return gin.H{
		"id":         user.ID,
		"created_at": user.CreatedAt,
		"updated_at": user.UpdatedAt,
		"email":      user.Email,
		"username":   user.Username,
		"token":      user.Token,
	}
}

func handleRegistration(c *gin.Context) {
	auth := models.Auth{}
	if err := c.BindJSON(&auth); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Validation Error",
		})
		return
	}

	db := utils.GetDB()

	password := utils.HashAndSalt([]byte(auth.Password1))
	token, _ := utils.GenerateRandomString(32)

	user := models.User{
		Email:    auth.Email,
		Username: auth.Username,
		Password: password,
		Token:    token,
	}

	if err := createUser(db, user); err != nil {
		message := utils.ParseUserDBError(err)

		c.JSON(http.StatusBadRequest, gin.H{
			"message": message,
		})
		return
	}

	c.JSON(http.StatusOK, userWithToken(user))
}

func handleLogin(c *gin.Context) {
	auth := models.Auth{}
	if err := c.BindJSON(&auth); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	db := utils.GetDB()

	user, err := getUser(db, auth.Username)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Could not find user",
		})
		return
	}

	err = utils.ComparePasswords(user.Password, auth.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid credentials",
		})
		return
	}

	if user.Token == "" {
		token, _ := utils.GenerateRandomString(32)
		user.Token = token
		if err := updateUser(db, user); err != nil {
			c.Status(http.StatusInternalServerError)
			return
		}
	}

	c.JSON(http.StatusOK, userWithToken(user))
}

func handleLogout(c *gin.Context) {
	user := models.User{}
	db := utils.GetDB()

	user, err := utils.GetAuthenticatedUser(c, db)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Credentials",
		})
		return
	}

	user.Token = ""
	if err := db.Save(&user).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
	return
}

func handlePasswordChange(c *gin.Context) {
	auth := models.Auth{}
	if err := c.BindJSON(&auth); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Validation Error",
		})
		return
	}

	db := utils.GetDB()

	user, err := utils.GetAuthenticatedUser(c, db)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Credentials",
		})
		return
	}

	if err := utils.ComparePasswords(user.Password, auth.Password); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid credentials",
		})
		return
	}

	password := utils.HashAndSalt([]byte(auth.Password1))
	user.Password = password
	if err := updateUser(db, user); err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

func handleUpdateUser(c *gin.Context) {
	auth := models.Auth{}
	if err := c.BindJSON(&auth); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Validation Error",
		})
		return
	}
	db := utils.GetDB()

	user, err := utils.GetAuthenticatedUser(c, db)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Credentials",
		})
		return
	}

	if auth.Username != "" {
		user.Username = auth.Username
	}
	if auth.Email != "" {
		user.Email = auth.Email
	}

	if err := updateUser(db, user); err != nil {
		message := utils.ParseUserDBError(err)

		c.JSON(http.StatusBadRequest, gin.H{
			"message": message,
		})
		return
	}

	c.JSON(http.StatusOK, user)
}

func handleGetUser(c *gin.Context) {
	db := utils.GetDB()

	user, err := utils.GetAuthenticatedUser(c, db)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Credentials",
		})
		return
	}

	c.JSON(http.StatusOK, user)
}
