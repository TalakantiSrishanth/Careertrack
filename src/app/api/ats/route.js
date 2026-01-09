import ATSSchema from "@/app/atscheck/models/AtsSchema";
import { auth } from '@clerk/nextjs/server'
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const {userId}=await auth();
            if (!userId) {
            return NextResponse.json({error:"UnAuthenticated"},{status:404});
          }
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { resumeText, jobDescription, type } = await request.json();
        const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer and career coach specializing in tech roles.
RESUME TO ANALYZE:
${resumeText.substring(0, 4000)}
${jobDescription!=="" ? `TARGET JOB DESCRIPTION:\n${jobDescription.substring(0, 2000)}` : "ANALYZE FOR GENERAL TECH ROLE QUALITY"}
ANALYSIS CONTEXT: ${type === 'internship' ? "INTERNSHIP APPLICATION - Focus on: coursework relevance, academic projects, learning potential, foundational skills." : type === 'fulltime' ?
                "FULL-TIME POSITION - Focus on: professional experience, technical depth, leadership, production impact, metrics." :
                "GENERAL RESUME REVIEW - Focus on: overall clarity, skill presentation, formatting, ATS optimization."}
Analyze thoroughly and provide structured feedback according to the schema.
`;
        const res = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: ATSSchema,
            },
        });
        const result = await JSON.parse(res.text);
        return NextResponse.json(result);
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ error: "error occuered" })
    }
}