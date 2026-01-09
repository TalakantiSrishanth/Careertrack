import { GoogleGenAI } from '@google/genai';
import InterviewPrepSchema from "@/app/api/interviewprep/models/InterviewPrepSchema"
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'
export async function POST(request) {
    try{
        const {userId}=await auth();
        if(!userId){
            return NextResponse.json({error:"UnAuthenticated"},{status:401})
        }
    const { companyName, jobTitle } = await request.json();
   const prompt = `Generate interview preparation guidance for the following role.

Company: ${companyName}
Role: ${jobTitle}

Use EXACT section headers and formats below:

Focus Areas:
- item

Resources:
- Title | URL

Company Culture:
- description

Interview Style:
- description

Warnings:
- item

Do not include anything outside these sections.
Be concise and role-specific.

`;
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: InterviewPrepSchema,
        },
    });
    const result = await JSON.parse(response.text);
    console.log(result);
    return NextResponse.json(result);
    }
    catch(error){
        console.log(error);
        return NextResponse.json(error);
    }

}