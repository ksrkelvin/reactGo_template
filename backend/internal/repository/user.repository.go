package repository

import (
	"errors"
	"reactGoTemplate/backend/internal/dto"
	"reactGoTemplate/backend/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func (r *Repository) CreateUser(user dto.UserCreateRequest) (userModel models.User, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return userModel, err
	}

	newUser := models.User{
		Name:     user.Name,
		Email:    user.Email,
		Password: string(hashedPassword),
	}

	if err := r.DB.Create(&newUser).Error; err != nil {
		return userModel, err
	}

	return newUser, nil
}

func (r *Repository) GetUserByEmail(email string) (userModel models.User, err error) {
	var user models.User
	if err := r.DB.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return models.User{}, nil
		}
		return models.User{}, err
	}
	return user, nil
}

func (r *Repository) CheckPassword(hash string, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

func (r *Repository) UpdateUser(user models.User) error {
	result := r.DB.Save(&user)
	return result.Error
}
