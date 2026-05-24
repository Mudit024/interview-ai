const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewRepotSchema = z.object({
      matchScore: z.number().describe(
            "A score between 0 and 100 indicating how well the candidate profile matches the job description"
      ),

      technicalQuestions: z.array(
            z.object({
                  question: z.string().describe("Technical interview question"),
                  intention: z.string().describe("Why interviewer asks this question"),
                  answer: z.string().describe("How candidate should answer this question"),
            })
      ).describe("Technical interview questions"),

      behavioralQuestions: z.array(
            z.object({
                  question: z.string().describe("Behavioral interview question"),
                  intention: z.string().describe("Why interviewer asks this question"),
                  answer: z.string().describe("How candidate should answer this question"),
            })
      ).describe("Behavioral interview questions"),

      skillGaps: z.array(
            z.object({
                  skill: z.string().describe("Missing skill"),
                  severity: z.enum(["low", "medium", "high"])
                        .describe("Severity of missing skill"),
            })
      ).describe("Skill gaps"),

      preparationPlan: z.array(
            z.object({
                  day: z.number().describe("Day number"),
                  focus: z.string().describe("Main focus for the day"),
                  tasks: z.array(z.string())
                        .describe("Tasks to complete"),
            })
      ).describe("Preparation roadmap"),

      title: z.string().describe("Job title"),
});

async function generateInterviewReport({
      resume,
      selfDescription,
      jobDescription,
}) {

      const prompt = `
Generate a realistic interview report.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Instructions:
- Return ONLY valid JSON
- No markdown
- No explanation text
- Follow schema strictly
- Generate realistic answers
- Generate at least 5 technical questions
- Generate at least 3 behavioral questions
- Generate at least 3 skill gaps
- Generate a 7-day preparation plan
- Match score should be between 0 and 100
`;

      const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",

            contents: prompt,

            config: {
                  responseMimeType: "application/json",
                  responseSchema: zodToJsonSchema(interviewRepotSchema),
            },
      });

      try {
            const data = JSON.parse(response.text);
            console.log(data);
            return data;

      } catch (err) {
            console.log(response.text);
      }
}




module.exports = generateInterviewReport;