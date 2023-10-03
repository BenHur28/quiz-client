"use client";

import { useQnIdStore } from "@/hooks/useIdStore";
import { useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import { useAnswerStore } from "@/hooks/useAnswerStore";

const ResultPage = () => {
	const qnIds = useQnIdStore((state) => state.qnIds);
	const answers = useAnswerStore((state) => state.answers);
	console.log(qnIds);
	console.log(answers);
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
