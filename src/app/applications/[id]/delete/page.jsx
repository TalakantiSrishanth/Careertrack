import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft } from "lucide-react";

export default async function DeletePage({ params }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  const { id } = await params;
  const app = await Application.findById(id);

  if (!app) return <p>Not found</p>;

  async function deleteApplication() {
    "use server";
    await Application.deleteOne({ _id: id, userId });
    redirect("/applications");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-sm border shadow-md">
        <CardHeader>
          <CardTitle className="text-center">Delete Application</CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete
            <span className="font-semibold"> {app.title}</span>?
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <form action={deleteApplication} className="w-full">
            <Button
              type="submit"
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </form>

          <a href="/applications" className="w-full">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Cancel
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
