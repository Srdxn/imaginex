import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from "motion/react";

const Steps = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-32'
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    >
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>

        <p className='text-lg text-gray-400 mb-8'>Transform words into stunning images</p>

        <div className='space-y-8 w-full max-w-3xl text-sm'>
            {stepsData.map((item, index) => (
                <div className='flex items-center gap-5 p-5 px-8 cursor-pointer bg-blue-100/20 shadow-md shadow-stone-900 border border-blue-100/50 hover:scale-[1.02] transition-all duration-300 rounded-2xl' key={index}>
                    <img width={40} src={item.icon} alt="/item_icon" />
                    <div>
                        <h2 className='text-xl font-medium'>{item.title}</h2>
                        <p className='text-gray-300/85'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default Steps