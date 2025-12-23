import React from 'react'
import data from '../../data';
import Form from '@/app/components/Form';
const edit = async ({params}) => {
    const {id}=await params;
     const app = data.find(item => item._id === id);
   
  return (
    <div>
      <div className='text-2xl text-center'>Edit Application</div>
      <Form app/>
    </div>
  )
}

export default edit;
