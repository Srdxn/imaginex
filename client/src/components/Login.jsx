import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Login');
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });

                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    setUser(data.user.name);
                    setShowLogin(false);
                    toast.success(`Welcome back ${data.user.name}`);
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });

                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    setUser(data.user.name);
                    setShowLogin(false);
                    
                    toast.success("Registration successful!", {
                        onClose: () => {
                            toast.success("You got 5 credits for free!");
                        },
                    });
                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className='fixed top-0 right-0 bottom-0 left-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

            <motion.form className='relative bg-white text-slate-500 rounded-xl p-10' onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h1 className='text-center text-2xl text-neutral-800 font-medium'>{state}</h1>
                {state === 'Login' && <p className='text-sm mt-1 text-center'>Welcome back! Please sign in to continue</p>}

                {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-8'>
                    <img src={assets.user_icon} alt="" />
                    <input className='outline-none text-sm' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Enter your full name' required />
                </div>}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="" />
                    <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email id' required />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" />
                    <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password' required />
                </div>

                {state === 'Login' && <p className='text-sm my-2 font-bold cursor-pointer'>Forgot password?</p>}

                <button className={`w-full text-sm bg-black text-white py-2 rounded-full cursor-pointer hover:bg-gray-300 hover:text-black hover:border-black hover:scale-[1.02] transition-all duration-300 ${state === 'Login' ? 'mt-3' : 'mt-6'}`}>{state === 'Login' ? 'Login' : 'Create Account'}</button>

                {state !== 'Login' ? <p className='text-sm mt-2 text-center'>Already have an account? <span className='font-bold cursor-pointer' onClick={() => setState('Login')}>Login</span></p>
                    :
                    <p className='text-sm mt-2 text-center'>Don't have an account? <span className='font-bold cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>}

                <img className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="cross_icon" onClick={() => setShowLogin(false)} />
            </motion.form>
        </div>
    )
}

export default Login