import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ContextState = {
	participantId: string;
	setContext: (id: string, option: string) => void;
};

export const useContextStore = create<ContextState>()(
	persist(
		(set) => ({
			participantId: "0",
			setContext: (participantId: string) => set({ participantId }),
		}),
		{
			name: "id store",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
