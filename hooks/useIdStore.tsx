import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ContextState = {
	qnIds: string[];
	setContextQnId: (qnIds: string[]) => void;
};

export const useQnIdStore = create<ContextState>()(
	persist(
		(set) => ({
			qnIds: [],
			setContextQnId: (qnIds: string[]) => set({ qnIds }),
		}),
		{
			name: "qnId store",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
