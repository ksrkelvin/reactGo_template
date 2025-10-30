export const parseToken = (token: string) => {
	const tokenParts = token.split('.');
	if (tokenParts.length !== 3) return null;
	const tokenData = atob(tokenParts[1]);
	return JSON.parse(tokenData);
};

export const parseJwt = (string: string) => {
	try {
		return JSON.parse(string);
	} catch {
		return null;
	}
};

export const isExpired = (accessToken?: string) => {
	if (!accessToken) return true;
	const cookieObject = JSON.parse(accessToken);
	return cookieObject && new Date(cookieObject.exp) < new Date();
};

export const isTokenExpired = (token: string) => {
	const tokenData = parseJwt(token);
	return tokenData && tokenData.exp * 1000 < Date.now();
};
