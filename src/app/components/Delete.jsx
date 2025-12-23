"use client";
import data from "../applications/data";
import { useRouter } from "next/navigation";
const DeleteButton = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
   //need delete logic,create api endpoint and also use react toastify for changes
    router.push("/applications");
  };

  return <button  className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDelete}>Delete</button>;
};
export default DeleteButton;