import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { motion } from "motion/react";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const GenerateBtn = () => {

    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();

    const onClickHandler = () => {
        if (user) {
            navigate('/result');
        }
        else {
            setShowLogin(true);
        }
    }

    return (
        <motion.div className='pb-16 text-center'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold py-6 md:py-10'>See the magic. Try it now</h1>

            <motion.button onClick={onClickHandler} className='sm:text-lg bg-black border border-white text-white m-auto w-auto mt-8 px-12 py-2 flex items-center gap-2 rounded-full cursor-pointer hover:bg-blue-100 hover:text-black hover:border-black hover:shadow-none shadow-black shadow-md '
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8 }, duration: 1 }}
            >
                Generate Images
                <img className='h-6' src={assets.star_group} alt="star_group" />
            </motion.button>
        </motion.div>
    )
}

export default GenerateBtn