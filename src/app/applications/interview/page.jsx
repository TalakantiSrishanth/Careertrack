import axios from "axios";
import ApplicationCard from "../../components/ApplicationCard"
import Link from "next/link";
const Interview = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications`);
    const data = res.data;
    const interviewData = data.filter((item) => item.status === "interview");

    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 sm:gap-2 gap-1 p-3 bg-gray-100 min-h-full items-start'>
            {interviewData.map((app) => {
                let statusText = "Interview • ";
                let detailText = "";
                if (app.interview && app.interview.date) {
                    const interviewDate = new Date(app.interview.date);
                    const diffMs = interviewDate - Date.now();
                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    if (diffDays < 0) {
                        statusText += "Completed";
                    } else if (diffDays === 0) {
                        statusText += "Today";
                    } else if (diffDays === 1) {
                        statusText += "Tomorrow";
                    } else {
                        statusText += interviewDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                    }
                    const detailText = `${interviewDate.toLocaleString("en-US", {
                        weekday: "short",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    })} · ${app.interview.mode}`;
                }
                else {
                    statusText = "Interview • No date assigned";
                    detailText = "Schedule pending";
                }
                return (
                    <ApplicationCard key={app._id} company={app.company} title={app.title} statusText={statusText} detailText={detailText}>
                        <div className='flex gap-3'>
                            <button>Prepare</button>
                             <Link href={`/applications/${app._id}/edit`}>
                            <button>
                                Edit
                            </button></Link></div>
                    </ApplicationCard>
                )
            })}

        </div>
    )
}

export default Interview
