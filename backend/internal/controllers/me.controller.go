package controllers

import (
	"reactGoTemplate/backend/internal/dto"

	"github.com/gin-gonic/gin"
)

func (c *Controllers) MeController() (err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()

	api := c.eng.Group("/api")
	{
		api.GET("/me", c.GetUser)
		api.PUT("/me", c.UpdateUser)
	}

	return
}

func (c *Controllers) GetUser(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.String(500, "Erro inesperado: "+err.Error())
		}
	}()

	var user, status, err = c.service.GetUser(ctx)
	if err != nil {
		ctx.JSON(status, "User Not Found")
		return
	}

	ctx.JSON(200, user)

}

func (c *Controllers) UpdateUser(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.String(500, "Erro inesperado: "+err.Error())
		}
	}()

	var _ = dto.UserUpdateRequest{}

}
