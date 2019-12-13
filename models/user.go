package models

import "time"

// User ...
type User struct {
	ID        *int64     `json:"id"`
	CreatedAt *time.Time `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at,omitempty"`
	Email     string     `json:"email" gorm:"unique;not null"`
	Password  string     `json:"-"`
	Token     string     `json:"token" gorm:"unique"`
	Username  string     `json:"username" gorm:"unique;not null"`
}
