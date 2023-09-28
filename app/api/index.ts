import axios from "axios";

export const BASE_URL = "http://localhost:5243/";

export const ENDPOINTS = {
	participant: "participants",
};

type participant = {
	name: string;
	email: string;
};

export const createAPIEndpoint = (endpoint: string) => {
	let url = BASE_URL + "api/" + endpoint + "/";
	return {
		get: () => axios.get(url),
		getById: (id: string) => axios.get(url + id),
		post: (newRecord: participant) => axios.post(url, newRecord),
		put: (id: string, updatedRecord: any) => axios.put(url + id, updatedRecord),
		delete: (id: string) => axios.delete(url + id),
	};
};
