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

	c.eng.GET("/login", c.Login)
	c.eng.POST("/logout", c.Logout)

	auth := c.eng.Group("/auth")
	{
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
