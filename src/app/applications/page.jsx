import ApplicationsClient from "../components/ApplicationsClient";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="text-red-500">Unauthorized</div>;
  }

  await connectDB();

const applications = await Application.find({ userId }).lean();
const plainApps = JSON.parse(JSON.stringify(applications));

  return <ApplicationsClient data={plainApps || []} />;
}
