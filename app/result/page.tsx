"use client";

import { useQnIdStore } from "@/hooks/useIdStore";
import { useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";

const ResultPage = () => {
	const qnIds = useQnIdStore((state) => state.qnIds);
	console.log(qnIds);

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.getAnswers)
			.postAnswer(qnIds)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return <div>ResultPage</div>;
};

export default ResultPage;
