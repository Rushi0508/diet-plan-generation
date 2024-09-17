import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API!);

export const generatePlan = async (body: any) => {
  const model = await genAi.getGenerativeModel({ model: "gemini-pro" });
  const prompt =
    "I am creating an application where users can generate diet plan based on their preferences. Here are my preferences and details\n" +
    "I am giving you the preferences in json so that you can understand it better\n" +
    "You alo give me the response in JSON format only\n" +
    "```json\n" +
    JSON.stringify(body) +
    "\n```" +
    "Please generate a diet plan based on the provided preferences and details in JSON format. Here is a sample response format:\n" +
    "```json\n" +
    JSON.stringify({
      meal_plan: {
        breakfast: {
          time: "7:30 AM",
          items: [
            {
              name: "...",
              quantity: "...",
              macros: {
                protein: "...",
                carbs: "...",
                fat: "...",
              },
            },
          ],
        },
      },
      daily_totals: {
        calories: "... kcal",
        protein: "...",
        carbs: "...",
        fat: "...",
      },
    }) +
    "\n```" +
    "\n" +
    "This is example just for breakfast, give for breakfast, mid-morning snack, lunch, evening snack, dinner, and daily totals\n" +
    "Give me JSON response like above format based on the preferences provided";

  const result = await model.generateContent(prompt);
  const response =
    (await result?.response?.candidates?.[0]?.content?.parts[0]?.text?.toString()) ||
    "Default response";

  const cleanedJsonString = response.replace(/```json|```/g, "").trim();

  const jsonObject = JSON.parse(cleanedJsonString);

  return jsonObject;
};
