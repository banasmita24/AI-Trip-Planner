import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center mx-57 gap-9">
      <h1
      className="font-extrabold text-[50px] text-center mt-16">
<<<<<<< HEAD
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> <br></br> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator,creating custom itineraries tailored to your interests and budget.</p>
=======
        <span className='text-[#f56551]'>🌍 Discover Your Next Adventure with the Power of AI:</span> <br></br> Your Journey, Your Way</h1>
        <p className='text-xl text-gray-500 text-center'>Say goodbye to generic travel plans! Let your personal AI trip planner craft unforgettable experiences with custom itineraries </p>
>>>>>>> 1fb3343129f3fa7ca5598456090cf5ef24053e61
        <Link to={'/create-trip'}>
          <Button className="!bg-white !text-black !shadow !border !border-gray-300 rounded-full">Get Started, It's Free.</Button>
        </Link>
        <img src='/landing.png'/>
    </div>
  )
}

export default Hero
