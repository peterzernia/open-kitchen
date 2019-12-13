package models

// Auth ..
type Auth struct {
	Email     string `json:"email" binding:"omitempty,email"`
	Password  string `json:"password"`
	Password1 string `json:"password1" binding:"omitempty,gt=6"`
	Password2 string `json:"password2" binding:"omitempty,eqfield=Password1"`
	Username  string `json:"username"`
}
