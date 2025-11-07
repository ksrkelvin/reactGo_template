package auth

import (
	"encoding/json"
	"reactGoTemplate/backend/internal/dto"
	"reactGoTemplate/backend/internal/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"gorm.io/gorm"
)

func (auth *Auth) GoogleLogin(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.String(500, "Erro inesperado: "+err.Error())
		}
	}()

	url := auth.GoogleOauthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	ctx.Redirect(302, url)
}

func (auth *Auth) GoogleCallback(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			err := r.(error)
			ctx.String(500, "Erro inesperado: "+err.Error())
		}
	}()

	code := ctx.Query("code")
	token, err := auth.GoogleOauthConfig.Exchange(ctx, code)
	if err != nil {
		ctx.String(500, "Erro ao autenticar com Google")
		return
	}

	client := auth.GoogleOauthConfig.Client(ctx, token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil || resp.StatusCode != 200 {
		ctx.String(500, "Erro ao buscar perfil do Google")
		return
	}
	defer resp.Body.Close()

	profile := dto.ExternalAuthProfile{}

	if err = json.NewDecoder(resp.Body).Decode(&profile); err != nil {
		ctx.String(500, "Erro ao decodificar perfil do Google")
		return
	}

	userModel, err := auth.SaveOrGetExternalUser(profile)
	if err != nil {
		ctx.String(500, "Erro ao tentar salvar usuario Google")

	}

	tokenJWT, err := auth.GenerateJWT(userModel.Email, "diino-app")
	if err != nil {
		ctx.String(500, "Erro ao gerar token JWT")
		return
	}

	ctx.SetCookie("X_AUTH", tokenJWT, 3600*24, "/", "", false, true)

	ctx.Redirect(302, "/")

}

func (auth *Auth) SaveOrGetExternalUser(profile dto.ExternalAuthProfile) (userModels models.User, err error) {
	newUser := models.User{
		Name:         profile.Name,
		Email:        profile.Email,
		Avatar:       profile.Picture,
		AuthProvider: profile.Source,
	}

	user, err := auth.Repository.GetUserByEmail(profile.Email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return auth.Repository.CreateUser(newUser)
		}
		return userModels, err
	}
	return user, nil

}
