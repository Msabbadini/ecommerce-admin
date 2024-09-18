import { create } from "zustand";

interface userStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const userStoreModal = create<userStoreModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));
