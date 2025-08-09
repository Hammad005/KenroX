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
            set({ plans: response.data?.plans, planLoading: false });
            toast.success("Plan generated successfully");
            return { success: true }
        } catch (error) {
            set({ planLoading: false });
            toast.error(error.response.data.error);
            console.error(error);
        }
    },
    getPlan: async () => {
        set({ planLoading: true });
        try {
            const response = await axios.get("/plan/getPlan");
            set({ plans: response.data?.plans, planLoading: false });
        } catch (error) {
            set({ plans: null, planLoading: false });
            toast.error(error.response.data.error);
            console.error(error);
        }
    },
    deletePlan: async (id) => {
        set({ planLoading: true });
        try {
            const response = await axios.delete(`/plan/deletePlan/${id}`);
            set({ plans: response.data?.plans, planLoading: false });
            toast.success("Plan deleted successfully");
            return { success: true }
        } catch (error) {
            set({ planLoading: false });
            toast.error(error.response.data.error);
            console.error(error);
        }
    },
    activePlan: async (id) => {
        set({ planLoading: true });
        try {
            const response = await axios.put(`/plan/active/${id}`);
            set({ plans: response.data?.plans, planLoading: false });
            toast.success("Plan activated successfully");
            return { success: true }
        } catch (error) {
            set({ planLoading: false });
            toast.error(error.response.data.error);
            console.error(error);
        }
    },
})) 