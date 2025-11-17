import { HttpClient } from "./http.client";

class ServerClient extends HttpClient {
	constructor(apiUrl: string) {
		super(apiUrl);
	}
}

const serverUrl = '/';

export const serverClient = new ServerClient(serverUrl);
