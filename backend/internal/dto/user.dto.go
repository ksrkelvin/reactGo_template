package dto

type UserCreateRequest struct {
	Name     string `json:"name" form:"name"`
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
}

type UserLoginRequest struct {
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
}

type AvatarUpdateRequest struct {
	Avatar string `json:"avatar"`
}

type UserResponse struct {
	ID     uint   `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Avatar string `json:"avatar"`
}
