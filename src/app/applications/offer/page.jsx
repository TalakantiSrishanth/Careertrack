import axios from "axios"
import OfferHelper from "./OfferHelper";

const page =async () => {
  const {data}=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications`);
  return (
   <OfferHelper data={data}/>
  )
}

export default page
