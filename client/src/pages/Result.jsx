import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { motion } from "motion/react";
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_2);
  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');


  const {generateImage} = useContext(AppContext);


const onSubmitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (input) {
      const image = await generateImage(input);
      console.log("Image received:", image);

      if (image) {
        setHasImageLoaded(true);
        setImage(image);
        toast.success('Image generated successfully');
      }
    }
  } catch (err) {
    console.error("Unhandled error in onSubmitHandler:", err);
    toast.error("Unexpected error occurred");
  } finally {
    setLoading(false); // ensures this always runs
  }
};

  return (
    <motion.form onSubmit={onSubmitHandler} className='flex flex-col min-h-[85vh] items-center justify-center'
      initial={{ opacity: 0.2, y: 50 }}
      transition={{ duration: 0.6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div>
        <div className='relative'>
          <img className='max-w-sm select-none pointer-events-none' src={image} alt="sample_img" />

          <span className={`absolute bottom-0 left-0 h-0.5 bg-gray-400 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
        </div>

        <p className={!loading ? 'hidden' : 'text-gray-400 mt-1 text-sm'}>Generating image.....</p>
      </div>

      {!hasImageLoaded &&
        <motion.div className='flex w-full max-w-xl bg-blue-100/20 border border-blue-100/50 rounded-full mt-10 text-sm '
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <input
            onChange={e => setInput(e.target.value)} value={input}
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20' type="text" placeholder='Describe what you want to generate' />
          <button className='bg-black text-white py-3 px-10 sm:px-16 rounded-full cursor-pointer hover:bg-blue-100 hover:text-black transition-all duration-300' type='submit'>Generate</button>
        </motion.div>
      }

      {hasImageLoaded &&
        <div className='flex gap-2 flex-wrap justify-center text-sm p-1 mt-10 rounded-full'>
          <p className='bg-transparent border px-8 py-3 rounded-full cursor-pointer shadow-md shadow-black/50 hover:bg-blue-100/20 hover:text-gray-300/85 hover:shadow-none hover:scale-[1.02] transition-all duration-200' onClick={() => { setHasImageLoaded(false) }}>Generate Another</p>
          <a href={image} download="generated-image.jpg" className='flex items-center justify-center bg-[#a3d2c1] px-10 py-3 text-black shadow-md shadow-black/50 rounded-full cursor-pointer hover:bg-[#6ac3a2] hover:shadow-none hover:scale-[1.02] transition-all duration-200'>
            <img src={assets.download_icon1} alt="" className='w-4 mr-2 ml-[-2px]' />
            Download
          </a>
        </div>
      }
    </motion.form>
  )
}

export default Result