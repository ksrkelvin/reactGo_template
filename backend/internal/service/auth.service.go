package service

import (
	"fmt"
	"net/http"
	"reactGoTemplate/backend/internal/dto"
	"reactGoTemplate/backend/internal/models"
	"reactGoTemplate/backend/pkg/utils"
)

func (s *Service) CreateUser(createUser dto.UserCreateRequest) (userDto dto.UserResponse, status int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()

	userExists, err := s.Repository.GetUserByEmail(createUser.Email)
	if err != nil {
		return userDto, http.StatusInternalServerError, err
	}
	if userExists.ID != 0 {
		return userDto, http.StatusBadRequest, fmt.Errorf("User with email %s already exists", createUser.Email)
	}

	hashedPassword, err := utils.HashPassword(createUser.Password)
	if err != nil {
		return userDto, http.StatusInternalServerError, err
	}

	newUser := models.User{
		Name:     createUser.Name,
		Email:    createUser.Email,
		Password: string(hashedPassword),
	}
	user, err := s.Repository.CreateUser(newUser)
	if err != nil {
		return userDto, http.StatusInternalServerError, err
	}
	userDto = dto.UserResponse{
		ID:     user.ID,
		Name:   user.Name,
		Email:  user.Email,
		Avatar: user.Avatar,
	}

	return userDto, http.StatusCreated, err
}

func (s *Service) LoginUser(loginRequest dto.UserLoginRequest) (userDto dto.UserResponse, status int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()

	userExists, err := s.Repository.GetUserByEmail(loginRequest.Email)
	if err != nil {
		return userDto, http.StatusInternalServerError, err
	}
	if userExists.ID == 0 {
		return userDto, http.StatusBadRequest, fmt.Errorf("User with email %s does not exist", loginRequest.Email)
	}

	if !utils.CheckPassword(userExists.Password, loginRequest.Password) {
		return userDto, http.StatusUnauthorized, fmt.Errorf("Email or password is incorrect")
	}

	userDto = dto.UserResponse{
		ID:     userExists.ID,
		Name:   userExists.Name,
		Email:  userExists.Email,
		Avatar: userExists.Avatar,
	}

	return userDto, http.StatusOK, nil
}
