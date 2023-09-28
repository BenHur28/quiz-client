import axios from "axios";

export const BASE_URL = "http://localhost:5041/";

export const createAPIEndpoint = (endpoint: string) => {
	let url = BASE_URL + "api/" + endpoint + "/";
	return {
		get: () => axios.get(url),
		getById: (id: string) => axios.get(url + id),
		post: (newRecord: string) => axios.post(url, newRecord),
		put: (id: string, updatedRecord: any) => axios.put(url + id, updatedRecord),
		delete: (id: string) => axios.delete(url + id),
	};
};
