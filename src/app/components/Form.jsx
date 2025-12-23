"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Form = ({ app }) => {
      const router=useRouter();
    const [form, setForm] = useState({
        company: app.company,
        title: app.title,
        desc: app.description,
        status: app.status
    })
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        //edit logic needed,send the data to backend and edit create an api endpoint
      
        router.push("/applications");

    };
    return (
        <div>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor='company'  >Company Name</label>
                <input type="text"  name="company"id='company' value={form.company} onChange={handleChange}></input>
                <label htmlFor='title' >Job Title</label>
                <input type="text" name='title' id='tile' value={form.title} onChange={handleChange}></input>
                <label htmlFor='desc'>Description</label>
                <textarea
                    name="desc"
                    value={form.desc}
                    onChange={handleChange}
                />
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form
