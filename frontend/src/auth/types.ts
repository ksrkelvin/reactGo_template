import { ReactNode } from "react";

export interface AuthContextProps {
	token: string;
	session: null | AuthData;
}

export interface AuthProviderProps {
	children: ReactNode;
	appAuth?: null | AuthData;
}

export interface AuthData {
	name: string;
	email: string;
}
