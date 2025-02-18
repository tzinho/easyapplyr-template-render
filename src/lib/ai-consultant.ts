import OpenAI from "openai";

const API_KEY =
  "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";

export const getAIAdvice = async (apiKey: string, resumeData: any) => {
  try {
    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: apiKey, // This is also the default, can be omitted
    });

    console.log("Getting AI advice for resume");

    // Prepare bullet points from resume data
    const bulletPoints = resumeData.experience
      .map((exp: any) => exp.bullets.join("\n"))
      .join("\n");

    // Create chat completion
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume consultant. Be specific and actionable in your advice.",
        },
        {
          role: "user",
          content: `Please analyze these resume bullet points and provide specific, actionable advice for improvement:

          ${bulletPoints}

          Focus on:
          1. How to make achievements more quantifiable
          2. Better action verbs to use
          3. How to highlight skills more effectively
          4. Ways to make the impact clearer`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Extract and return the result
    console.log("response", response);
    return response.choices[0].message?.content || "No advice returned.";
  } catch (error) {
    console.error("Error getting AI advice:", error);
    return "Unable to get AI consultation at this moment. Please try again later.";
  }
};
