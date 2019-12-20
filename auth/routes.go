package auth

import (
	"github.com/gin-gonic/gin"
)

// InitializeRoutes initializes routes for the App
func InitializeRoutes(r *gin.RouterGroup) {
	auth := r.Group("/auth")

	auth.POST("/register", handleRegistration)
	auth.POST("/login", handleLogin)
	auth.POST("/logout", handleLogout)
	auth.PUT("/user", handleUpdateUser)
	auth.GET("/user", handleGetUser)
	auth.POST("/password/change", handlePasswordChange)
}
