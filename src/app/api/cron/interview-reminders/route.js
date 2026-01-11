export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { Resend } from "resend";
import { clerkClient } from "@clerk/nextjs/server";
import InterviewReminderEmail from "@/app/components/emailTemplate/InterviewReminder";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function GET() {
    await connectDB();

    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);
    const client = await clerkClient();
    console.log("CLERK CLIENT:", client);
    const interviews = await Application.find({
        status: "interview",
        "interview.date": { $gte: now, $lte: nextWeek },
    });

    for (const app of interviews) {
        const user = await client.users.getUser(app.userId)
        console.log(user)
        const email = user.emailAddresses[0].emailAddress;
        await resend.emails.send({
            from: "CareerTrack <onboarding@resend.dev>",
            to: email,
            subject: `Reminder: Interview with ${app.company}`,
            react: InterviewReminderEmail({
                company: app.company,
                title: app.title,
                date: new Date(app.interview.date).toLocaleString(),
            }),
        });
    }
    return Response.json({ success: true });
}
