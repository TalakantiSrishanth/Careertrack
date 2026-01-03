import React from 'react'
import axios from 'axios';
import Form from '@/app/components/Form';
const edit = async ({params}) => {
    const {id}=await params;
    const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications`,{params:{id:id}});
    const app=res.data;
   
  return (
    <div>
      <div className='text-2xl text-center'>Edit Application</div>
      <Form app={app}/>
    </div>
  )
}

export default edit;
