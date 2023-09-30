"use client";
import { useContextStore } from "@/hooks/useContextStore";
import { useEffect, useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import { getFormatedTime } from "@/util/formattime";
import { redirect } from "next/navigation";

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
		if (id === "0") {
			redirect("/");
		}

		createAPIEndpoint(ENDPOINTS.question)
			.get()
			.then((res) => {
				setQuestions(res.data);
				console.log(res.data);
				startTimer();
			})
			.catch((err) => console.log(err));

		return () => {
			clearInterval(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex justify-center items-center h-full text-white">
			{questions.length != 0 ? (
				<div className="w-1/3 pl-12 pr-12 py-10 rounded-md bg-[#282820]">
					<div className="flex justify-between text-2xl mb-4">
						<span>Question {questionIndex + 1} of 5</span>
						<span>{getFormatedTime(timeTaken)}</span>
					</div>
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
