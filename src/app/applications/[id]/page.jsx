import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Application from "@/models/Application";
import Delete from "../../components/Delete.jsx";
import Link from "next/link";   
const Page = async ({ params }) => {
  const { id } = await params;
 const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await connectDB();
  const app = await Application.findOne({ userId, _id: id });
  if (!app) {
    return <div>Application not found</div>;
  }
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">{app.title}</h1>
      <p className="text-lg">{app.company}</p>

      <span className="inline-block rounded px-2 py-1 text-sm bg-gray-100">
        Status: {app.status}
      </span>

      {app.status === "rejected" && (
        <p className="text-sm text-red-600">
          Rejected after: {app.fromStatus}
        </p>
      )}

      <p className="text-gray-700">{app.description}</p>

      <div className="text-sm text-muted-foreground">
        Applied on{" "}
        {new Date(app.appliedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      <div className="flex gap-4 mt-6">
        <Link href={`/applications/${app._id}/edit`}>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Edit
        </button>
        </Link>
       <Delete id={app._id}/>
      </div>
    </div>
  );
};

export default Page;
