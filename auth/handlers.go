package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/peterzernia/project/models"
	"github.com/peterzernia/project/utils"
)

func handleRegistration(c *gin.Context) {
	var auth models.Auth
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

	if err := db.Create(&user).Error; err != nil {
		message := utils.ParseUserDBError(err)

		c.JSON(http.StatusBadRequest, gin.H{
			"message": message,
		})
		return
	}

	c.JSON(http.StatusOK, user)
}

func handleLogin(c *gin.Context) {
	var auth models.Auth
	var user models.User
	if err := c.BindJSON(&auth); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	db := utils.GetDB()

	db.Where("username = ?", auth.Username).First(&user)

	err := utils.ComparePasswords(user.Password, auth.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid credentials",
		})
		return
	}

	if user.Token == "" {
		token, _ := utils.GenerateRandomString(32)
		user.Token = token
		db.Save(&user)
	}

	c.JSON(http.StatusOK, user)
}

func handleLogout(c *gin.Context) {
	var user models.User
	db := utils.GetDB()

	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid credentials",
		})
		return
	}

	if err := db.Where("token = ?", token).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invailid credentials",
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
	var auth models.Auth
	var user models.User
	if err := c.BindJSON(&auth); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Validation Error",
		})
		return
	}

	db := utils.GetDB()

	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid credentials",
		})
		return
	}

	if err := db.Where("token = ?", token).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invailid credentials",
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
	db.Save(&user)

	c.Status(http.StatusOK)
}

func handleUpdateUser(c *gin.Context) {
	var auth models.Auth
	var user models.User
	if err := c.BindJSON(&auth); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Validation Error",
		})
		return
	}
	db := utils.GetDB()

	token := c.GetHeader("Authorization")

	if err := db.Where("token = ?", token).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invailid credentials",
		})
		return
	}

	if auth.Username != "" {
		user.Username = auth.Username
	}
	if auth.Email != "" {
		user.Email = auth.Email
	}

	if err := db.Save(&user).Error; err != nil {
		message := utils.ParseUserDBError(err)

		c.JSON(http.StatusBadRequest, gin.H{
			"message": message,
		})
		return
	}

	c.JSON(http.StatusOK, user)
}

func handleGetUser(c *gin.Context) {
	var user models.User
	db := utils.GetDB()

	token := c.GetHeader("Authorization")

	if err := db.Where("token = ?", token).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invailid credentials",
		})
		return
	}

	c.JSON(http.StatusOK, user)
}
