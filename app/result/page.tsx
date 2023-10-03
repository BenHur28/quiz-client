"use client";

import { useQnIdStore } from "@/hooks/useIdStore";
import { useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import { useAnswerStore } from "@/hooks/useAnswerStore";

const ResultPage = () => {
	const qnIds = useQnIdStore((state) => state.qnIds);
	const answers = useAnswerStore((state) => state.answers);
	const mapQNA = () => {
		const map: any = {};
		for (let i = 0; i < 5; i++) {
			map[qnIds[i]] = answers[i];
		}
		return map;
	};
	useEffect(() => {
		const qna = mapQNA();
		console.log(qna);
		createAPIEndpoint(ENDPOINTS.getAnswers)
			.postAnswer(qnIds)
			.then((res) => {
				console.log(res.data);
				calculateScore(qna, res.data);
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const calculateScore = (qna: any, res: any) => {
		let correct = 0;
		for (let i = 0; i < 5; i++) {
			if (res[i].qnId in qna) {
				if (res[i].answer == qna[res[i].qnId]) {
					correct += 1;
				}
			}
		}
		console.log(correct);
	};

	return <div>ResultPage</div>;
};

export default ResultPage;
