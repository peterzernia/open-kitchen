package utils

import (
	"os"

	"github.com/jinzhu/gorm"

	//
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// DB ...
var DB *gorm.DB

// InitDB ...
func InitDB() (*gorm.DB, error) {
	db, err := gorm.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		return nil, err
	}
	DB = db
	return DB, nil
}

// GetDB ...
func GetDB() *gorm.DB {
	return DB
}
