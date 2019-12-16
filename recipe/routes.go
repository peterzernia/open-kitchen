package recipe

import (
	"github.com/gin-gonic/gin"
)

// InitializeRoutes initializes routes for the App
func InitializeRoutes(r *gin.RouterGroup) {
	r.POST("", handleCreate)
	r.GET("/:slug", handleGet)
	r.PUT("/:slug", handleUpdate)
	r.DELETE("/:slug", handleDelete)
	r.GET("", searchRecipes)
}
