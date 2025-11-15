package service

import (
	"fmt"
	"net/http"
	"reactGoTemplate/backend/internal/dto"

	"github.com/gin-gonic/gin"
)

func (s *Service) GetUser(ctx *gin.Context) (userDto dto.UserResponse, status int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()
	userSection, status, err := s.GetUserFromContext(ctx)
	if err != nil {
		return userDto, http.StatusInternalServerError, err
	}

	userResponse := dto.UserResponse{
		ID:     userSection.ID,
		Name:   userSection.Name,
		Email:  userSection.Email,
		Avatar: userSection.Avatar,
	}

	return userResponse, http.StatusOK, err
}

func (s *Service) UpdateAvatar(ctx *gin.Context, avatarUpdate dto.AvatarUpdateRequest) (userDto dto.UserResponse, status int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()
	userSection, status, err := s.GetUserFromContext(ctx)
	if err != nil {
		return userDto, status, err
	}

	if userSection.ID == 0 {
		return userDto, http.StatusNotFound, fmt.Errorf("User not found")
	}

	if avatarUpdate.Avatar == "" {
		return userDto, http.StatusBadRequest, fmt.Errorf("Avatar URL cannot be empty")
	}

	err = s.Repository.UpdateAvatar(userSection.ID, avatarUpdate.Avatar)
	if err != nil {
		return userDto, http.StatusInternalServerError, err
	}
	userSection.Avatar = avatarUpdate.Avatar

	return userSection, http.StatusOK, err
}

func (s *Service) GetUserFromContext(c *gin.Context) (userDto dto.UserResponse, status int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()
	user, exists := c.Get("user")
	if !exists || user == nil {
		return dto.UserResponse{}, http.StatusNotFound, fmt.Errorf("User not found in context")
	}

	u, ok := user.(dto.UserResponse)
	if !ok {
		return dto.UserResponse{}, http.StatusInternalServerError, fmt.Errorf("User not found in context")
	}

	return u, http.StatusOK, err
}
