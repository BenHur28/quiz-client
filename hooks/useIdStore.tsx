import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ContextState = {
	qnIds: number[];
	setContextQnId: (qnIds: number[]) => void;
};

export const useQnIdStore = create<ContextState>()(
	persist(
		(set) => ({
			qnIds: [],
			setContextQnId: (qnIds: number[]) => set({ qnIds }),
		}),
		{
			name: "qnId store",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
