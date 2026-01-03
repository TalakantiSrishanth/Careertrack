import axios from "axios";
import HomeComponent from "./HomeComponent";
const page = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/applications`
    );

    return <HomeComponent data={res.data} />;
  } catch (error) {
    console.error(error);

    return (
      <div className="p-4 text-red-500">
        Failed to load applications
      </div>
    );
  }
};

export default page;
