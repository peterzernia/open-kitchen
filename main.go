package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/peterzernia/open-kitchen/auth"
	"github.com/peterzernia/open-kitchen/models"
	"github.com/peterzernia/open-kitchen/recipe"
	"github.com/peterzernia/open-kitchen/utils"
)

func main() {
	db, err := utils.InitDB()
	if err != nil {
		log.Println(err)
	}

	db.AutoMigrate(
		&models.User{}, &models.Recipe{},
	)
	defer db.Close()

	router := gin.Default()

	config := cors.DefaultConfig()
	config.AddAllowHeaders("Authorization")
	config.AllowOrigins = []string{"*"}

	router.Use(cors.New(config))

	api := router.Group("/api/v1")
	auth.InitializeRoutes(api)
	recipe.InitializeRoutes(api)
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
