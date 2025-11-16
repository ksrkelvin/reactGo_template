package config

import (
	"log"
	"orcamental/backend/internal/controllers"
	"orcamental/backend/internal/repository"
	"orcamental/backend/internal/service"
	"orcamental/backend/pkg/auth"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type Diino struct {
	DB          *gorm.DB
	Routes      *gin.Engine
	Auth        *auth.Auth
	Controllers *controllers.Controllers
	Repository  *repository.Repository
	Service     *service.Service
}

func Init(r *gin.Engine) (diino *Diino, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = r.(error)
		}
	}()
	if err := godotenv.Load(); err != nil {
		log.Fatal("⚠️  Nenhum .env encontrado, usando variáveis do ambiente")
	}

	d := &Diino{}
	if err = d.ConnectDB(); err != nil {
		log.Fatal("⚠️  Não foi possivel inicializar sistemas de repository")
		return
	}

	d.Repository, err = repository.RegisterRepository(d.DB)
	if err != nil {
		log.Fatal("⚠️  Não foi possivel inicializar sistemas de repository")
		return
	}

	d.Auth, err = auth.SetAuth(d.Repository)
	if err != nil {
		log.Fatal("⚠️  Não foi possivel inicializar sistemas de auth")
		return
	}

	d.Service, err = service.RegisterService(d.Repository)
	if err != nil {
		log.Fatal("⚠️  Não foi possivel inicializar sistemas de services")
		return
	}

	return d, err
}
