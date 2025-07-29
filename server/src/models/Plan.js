const planSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
            },
          ],
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
        },
      ],
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
