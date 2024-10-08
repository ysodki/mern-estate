import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { signinStart , signinSuccess , signinFailure} from '../redux/user/userSlice';


const Signin = () => {
    const [formData, setFormData] = useState({});
    const {loading , error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        setFormData({
            ...formData , [e.target.id] :e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        try{
            e.preventDefault();
            dispatch(signinStart());
        
            const res = await fetch("/api/auth/signin" , {
                method : 'POST' ,
                headers : {
                    'Content-Type' : 'application/json'
                } ,
                body : JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            if(data.success == false){
                dispatch(signinFailure(data.message));
                return;
            }
            dispatch(signinSuccess(data));
            navigate("/");
        }catch(e){
            dispatch(signinFailure(e.message));
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='password'
                    className='border p-3 rounded-lg'
                    id="password"
                    onChange={handleChange}
                />
                <button disabled = {loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                        {loading ? 'Loading ...' : 'Sign In'}
                    </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Dont Have an account ?</p>
                <Link to="/sign-up">
                    <span className='text-blue-700'>Sign Up</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default Signin