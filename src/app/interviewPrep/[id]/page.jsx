import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Application from "@/models/Application";
import InterviewMain from "./InterviewMain";

export default async function Page({ params }) {
  const { id } =await params;
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await connectDB();

  const app = await Application.findOne({ userId, _id: id }).lean();

  if (!app) return <div>Application not found</div>;

  const plainApp = JSON.parse(JSON.stringify(app));

  return <InterviewMain app={plainApp} />;
}
