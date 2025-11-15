package repository

import (
	"errors"
	"reactGoTemplate/backend/internal/models"

	"gorm.io/gorm"
)

func (r *Repository) CreateUser(user models.User) (userModel models.User, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()

	if err := r.DB.Create(&user).Error; err != nil {
		return userModel, err
	}

	return user, nil
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

func (r *Repository) UpdateAvatar(userID uint, avatar string) error {
	return r.DB.Model(&models.User{}).Where("id = ?", userID).Update("avatar", avatar).Error
}
