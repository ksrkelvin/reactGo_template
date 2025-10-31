package controllers

import (
	"path/filepath"
	"reactGoTemplate/backend/internal/service"
	"reactGoTemplate/backend/pkg/auth"

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

	err = c.AuthController()
	if err != nil {
		return
	}

	eng.Use(auth.JWTMiddleware())

	err = c.HomeController()
	if err != nil {
		return
	}

	err = c.MeController()
	if err != nil {
		return
	}

	frontend, _ := filepath.Abs("frontend/build")
	eng.NoRoute(func(c *gin.Context) {
		c.File(filepath.Join(frontend, "index.html"))
	})

	return c, err
}
