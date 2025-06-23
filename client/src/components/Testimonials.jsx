import React from 'react'
import { assets, testimonialsData } from '../assets/assets';
import { motion } from "motion/react";

const Testimonials = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-20 py-12'
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    >
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-center'>Customers Reviews</h1>

        <p className='text-lg text-gray-400 mb-8'>What Our Users Are Saying</p>

        <div className='flex flex-wrap gap-6 w-full'> {/*change the  width*/}
            {testimonialsData.map((testimonial, index) => (
                <div key={index} className='bg-blue-100/20 p-12 rounded-2xl shadow-lg shadow-black/40 border border-blue-100/50 w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300'>
                    <div className='flex flex-col items-center'>
                        <img className='rounded-full w-10' src={testimonial.image} alt="profile_img" />

                        <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>

                        <p className='text-gray-300/85 mb-4'>{testimonial.role}</p>

                        <div className='flex mb-4'>
                            {Array(testimonial.stars).fill().map((item, index) => (
                                <img key={index} src={assets.rating_star} alt="rating_star" />
                            ))}
                        </div>

                        <p className='text-sm text-center'>{testimonial.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default Testimonials