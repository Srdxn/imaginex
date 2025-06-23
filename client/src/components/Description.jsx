import React from 'react'
import { assets } from '../assets/assets';
import { motion } from "motion/react";

const Description = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-center'>Create AI Generated Images</h1>

      <p className='text-lg text-gray-400 mb-8'>Turn your imagination into stunning images</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img className='w-80 xl:w-96 rounded-lg border-2 border-white hover:scale-[1.02] transition-all duration-300' src={assets.sample_img_1} alt="sample_img" />

        <div>
          <h2 className='text-3xl font-medium max-w-lg mb-5'>Introducing <span className='text-blue-500'>imaginex</span>, an AI-powered text to image generator</h2>

          <p className='text-gray-400 mb-5'>Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>

          <p className='text-gray-400'>Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description