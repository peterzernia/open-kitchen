package utils

import (
	"errors"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/peterzernia/open-kitchen/models"
	"golang.org/x/crypto/bcrypt"
)

// HashAndSalt hashes and salts a password
func HashAndSalt(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}

// ComparePasswords compares a hash with a password
func ComparePasswords(hashedPwd string, plainPwd string) error {
	byteHash := []byte(hashedPwd)
	bytePlain := []byte(plainPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, bytePlain)
	return err
}

// ParseUserDBError parses the error returned from Postgres
// when a unique kep exists
func ParseUserDBError(err error) string {
	var message string

	if strings.HasSuffix(err.Error(), "username_key\"") {
		message = "A user with that username already exists"
	} else if strings.HasSuffix(err.Error(), "email_key\"") {
		message = "A user registered with that email already exists"
	} else {
		message = "Yike! Error"
	}

	return message
}

// GetAuthenticatedUser returns the User making a request
// based on the authentication token provided in the
// Authorization header.
func GetAuthenticatedUser(c *gin.Context, db *gorm.DB) (models.User, error) {
	user := models.User{}
	token := c.GetHeader("Authorization")

	if token == "" {
		return user, errors.New("Invalid token")
	}

	if err := db.Where("token = ?", token).First(&user).Error; err != nil {
		return user, err
	}

	return user, nil
}
