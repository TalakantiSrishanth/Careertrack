import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Application from "@/models/Application";
import ApplicationCard from "../../components/ApplicationCard"
const Rejected = async () => {
    const { userId } = await auth();
          if (!userId) {
            throw new Error("Unauthorized");
          }
          await connectDB();
          const data = await Application.find({ userId });
    const rejectedData = data.filter((item) => item.status === "rejected");
    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 sm:gap-2 gap-1 p-3 bg-gray-100 min-h-full items-start'>
            {rejectedData.map((app) => {
                const statusText = app.fromStatus
                    ? `Rejected after ${app.fromStatus.charAt(0).toUpperCase()}${app.fromStatus.slice(1)}`
                    : "Rejected";

                return (
                    <ApplicationCard key={app._id} company={app.company} title={app.title} statusText={statusText}>
                    </ApplicationCard>
                )
            })}

        </div>
    )
}

export default Rejected
