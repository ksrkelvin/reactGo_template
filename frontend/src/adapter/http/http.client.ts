export class HttpClient {
	apiURL: string;

	constructor(apiUrl: string) {
		this.apiURL = apiUrl;
	}

	getUrl(path: string) {
		return `${this.apiURL}${path}`;
	}

	private getOptions(method: string, token?: string, body?: any): RequestInit {
		const headers = new Headers();
		if (token) headers.append('Authorization', `Bearer ${token}`);

		const isFormData = body instanceof FormData;
		if (body && !isFormData) headers.append('Content-Type', 'application/json');

		return { method, headers, credentials: 'include', body: isFormData ? body : JSON.stringify(body) };
	}

	async get(path: string, token?: string) {
		const requestOptions = this.getOptions('GET', token);
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	async delete(path: string, token?: string) {
		const requestOptions = this.getOptions('DELETE', token);
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	async post<K>(path: string, body: K | FormData, token?: string) {
		const requestOptions = this.getOptions('POST', token, body);
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	async put<K>(path: string, body: K, token?: string) {
		const requestOptions = this.getOptions('PUT', token, body);
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	async patch<K>(path: string, body: K, token?: string) {
		const requestOptions = this.getOptions('PATCH', token, body);
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	private handleResponse(response: Response) {
		if (response.status === 204) {
			return {
				items: [],
				totalPages: 0,
				totalItems: 0,
				currentPage: 0
			};
		} else if (response.status >= 400 && response.status < 500) {
			return response.json().then((data) => {
				const error = (data && data.message) || response.statusText;
				return Promise.reject(error);
			});
		} else if (response.status >= 500 && response.status < 600) {
			return response.json().then((data) => {
				const error = (data && data.message) || response.statusText;
				return Promise.reject(error);
			});
		} else {
			return response.text().then((text) => {
				return text && JSON.parse(text);
			});
		}
	}
}
