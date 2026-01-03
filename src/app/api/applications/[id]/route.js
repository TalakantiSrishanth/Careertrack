import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();  
    const existing = await Application.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const update = { $set: {} };
    if (body.company !== undefined) update.$set.company = body.company;
    if (body.title !== undefined) update.$set.title = body.title;
    if (body.description !== undefined)
      update.$set.description = body.description;
    if (body.status && body.status !== existing.status) {
      update.$set.status = body.status;
      update.$set.fromStatus = existing.status;
      if (body.status === "interview" && !existing.interview) {
        update.$set.interview = {
          date: null,
          round: "",
          mode: "Online",
          notes: "",
        };
      }

      if (body.status === "offer" && !existing.offer) {
        update.$set.offer = {
          decision: "pending",
          decidedAt: null,
          notes: "",
        };
      }
    }
    if (body.interview) {
      update.$set.interview = {
        ...(existing.interview?.toObject()??{}),
        ...body.interview,
      };
    }

    if (body.offer) {
      update.$set.offer = {
        ...(existing.offer?.toObject()??{}),
        ...body.offer,
      };
    }
    await Application.findByIdAndUpdate(id, update);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    await Application.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  }
  catch (err) {
    console.log(err.message);
    return NextResponse.json({ error: `Error Occured ${err.message}` }, {
      status: 500
    })
  }

}
