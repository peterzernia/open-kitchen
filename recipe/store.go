package recipe

import (
	"github.com/jinzhu/gorm"
	"github.com/peterzernia/open-kitchen/models"
	"strings"
)

func createRecipe(db *gorm.DB, recipe models.Recipe) (models.Recipe, error) {
	err := db.Create(&recipe).Error
	return recipe, err
}

func getRecipe(db *gorm.DB, slug string) (models.Recipe, error) {
	recipe := models.Recipe{}

	err := db.Preload("Author").Where("slug = ?", slug).First(&recipe).Error

	return recipe, err
}

func deleteRecipe(db *gorm.DB, slug string) error {
	err := db.Where("slug = ?", slug).Delete(models.Recipe{}).Error
	return err
}

func getRecipesByQuery(db *gorm.DB, q string) ([]models.Recipe, error) {
	recipes := []models.Recipe{}
	query := "%" + strings.ToLower(q) + "%"

	err := db.Preload("Author").
		Select("*").
		Joins("LEFT JOIN users ON users.id = recipes.author_id").
		Where("lower(recipes.title) LIKE ? OR lower(users.username) LIKE ?", query, query).
		Find(&recipes).Error
	return recipes, err
}

func getRecipesByUser(db *gorm.DB, username string) ([]models.Recipe, error) {
	recipes := []models.Recipe{}

	err := db.Preload("Author").
		Select("*").
		Joins("LEFT JOIN users ON users.id = recipes.author_id").
		Where("users.username = ?", username).
		Find(&recipes).Error

	return recipes, err
}
