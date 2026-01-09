import AnalyticsComponent from './AnalyticsComponent'
import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Application from "@/models/Application";

const page =async () => {
     const { userId } = await auth();
              if (!userId) {
                throw new Error("Unauthorized");
              }
              await connectDB();
              const applications = await Application.find({ userId }).lean();
              const plainApps = JSON.parse(JSON.stringify(applications));
    return <AnalyticsComponent data={plainApps}/>
}
export default page
