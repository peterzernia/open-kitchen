package recipe

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/peterzernia/open-kitchen/models"
	"github.com/peterzernia/open-kitchen/utils"
)

func handleCreate(c *gin.Context) {
	recipe := models.Recipe{}
	db := utils.GetDB()

	user, err := utils.GetAuthenticatedUser(c, db)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Credentials",
		})
		return
	}

	if err := c.BindJSON(&recipe); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Validation Error",
		})
		return
	}

	slug, err := utils.GenerateRandomString(16)

	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	recipe.AuthorID = user.ID
	recipe.Author = &user
	recipe.Slug = &slug

	recipe, err = createRecipe(db, recipe)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Yike! Error",
		})
		return
	}

	c.JSON(http.StatusOK, recipe)
}

func handleGet(c *gin.Context) {
	db := utils.GetDB()
	slug := c.Param("slug")

	recipe, err := getRecipe(db, slug)

	if err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, recipe)
}

func handleUpdate(c *gin.Context) {
	db := utils.GetDB()
	slug := c.Param("slug")

	recipe, err := getRecipe(db, slug)

	if err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	user, err := utils.GetAuthenticatedUser(c, db)

	if err != nil || *user.ID != *recipe.AuthorID {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Credentials",
		})
		return
	}

	if err := c.BindJSON(&recipe); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Validation Error",
		})
		return
	}

	if err = db.Omit("id").Omit("created_at").Omit("author_id").Omit("slug").Save(&recipe).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, recipe)
}

func handleDelete(c *gin.Context) {
	db := utils.GetDB()
	slug := c.Param("slug")

	recipe, err := getRecipe(db, slug)

	if err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	user, err := utils.GetAuthenticatedUser(c, db)

	if err != nil || *user.ID != *recipe.AuthorID {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Credentials",
		})
		return
	}

	err = deleteRecipe(db, slug)

	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
	return
}

func searchRecipes(c *gin.Context) {
	q, ok := c.GetQuery("q")
	db := utils.GetDB()

	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Please provide a valide query parameter",
		})
	}

	recipes, err := getRecipesByQuery(db, q)

	if err != nil {
		c.Status(http.StatusInternalServerError)
	}

	c.JSON(http.StatusOK, recipes)
}

func handleGetByUser(c *gin.Context) {
	db := utils.GetDB()
	username := c.Param("username")

	recipes, err := getRecipesByUser(db, username)

	if err != nil {
		c.Status(http.StatusInternalServerError)
	}

	c.JSON(http.StatusOK, recipes)
}
