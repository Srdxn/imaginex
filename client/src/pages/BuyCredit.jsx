import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BuyCredit = () => {

  const { user, backendUrl, token, loadCreditsData, setShowLogin } = useContext(AppContext);

  const navigate = useNavigate();

  const initiatePayment = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Imaginex - Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      image: "assets.logo_icon",
      modal: {
        backdropclose: false,  // optional: prevent closing on backdrop click
        escape: true           // allow escape key to close
      },
      theme: {
        color: "#201c2c",
        theme: "dark"
      },
      handler: async (response) => {
        try {

          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response, { headers: { token } });

          if (data.success) {
            loadCreditsData();
            navigate('/');
            toast.success("Payment successful!", {
              onClose: () => {
                toast.success(data.message);
              },
            });
          } else {
            toast.error(data.message);
          }

        } catch (error) {
          toast.error(error.message);
        }
      }
    }

    const rzp = new window.Razorpay(options);
      rzp.open();

  }

  const paymentRazorpay = async (planId) => {
    try {

      if (!user) {
        setShowLogin(true);
        toast.info("You need to be logged in first")
        return;
      }

      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } });

      if (data.success) {

        initiatePayment(data.order);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <motion.div className='min-h-[80vh] text-center pt-15 mb-10'
      initial={{ opacity: 0.2, y: 50 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className='inline-flex text-center gap-2 bg-blue-100 text-black px-10 py-2 mb-6 rounded-full border border-blue-400/60'>Our Plans</button>

      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the Plan</h1>

      <motion.div className='flex flex-wrap justify-center gap-20 max-sm:gap-10 max-lg:gap-10 text-left'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {plans.map((item, index) => (
          <div key={index} className='bg-blue-100/15 border border-blue-100/50 rounded-lg py-12 px-10 shadow-md shadow-black/50 hover:scale-[1.02] transition-all duration-300'>
            <img width={40} src={assets.logo_icon} alt="logo_icon" />

            <p className='mt-3 mb-1 font-semibold text-[20px]'>{item.id}</p>

            <p className='text-sm text-gray-300/90'>{item.desc}</p>

            <p className='mt-6'>
              <span className='text-3xl font-medium'>&#8377;{item.price}</span><span className='text-gray-300/90 text-sm'> / {item.credits} credits</span></p>

            <p className='text-xs text-gray-300/90 font-extralight mt-1'>*1 &nbsp;credit per image generation</p>

            <button onClick={() => paymentRazorpay(item.id)} className='w-full mt-10 text-sm bg-black rounded-lg py-2.5 min-w-52 cursor-pointer hover:bg-blue-100 hover:text-black hover:border-black hover:scale-[1.02] transition-all duration-300'>{user ? 'Purchase' : 'Get Started'}</button>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default BuyCredit