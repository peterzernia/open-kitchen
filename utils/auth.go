package utils

import (
	"log"
	"strings"

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
		message = "Oops! Something went wrong"
	}

	return message
}
