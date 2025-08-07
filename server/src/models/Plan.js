import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        data: {
            age: {
                type: Number,
                required: true,
            },
            height: {
                type: String,
                required: true,
            },
            weight: {
                type: String,
                required: true,
            },
            injuries: {
                type: String,
                required: true,
            },
            workout_days: [{
                type: String,
                required: true,
            }],
            fitness_goal: {
                type: String,
                required: true,
            },
            fitness_level: {
                type: String,
                required: true,
            },
        },
        name: {
            type: String,
            required: true,
        },
        workoutPlan: {
            schedule: {
                type: [String],
                required: true,
                default: [],
            },
            exercises: [
                {
                    day: {
                        type: String,
                        required: true,
                    },
                    routines: [
                        {
                            name: {
                                type: String,
                                required: true,
                            },
                            sets: {
                                type: Number,
                                required: true,
                            },
                            reps: {
                                type: Number,
                                required: true,
                            },
                            _id: false,
                        },
                    ],
                    _id: false,
                },
            ],
        },
        dietPlan: {
            dailyCalories: {
                type: Number,
                required: true,
            },
            meals: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    foods: {
                        type: [String],
                        required: true,
                        default: [],
                    },
                    _id: false,
                },
            ],
            _id: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);
const Plan = mongoose.model("Plan", planSchema);
export default Plan;
