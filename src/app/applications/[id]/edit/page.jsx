import { connectDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import Application from "@/models/Application";
import Form from '@/app/components/Form';
const edit = async ({params}) => {
    const {id}=await params;
  const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await connectDB();
     const app = await Application.findOne({ userId, _id: id }).lean();

  if (!app) return <div>Application not found</div>;

  const plainApp = JSON.parse(JSON.stringify(app));
  return (
    <div>
      <div className='text-2xl text-center'>Edit Application</div>
      <Form app={plainApp}/>
    </div>
  )
}

export default edit;
