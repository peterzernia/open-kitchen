package utils

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"

	//
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// DB ...
var DB *gorm.DB

// InitDB ...
func InitDB() *gorm.DB {
	db, err := gorm.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Println(err)
	}
	DB = db
	return DB
}

// GetDB ...
func GetDB() *gorm.DB {
	return DB
}
