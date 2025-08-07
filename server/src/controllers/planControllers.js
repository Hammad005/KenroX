import { GoogleGenAI } from "@google/genai";
import { planPrompt } from "../utils/index.js";
import Plan from "../models/Plan.js";
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
})
export const generatePlanHandler = async (req, res) => {
    const { age, height, weight, injuries, workout_days, fitness_goal, fitness_level } = req.body;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: planPrompt(age, height, weight, injuries, workout_days, fitness_goal, fitness_level),
            config: {
                systemInstruction: "You are an experienced fitness coach. Your name is KenroX."
            },
        });
        const output = response?.text;

        let planIntoJSON;
        try {
            planIntoJSON = JSON.parse(output);
        } catch (parseErr) {
            throw new Error("Failed to parse AI response into JSON.");
        }

        const activePlans = await Plan.find({ user: req.user?._id, isActive: true });
        if (activePlans.length > 0) {
            for (const plan of activePlans) {
                plan.isActive = false;
                await plan.save();
            }   
        }



        const plan = await Plan.create({
            user: req.user?._id,
            data: {
                age,
                height,
                weight,
                injuries,
                workout_days,
                fitness_goal,
                fitness_level
            },
            name: planIntoJSON?.name,
            workoutPlan: {
                schedule: planIntoJSON?.workoutPlan?.schedule,
                exercises: planIntoJSON?.workoutPlan?.exercises
            },
            dietPlan: {
                dailyCalories: planIntoJSON?.dietPlan?.dailyCalories,
                meals: planIntoJSON?.dietPlan?.meals
            },
        });

        return res.status(200).json({ plan });
    } catch (error) {
        console.error("Error in generatePlanHandler:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }

};

export const getPlanHandler = async (req, res) => {
    try {
        const plans = await Plan.find({ user: req.user?._id });
        return res.status(200).json({ plans });      
    } catch (error) {
        console.error("Error in getPlanHandler:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const deletePlanHandler = async (req, res) => {
    const {id} = req.params;
    try {
        const plan = await Plan.findById(id);
        if (!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }
        await Plan.findByIdAndDelete(id);

        const plans = await Plan.find({ user: req.user?._id });
        return res.status(200).json({ plans, message: "Plan deleted successfully" });
    } catch (error) {
        console.error("Error in deletePlanHandler:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }  
};