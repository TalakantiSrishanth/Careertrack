import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Application from "@/models/Application";
import Delete from "../../components/Delete.jsx";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Page = async ({ params }) => {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await connectDB();

  const app = await Application.findOne({ userId, _id: id });
  if (!app) return <div>Application not found</div>;

  return (
    <Card className="p-6 space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl">{app.title}</CardTitle>
        <CardDescription>{app.company}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">

        <Badge variant="outline" className="px-3 py-1 text-sm">
          Status: {app.status}
        </Badge>

        {app.status === "rejected" && (
          <p className="text-sm text-red-600">
            Rejected after: {app.fromStatus}
          </p>
        )}

        <p className="text-gray-700 text-sm">{app.description}</p>

        <div className="text-xs text-gray-500">
          Applied on{" "}
          {new Date(app.appliedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <div className="flex gap-4 mt-4">
          <Link href={`/applications/${app._id}/edit`}>
            <Button>Edit</Button>
          </Link>

          <Delete id={app._id.toString()} />
        </div>

      </CardContent>
    </Card>
  );
};

export default Page;
