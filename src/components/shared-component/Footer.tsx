import React from 'react'

const Footer = () => {
  return (
   <footer className='bg-black text-slate-300 grid grid-cols-6'>
        <section className='col-span-2'>
            <img src='movie logo.png' alt='logo' className='h-16 w-16'/>
        </section>
        <section className='col-span-2 py-2     '>
            <h1>Home</h1>
            <h1>About</h1>
            <h1>Contact</h1>
            <p className='mb-0'>Copyright @ 2024</p>
        </section>

        <section className='col-span-2'>
            skfs
        </section>
       
       <section className='text-center items-center'>
        <h3>Online Movie Ticket Booking System </h3>
       </section>

        
   </footer>
  )
}

export default Footer