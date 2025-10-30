import { HttpClient } from "./http.client";

class ServerClient extends HttpClient {
	constructor(apiUrl: string) {
		super(apiUrl);
	}
}

const serverUrl = 'http://localhost:8080';

export const serverClient = new ServerClient(serverUrl);
