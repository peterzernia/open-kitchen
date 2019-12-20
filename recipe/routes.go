package recipe

import (
	"github.com/gin-gonic/gin"
)

// InitializeRoutes initializes routes for the App
func InitializeRoutes(r *gin.RouterGroup) {
	recipes := r.Group("/recipes")

	r.GET("/users/:username/recipes", handleGetByUser)
	recipes.POST("", handleCreate)
	recipes.GET("/:slug", handleGet)
	recipes.PUT("/:slug", handleUpdate)
	recipes.DELETE("/:slug", handleDelete)
	recipes.GET("", searchRecipes)
}
