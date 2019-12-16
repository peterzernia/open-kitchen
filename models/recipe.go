package models

import "time"

// Recipe represents a cooking recipe
type Recipe struct {
	ID        *int64     `json:"id"`
	CreatedAt *time.Time `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at,omitempty"`

	Author       *User   `json:"author" gorm:"save_associations:false"`
	AuthorID     *int64  `json:"author_id"`
	Ingredients  *string `json:"ingredients" binding:"required"`
	Instructions *string `json:"instructions" binding:"required"`
	Slug         *string `json:"slug"`
	Title        *string `json:"title" binding:"required"`
}
