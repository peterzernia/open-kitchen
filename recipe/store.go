package recipe

import (
	"github.com/jinzhu/gorm"
	"github.com/peterzernia/open-kitchen/models"
)

func getRecipe(db *gorm.DB, slug string) (models.Recipe, error) {
	recipe := models.Recipe{}

	err := db.Preload("Author").Where("slug = ?", slug).First(&recipe).Error

	return recipe, err
}

func getRecipesByQuery(db *gorm.DB, q string) ([]models.Recipe, error) {
	recipes := []models.Recipe{}
	err := db.Preload("Author").
		Select("*").
		Joins("LEFT JOIN users ON users.id = recipes.author_id").
		Where("recipes.title LIKE ? OR users.username LIKE ?", q, q).
		Find(&recipes).Error
	return recipes, err
}
