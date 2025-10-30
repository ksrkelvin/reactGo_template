package controllers

import (
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func (c *Controllers) HomeController() (err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()

	c.eng.GET("/", c.GetHome)

	return
}

func (c *Controllers) GetHome(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.String(500, "Erro inesperado: "+err.Error())
		}
	}()
	frontend, _ := filepath.Abs("frontend/build")
	ctx.File(filepath.Join(frontend, "index.html"))

}
