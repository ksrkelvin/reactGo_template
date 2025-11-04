package controllers

import (
	"reactGoTemplate/backend/internal/dto"

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
		auth.POST("/login", c.Login)
		auth.POST("/register", c.Register)
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

	var req dto.UserLoginRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	user, status, err := a.service.LoginUser(req)
	if err != nil {
		ctx.JSON(status, gin.H{"error": err.Error()})
		return
	}

	tokenJWT, err := a.auth.GenerateJWT(user.Email, "diino-app")
	if err != nil {
		ctx.String(500, "Erro ao gerar token JWT")
		return
	}

	ctx.SetCookie("X_AUTH", tokenJWT, 3600*24, "/", "", false, true)

	ctx.JSON(200, gin.H{
		"user":     user,
		"message":  "Login successful",
		"redirect": "/",
	})
}

func (a *Controllers) Register(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.String(500, "Erro inesperado: "+err.Error())
		}
	}()

	var req dto.UserCreateRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	user, status, err := a.service.CreateUser(req)
	if err != nil {
		ctx.JSON(status, gin.H{"error": err.Error()})
		return
	}

	tokenJWT, err := a.auth.GenerateJWT(user.Email, "diino-app")
	if err != nil {
		ctx.String(500, "Erro ao gerar token JWT")
		return
	}

	ctx.SetCookie("X_AUTH", tokenJWT, 3600*24, "/", "", false, true)

	ctx.JSON(200, gin.H{
		"user":     user,
		"message":  "Registration successful",
		"redirect": "/",
	})
}
