import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ContextState = {
	answers: number[];
	setContextAnswers: (answers: number[]) => void;
};

export const useAnswerStore = create<ContextState>()(
	persist(
		(set) => ({
			answers: [],
			setContextAnswers: (answers: number[]) => set({ answers }),
		}),
		{
			name: "qnId store",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
