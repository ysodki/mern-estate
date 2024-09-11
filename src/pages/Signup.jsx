import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
    const [formData, setFormData] = useState({});
    const [error , setError] = useState([]);
    const [loding , setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e)=>{
        setFormData({
            ...formData , [e.target.id] :e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        try{
            e.preventDefault();
            setLoading(true);
        
            const res = await fetch("/api/auth/signup" , {
                method : 'POST' ,
                headers : {
                    'Content-Type' : 'application/json'
                } ,
                body : JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            if(data.success == false){
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate("/sign-in");
        }catch(e){
            setLoading(false);
            setError(e.message);
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='username'
                    className='border p-3 rounded-lg'
                    id="username"
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='username'
                    className='border p-3 rounded-lg'
                    id="password"
                    onChange={handleChange}
                />
                <button disabled = {loding}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                        {loding ? 'Loading ...' : 'Sign Up'}
                    </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account ?</p>
                <Link to="/signin">
                    <span className='text-blue-700'>Signin</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default Signup