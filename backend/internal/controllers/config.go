package controllers

import (
	"path/filepath"
	"reactGoTemplate/backend/internal/service"
	"reactGoTemplate/backend/pkg/auth"
	"time"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

type Controllers struct {
	auth    *auth.Auth
	service *service.Service
	eng     *gin.Engine
}

func RegisterControllers(eng *gin.Engine, auth *auth.Auth, service *service.Service) (controllers *Controllers, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()

	c := &Controllers{
		eng:     eng,
		auth:    auth,
		service: service,
	}

	eng.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	err = c.AuthController()
	if err != nil {
		return
	}

	eng.Use(auth.JWTMiddleware())

	err = c.HomeController()
	if err != nil {
		return
	}

	err = c.APIController()
	if err != nil {
		return
	}

	frontend, _ := filepath.Abs("frontend/build")
	eng.NoRoute(func(c *gin.Context) {
		c.File(filepath.Join(frontend, "index.html"))
	})

	return c, err
}

func (c *Controllers) APIController() (err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()

	api := c.eng.Group("/api")
	{
		api.GET("/me", c.GetUser)
		api.PUT("/me/avatar", c.UpdateAvatar)
	}

	return
}
