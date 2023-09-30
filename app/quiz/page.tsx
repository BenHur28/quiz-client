"use client";
import { useContextStore } from "@/hooks/useContextStore";
import { useEffect, useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";

const QuizPage = () => {
	const id = useContextStore((state) => state.participantId);
	localStorage.getItem(id);

	const [questions, setQuestions] = useState([]);
	const [questionIndex, setQuestionIndex] = useState(0);

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.question)
			.get()
			.then((res) => {
				setQuestions(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="text-white">
			{questions.length != 0 ? (
				<div>{/* {questions[questionIndex].QnInWords} */}</div>
			) : null}
		</div>
	);
};

export default QuizPage;
