import { create } from "zustand";

type ContextState = {
	participantId: number;
	setContext: (id: number) => void;
};

export const useContextStore = create<ContextState>((set) => ({
	participantId: 0,
	setContext: (participantId: number) => set({ participantId }),
}));
