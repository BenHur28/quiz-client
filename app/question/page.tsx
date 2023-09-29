"use client";
import { useContextStore } from "@/hooks/useContextStore";

const QuestionPage = () => {
	const id = useContextStore((state) => state.participantId);
	localStorage.getItem(id);
	return <div className="text-white">{id}</div>;
};

export default QuestionPage;
