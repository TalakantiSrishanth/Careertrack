import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import HomeComponent from "./HomeComponent";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await connectDB();
  const applications = await Application.find({ userId }).lean();
  return <HomeComponent data={applications || []} />;
}
