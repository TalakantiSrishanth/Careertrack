import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        await connectDB();
        if (id) {
            const application = await Application.findById(id);
            if (application) return NextResponse.json(application);
            else return NextResponse.json({ message: "Application doesnt exisit" }, { status: 404 });
        }
        const applications = await Application.find();
        return NextResponse.json(applications);
    }
    catch (error) {
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        const application = await Application.create(body);

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
