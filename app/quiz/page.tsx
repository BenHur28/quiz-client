"use client";
import { useContextStore } from "@/hooks/useContextStore";
import { useEffect, useState } from "react";
import { BASE_URL, ENDPOINTS, createAPIEndpoint } from "../api";
import { getFormatedTime } from "@/util/formattime";
import { redirect } from "next/navigation";
import Image from "next/image";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import { useQnIdStore } from "@/hooks/useIdStore";

type question = {
	qnId: number;
	qnInWords: string;
	image: string;
	options: string[];
};

const QuizPage = () => {
	const router = useRouter();
	const id = useContextStore((state) => state.participantId);
	const { setContextQnId } = useQnIdStore();
	const [questions, setQuestions] = useState<question[]>([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [timeTaken, setTimeTaken] = useState(0);
	const [finalTime, setFinalTime] = useState(0);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	let timer: any;

	const startTimer = () => {
		timer = setInterval(() => {
			setTimeTaken((prev) => prev + 0.5);
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

	const updateAnswer = (index: number, id: string) => {
		const temp = [...selectedOptions];
		const tempIds = [...selectedIds];
		temp.push(questions[questionIndex].options[index]);
		tempIds.push(id);
		setSelectedOptions(temp);
		setSelectedIds(tempIds);
		if (questionIndex < 4) {
			setQuestionIndex((prev) => prev + 1);
		} else {
			setFinalTime(timeTaken);
			setContextQnId(tempIds);
			router.push("/result");
		}
	};

	return (
		<div className="h-full">
			<Navbar />
			<div className="flex justify-center items-center h-full text-white">
				{questions.length != 0 ? (
					<div className="w-2/5 pl-12 pr-12 py-10 rounded-md bg-[#282820]">
						<div className="flex justify-between text-2xl mb-4">
							<span>Question {questionIndex + 1} of 5</span>
							<span>{getFormatedTime(timeTaken)}</span>
						</div>
						<div className="text-2xl mb-6">
							{questions[questionIndex].qnInWords}
							{questions[questionIndex].image != null ? (
								<Image
									className="mt-8 mx-auto"
									alt=""
									width={300}
									height={300}
									src={BASE_URL + "images/" + questions[questionIndex].image}
								></Image>
							) : null}
						</div>
						<ul>
							{questions[questionIndex].options.map((option, i) => (
								<li
									key={option}
									className="text-lg hover:bg-slate-600 rounded-sm px-2 py-1 cursor-pointer"
									onClick={() =>
										updateAnswer(i, questions[questionIndex].qnId.toString())
									}
								>
									{String.fromCharCode(65 + i) + ". " + option}
								</li>
							))}
						</ul>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default QuizPage;
