"use client";
import React, { createContext, useEffect, useState } from "react";

export const stateContext = createContext(null);

const getNewContext = () => {
	if (localStorage.getItem("context") === null) {
		localStorage.setItem(
			"context",
			JSON.stringify({
				partipantId: 0,
				timeTaken: 0,
				selectedOptions: [],
			})
		);
	}
};

type ContextProviderProps = {
	children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
	const [context, setContext] = useState();
	useEffect(() => {
		localStorage.setItem("context", JSON.stringify(context));
	}, [context]);

	return <stateContext.Provider value={null}>{children}</stateContext.Provider>;
};

export default ContextProvider;
