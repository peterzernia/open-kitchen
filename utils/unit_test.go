package utils

import (
	"errors"
	"testing"

	"github.com/peterzernia/open-kitchen/models"
	"github.com/stretchr/testify/assert"
)

func TestInitDB(t *testing.T) {
	require := assert.New(t)

	db, err := InitDB()
	require.NoError(err)

	err = db.AutoMigrate(&models.User{}, &models.Recipe{}).Error
	require.NoError(err)

	db.Close()
}

func TestParseUserDBError(t *testing.T) {
	require := assert.New(t)

	err := errors.New(`pq: duplicate key value violates unique constraint "users_email_key"`)
	message := ParseUserDBError(err)
	require.Equal(message, "A user registered with that email already exists")

	err = errors.New(`pq: duplicate key value violates unique constraint "users_username_key"`)
	message = ParseUserDBError(err)
	require.Equal(message, "A user with that username already exists")

	err = errors.New("error")
	message = ParseUserDBError(err)
	require.Equal(message, "Yike! Error")
}

func TestGenerateRandomBytes(t *testing.T) {
	require := assert.New(t)

	b, err := GenerateRandomBytes(0)
	require.NoError(err)
	require.Equal(b, []uint8([]byte{}))

	b, err = GenerateRandomBytes(36)
	require.NoError(err)
	require.Equal(len(b), 36)
}

func TestGenerateRandomString(t *testing.T) {
	require := assert.New(t)

	str, err := GenerateRandomString(0)
	require.NoError(err)
	require.Equal(str, "")

	str, err = GenerateRandomString(36)
	require.NoError(err)
	require.Equal(len(str), 48)
}
