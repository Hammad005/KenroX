import axios from "@/lib/axios";
import { toast } from "sonner";
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
    },
    login: async (data) => {
        set({ loading: true });
        try {
            const response = await axios.post("/auth/login", data);
            set({ user: response.data.user, loading: false });
            toast.success("Login successful");
            return {success: true}
        } catch (error) {
            set({ user: null, loading: false });
            toast.error(error.response.data.error);
            console.error(error);
        }
    },
    logout: async () => {
        set({ loading: true });
        try {
            await axios.post("/auth/logout");
            set({ user: null, loading: false });
            toast.success("Logout successful");
        } catch (error) {
            set({ user: null, loading: false });
            toast.error(error.response.data.error);
            console.error(error);
        }
    },
}));