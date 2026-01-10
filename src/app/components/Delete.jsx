"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
const DeleteButton = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try{
   const res=await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications/${id}`);
    router.push("/applications");
    }catch(err){
      console.log(err.message);
    }
  };

  return <button  className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDelete}>Delete</button>;
};
export default DeleteButton;