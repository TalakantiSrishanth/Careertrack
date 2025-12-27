import data from '../data'
import ApplicationCard from "../../components/ApplicationCard"
const Applied = () => {
    const appliedData=data.filter((item)=>item.status==="applied");
    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 sm:gap-2 gap-1 p-3 bg-gray-100 min-h-full items-start'>
            {appliedData.map((app) => {
                const plural = (n, unit) => `${n} ${unit}${n > 1 ? "s" : ""} ago`;
                const seconds = Math.floor((Date.now() - new Date(app.appliedAt)) / 1000);
                let statusText = "Applied • "
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);
                const months = Math.floor(days / 30);
                const years = Math.floor(months / 12);
                if (seconds < 60) statusText += "just now";
                else if (minutes < 60) statusText += plural(minutes, "minute");
                else if (hours < 24) statusText += plural(hours, "hour");
                else if (days < 30) statusText += plural(days, "day");
                else if (months < 12) statusText += plural(months, "month");
                else statusText += plural(years, "year");
                return (
                    <ApplicationCard key={app._id} company={app.company} title={app.title} statusText={statusText}>
                        <button>
                            Edit
                        </button>
                    </ApplicationCard>
                )
            })}

        </div>
    )
}

export default Applied
