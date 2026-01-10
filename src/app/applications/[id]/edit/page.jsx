import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Application from "@/models/Application";
import Form from "@/app/components/Form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const edit = async ({ params }) => {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await connectDB();

  const app = await Application.findOne({ userId, _id: id }).lean();
  if (!app) return <div>Application not found</div>;

  const plainApp = JSON.parse(JSON.stringify(app));

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Edit Application</CardTitle>
      </CardHeader>
      <CardContent>
        <Form app={plainApp} />
      </CardContent>
    </Card>
  );
};

export default edit;
