import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Application from "@/models/Application";
import OfferHelper from "./OfferHelper";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();

  const data = await Application.find({ userId }).lean();

  const plainData = JSON.parse(JSON.stringify(data));

  return <OfferHelper data={plainData} />;
}
