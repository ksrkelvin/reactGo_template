import { serverClient } from "../../adapter/http/server.client";
import { User } from "../../domain/models/user.models";

class Service {
	private baseUrl = '/auth';

	public async getAccess(token: string): Promise<User> {
		const body = { token };
		return await serverClient.post(`${this.baseUrl}/login`, body);
	}

	public async getUserData(): Promise<User> {
		return await serverClient.get('/users/profile');
	}
}

export const userService = new Service();
