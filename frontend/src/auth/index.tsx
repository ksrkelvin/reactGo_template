import Cookies from 'js-cookie';
import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthData, AuthContextProps, AuthProviderProps } from './types';
import { User } from '../domain/models/user.models';
import { userService } from '../service/user';
import { isExpired, parseJwt, isTokenExpired } from '../usercase/util/jwt.utils';

const AuthContext = createContext({} as AuthContextProps);

const parseAuth = (data: User): null | AuthData => {
	return {
		name: data.name,
		email: data.email,
	};
};

export const getUser = async () => {
	const token = Cookies.get('X_AUTH');

	const userSession = Cookies.get('user_session');
	if (userSession && !isExpired(userSession as string)) {
		return parseJwt(userSession as string);
	}

	if (token && !isTokenExpired(token)) {
		const userData = await userService.getAccess(token);

		if (userData) {
			const data = parseAuth(userData);
			Cookies.set('user_session', JSON.stringify(data), {
				path: '/',
				expires: new Date(userData.exp)
			});
			return data;
		}
		return null;
	}
	return null;
};

export const logout = () => {
	Cookies.remove('user_session');
	Cookies.remove('X_AUTH');
	window.location.reload();
};

export const AuthProvider = ({ appAuth, children }: AuthProviderProps) => {
	const navigate = useNavigate();
	const session = appAuth || null;
	const token = Cookies.get('X_AUTH') as string;

	React.useEffect(() => {
		if (!session) navigate('/login');
	}, [session]);

	const value = React.useMemo(
		() => ({
			token,
			session
		}),
		[session, token]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useSession = () => React.useContext(AuthContext);
