import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'

export async function POST(request) {
    try {
        const {userId}=await auth();
        if(!userId) return NextResponse.json({error:"UnAuthenticated"},{status:401});
        await connectDB();
        const body = await request.json();

        const application = await Application.create({...body,userId:userId});

        return NextResponse.json({success:true});
    }  catch (error) {
  console.error("POST error:", error);
  return NextResponse.json(
    {
      message: "Failed to create application",
      error: error.message,
      name: error.name
    },
    { status: 500 }
  );
}
}
