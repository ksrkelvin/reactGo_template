package controllers

import (
	"fmt"
	"reactGoTemplate/backend/internal/dto"

	"github.com/gin-gonic/gin"
)

func (c *Controllers) GetUser(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.JSON(500, gin.H{"error": err.Error()})
		}
	}()

	var user, status, err = c.service.GetUser(ctx)
	if err != nil {
		ctx.JSON(status, "User Not Found")
		return
	}

	ctx.JSON(200, user)

}

func (c *Controllers) UpdateAvatar(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.JSON(500, gin.H{"error": err.Error()})
		}
	}()
	var avatarUpdate dto.AvatarUpdateRequest
	if err := ctx.ShouldBindJSON(&avatarUpdate); err != nil {
		ctx.JSON(400, gin.H{"error": fmt.Sprintf("Invalid request data: %v", err)})
		return
	}

	fmt.Println(avatarUpdate.Avatar)

	var user, status, err = c.service.UpdateAvatar(ctx, avatarUpdate)
	if err != nil {
		ctx.JSON(status, err.Error())
		return
	}

	ctx.JSON(200, user)
}
