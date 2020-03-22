package utils

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseUserDBError(t *testing.T) {
	expect := assert.New(t)

	err := errors.New(`pq: duplicate key value violates unique constraint "users_email_key"`)
	message := ParseUserDBError(err)
	expect.Equal(message, "A user registered with that email already exists")

	err = errors.New(`pq: duplicate key value violates unique constraint "users_username_key"`)
	message = ParseUserDBError(err)
	expect.Equal(message, "A user with that username already exists")

	err = errors.New("error")
	message = ParseUserDBError(err)
	expect.Equal(message, "Yike! Error")
}

func TestGenerateRandomBytes(t *testing.T) {
	expect := assert.New(t)

	b, err := GenerateRandomBytes(0)
	expect.NoError(err)
	expect.Equal(b, []uint8([]byte{}))

	b, err = GenerateRandomBytes(36)
	expect.NoError(err)
	expect.Equal(len(b), 36)
}

func TestGenerateRandomString(t *testing.T) {
	expect := assert.New(t)

	str, err := GenerateRandomString(0)
	expect.NoError(err)
	expect.Equal(str, "")

	str, err = GenerateRandomString(36)
	expect.NoError(err)
	expect.Equal(len(str), 48)
}
