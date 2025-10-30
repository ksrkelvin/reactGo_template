package main

import (
	"log"
	"path/filepath"
	"reactGoTemplate/backend/config"
	"reactGoTemplate/backend/internal/controllers"

	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()

	frontend, _ := filepath.Abs("frontend/build")
	r.Static("/static", filepath.Join(frontend, "static"))

	diino, err := config.Init(r)
	if err != nil {
		log.Fatal("❌ Erro ao tentar inciar diino: ", err.Error())
	}

	diino.Controllers, err = controllers.RegisterControllers(r, diino.Auth, diino.Service)
	if err != nil {
		log.Fatal("⚠️  Não foi possivel inicializar sistemas de services")
	}

	err = r.Run(":8080")
	if err != nil {
		log.Fatal("❌ Erro ao iniciar server: ", err.Error())
	}

	log.Println("🚀 Servidor rodando em http://localhost:8080")

}
