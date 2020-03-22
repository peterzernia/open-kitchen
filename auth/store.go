package auth

import (
	"github.com/jinzhu/gorm"
	"github.com/peterzernia/open-kitchen/models"
)

func createUser(db *gorm.DB, user models.User) error {
	return db.Create(&user).Error
}

func getUser(db *gorm.DB, username string) (models.User, error) {
	user := models.User{}
	err := db.Where("username = ?", username).First(&user).Error
	return user, err
}

func updateUser(db *gorm.DB, user models.User) error {
	return db.Save(&user).Error
}
