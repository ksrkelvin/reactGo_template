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

	me := c.eng.Group("/me")
	{
		me.GET("/", c.GetUser)
		me.PUT("/", c.UpdateUser)
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

	var _ = dto.UserUpdateRequest{}

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
