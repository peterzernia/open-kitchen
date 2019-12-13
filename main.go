package main

import (
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/peterzernia/project/auth"
	"github.com/peterzernia/project/models"
	"github.com/peterzernia/project/utils"
)

func main() {
	db := utils.InitDB()
	db.AutoMigrate(&models.User{})
	defer db.Close()

	router := gin.Default()

	config := cors.DefaultConfig()
	config.AddAllowHeaders("Authorization")
	config.AllowOrigins = []string{"*"}

	router.Use(cors.New(config))

	api := router.Group("/api/v1")
	auth.InitializeRoutes(api.Group("/auth"))
	api.GET("/health", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	// Catch all routes for React-Router
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))
	router.NoRoute(func(c *gin.Context) {
		c.File("./client/build/index.html")
	})

	port := ":" + os.Getenv("PORT")
	router.Run(port)
}
