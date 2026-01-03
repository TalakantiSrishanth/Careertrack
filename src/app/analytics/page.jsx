import React from 'react'
import AnalyticsComponent from './AnalyticsComponent'
import axios from 'axios'

const page =async () => {
    const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications`);
    const data=res.data;
    return <AnalyticsComponent data={data}/>
}
export default page
