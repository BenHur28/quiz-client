"use client";
import { useContextStore } from "@/hooks/useContextStore";
import { useEffect, useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";

type question = {
	qnId: number;
	qnInWords: string;
	image: string;
	options: string[];
};

const QuizPage = () => {
	const id = useContextStore((state) => state.participantId);
	localStorage.getItem(id);

	const [questions, setQuestions] = useState<question[]>([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [timeTaken, setTimeTaken] = useState(0);

	let timer: any;

	const startTimer = () => {
		timer = setInterval(() => {
			setTimeTaken((prev) => prev + 1);
		}, 1000);
	};

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.question)
			.get()
			.then((res) => {
				setQuestions(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));

		return () => {
			clearInterval(timer);
		};
	}, [timer]);

	return (
		<div className="flex justify-center items-center h-full text-white">
			{questions.length != 0 ? (
				<div className="pl-12 pr-12 py-10 rounded-md bg-[#282820]">
					<div className="text-2xl mb-4">Question {questionIndex + 1} of 5</div>
					<div className="text-2xl mb-6">
						{questions[questionIndex].qnInWords}
					</div>
					<ul>
						{questions[questionIndex].options.map((option, i) => (
							<li
								key={option}
								className="text-lg hover:bg-slate-600 rounded-sm px-2 py-1"
							>
								{String.fromCharCode(65 + i) + ". " + option}
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
};

export default QuizPage;
