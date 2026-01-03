import axios from "axios"
import ApplicationsClient from "../components/ApplicationsClient";
const page = async () => {
  const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications`);
  const data=res.data;
  
  return (
      <ApplicationsClient data={data}/>
  )
}

export default page
