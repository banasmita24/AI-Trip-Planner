import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center mx-57 gap-9">
      <h1
      className="font-extrabold text-[50px] text-center mt-16">
        <span className='text-[#f56551]'>🌍 Discover Your Next Adventure with the Power of AI:</span> <br></br> Your Journey, Your Way</h1>
<<<<<<< HEAD
        <p className='text-xl text-gray-500 text-center'>Say goodbye to generic travel plans! Let your personal AI trip planner craft unforgettable experiences with custom itineraries </p>
=======
        <p className='text-xl text-gray-500 text-center'>Say goodbye to generic travel plans! Let your personal AI trip planner craft unforgettable experiences with custom itineraries — all tailored to your interests, style, and budget.</p>
>>>>>>> ecd7b51f80daeec28cacbc1db96fead90c8da19e
        <Link to={'/create-trip'}>
          <Button className="!bg-white !text-black !shadow !border !border-gray-300 rounded-full">Get Started, It's Free.</Button>
        </Link>
        <img src='/landing.png'/>
    </div>
  )
}

export default Hero
