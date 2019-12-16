package recipe

import (
	"fmt"
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

	slug, _ := utils.GenerateRandomString(16)

	recipe.AuthorID = user.ID
	recipe.Author = &user
	recipe.Slug = &slug

	if err := db.Create(&recipe).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Oops! Something went wrong",
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

func searchRecipes(c *gin.Context) {
	q, ok := c.GetQuery("q")
	db := utils.GetDB()

	fmt.Println(q)

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
