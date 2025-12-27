import data from '../data'
import ApplicationCard from "../../components/ApplicationCard"
const Rejected = () => {
    const rejectedData=data.filter((item)=>item.status==="rejected");
    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 sm:gap-2 gap-1 p-3 bg-gray-100 min-h-full items-start'>
            {rejectedData.map((app) => {
                let statusText="Rejected after "
                statusText+=app.fromStatus.charAt(0).toUpperCase()+app.fromStatus.slice(1)
                return (
                    <ApplicationCard key={app._id} company={app.company} title={app.title} statusText={statusText}>
                    </ApplicationCard>
                )
            })}

        </div>
    )
}

export default Rejected
