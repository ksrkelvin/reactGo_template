package controllers

import (
	"github.com/gin-gonic/gin"
)

func (c *Controllers) AuthController() (err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()

	auth := c.eng.Group("/auth")
	{
		auth.GET("/login", c.Login)
		auth.POST("/logout", c.Logout)

		google := auth.Group("/google")
		{
			google.GET("/", c.auth.GoogleLogin)
			google.GET("/callback", c.auth.GoogleCallback)
		}
	}
	return
}

func (a *Controllers) Logout(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.String(500, "Erro inesperado: "+err.Error())
		}
	}()

}

func (a *Controllers) Login(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.String(500, "Erro inesperado: "+err.Error())
		}
	}()

}
