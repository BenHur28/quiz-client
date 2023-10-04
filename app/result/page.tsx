"use client";
import { useQnIdStore } from "@/hooks/useIdStore";
import { useEffect, useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import { useAnswerStore } from "@/hooks/useAnswerStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ResultPage = () => {
	const router = useRouter();
	const qnIds = useQnIdStore((state) => state.qnIds);
	const answers = useAnswerStore((state) => state.answers);
	const { setContextQnId } = useQnIdStore();
	const { setContextAnswers } = useAnswerStore();
	const [score, setScore] = useState(0);

	const mapQNA = () => {
		const map: any = {};
		for (let i = 0; i < 5; i++) {
			map[qnIds[i]] = answers[i];
		}
		return map;
	};
	useEffect(() => {
		const qna = mapQNA();
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
		setScore(correct);
	};

	const retry = () => {
		setContextQnId([]);
		setContextAnswers([]);
		router.push("/quiz");
	};

	return (
		<div className="flex justify-center items-center h-full">
			<div className="flex flex-col items-center pl-20 pr-20 py-12 rounded-md bg-[#282820]">
				<Image
					className="bg-[#282820]"
					alt=""
					src="/trophy.png"
					width={140}
					height={140}
				/>
				<div className="text-white text-2xl mt-8">
					Results: {score} out of 5 correct!
				</div>
				<div className="text-white text-2xl mt-2">Want to try again?</div>
				<button onClick={retry} className="bg-white mt-6 px-8 py-2 rounded-sm">
					Retry
				</button>
			</div>
		</div>
	);
};

export default ResultPage;
