import axios from "@/lib/axios";
import { create } from "zustand";

export const userStore = create((set) => ({
    user: null,
    authLoading: false,
    loading: false,

    checkAuth: async () => {
        set({ authLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 4000));
        try {
            const response = await axios.get("/auth/me");
        set({ user: response.data, authLoading: false });
        } catch (error) {
            set({ user: null, authLoading: false });
            console.error(error);
        }
    }
}));