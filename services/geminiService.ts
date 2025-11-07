import { GoogleGenAI, Type } from "@google/genai";
import { Avatar, Quest, Task } from "../types";

// FIX: Initialize GoogleGenAI with apiKey from process.env
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// FIX: Use a recommended model
const model = 'gemini-2.5-flash';

// FIX: Define the response schema for the report generation
const reportSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A creative and insightful title for the weekly report."
        },
        summary: {
            type: Type.STRING,
            description: "A 2-3 sentence summary of the user's week, highlighting key achievements and areas for improvement based on the PAEI model."
        },
        insights: {
            type: Type.ARRAY,
            description: "A list of 3-5 specific, actionable insights based on the user's task completion, quest progress, and PAEI balance. Each insight should be a string.",
            items: { type: Type.STRING }
        }
    },
    required: ["title", "summary", "insights"]
};

export const generateWeeklyReport = async (avatars: Avatar[], quests: Quest[], tasks: Task[]): Promise<any> => {
    const prompt = `
        Analyze the following user data for the week and generate a report based on the PAEI model (Producer, Administrator, Entrepreneur, Integrator).

        **Avatars (Represents PAEI roles and their progress):**
        ${JSON.stringify(avatars, null, 2)}

        **Quests (Long-term goals):**
        ${JSON.stringify(quests, null, 2)}

        **Tasks (Daily activities):**
        ${JSON.stringify(tasks, null, 2)}

        Based on this data, provide a title, a brief summary, and 3-5 actionable insights. The insights should help the user understand their behavioral patterns and improve their effectiveness. Focus on the balance between the PAEI roles. For example, if they completed many 'Producer' tasks but neglected 'Integrator' quests, point that out.
    `;

    try {
        // FIX: Use ai.models.generateContent according to guidelines
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: reportSchema,
            },
        });
        // FIX: Extract text and parse JSON from the response
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating report:", error);
        throw new Error("Failed to generate report from AI.");
    }
};
