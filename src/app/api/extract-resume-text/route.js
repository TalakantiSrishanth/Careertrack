import pdf from '@cedrugs/pdf-parse';
import { NextResponse } from 'next/server';
export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get("resume");
    console.log("File type:", file.type);
    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded" },
            { status: 400 }
        );
    }

    const allowedTypes = ["application/pdf", "text/plain"];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
            { error: "Only PDF or TXT files allowed" },
            { status: 400 }
        );
    }
try{
    const buffer = Buffer.from(await file.arrayBuffer());
    let resumeText = "";

    if (file.type === "application/pdf") {
       const data = await pdf(buffer);
        resumeText=data.text;
    } else {
        resumeText =buffer.toString("utf-8");
    }    
   resumeText=resumeText.trim();
    return NextResponse.json({ resumeText });
}
catch(e){
    console.log(e.message);
    return NextResponse.json({error:"Error Occured"});
}
}
