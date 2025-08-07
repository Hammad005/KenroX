import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const planStore = create((set) => ({
    plans: null,
    planLoading: false,
    
    generatePlan: async (data) => {
        set({ planLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 22000));
        try {
            const response = await axios.post("/plan/generate", data);
            set({ plans: response.data, planLoading: false });
            toast.success("Plan generated successfully");
            return { success: true }
        } catch (error) {
            set({ plans: null, planLoading: false });
            toast.error(error.response.data.error);
            console.error(error);
        }
    },
})) 