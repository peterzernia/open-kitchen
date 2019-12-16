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
