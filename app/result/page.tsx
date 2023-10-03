"use client";

import { useQnIdStore } from "@/hooks/useIdStore";

const ResultPage = () => {
	const qnIds = useQnIdStore((state) => state.qnIds);
	console.log(qnIds);

	return <div>ResultPage</div>;
};

export default ResultPage;
