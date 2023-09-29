"use client";
import { useContextStore } from "@/hooks/useContextStore";

const QuestionPage = () => {
	const { participantId, setContext } = useContextStore();

	return <div className="text-white">{participantId}</div>;
};

export default QuestionPage;
