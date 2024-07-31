import React from 'react'
import { NavData } from '../../data/navdata'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className=' flex justify-between border-none border-slate-200 shadow-md py-2 px-2 items-center '>
        <section className='mx-10 flex justify-normal gap-6'>
        
            <img src="movie logo.png" alt="Logo" className='h-8'/>
        
        {NavData.map((item,index)=>{
            return(
                <div key={index} className=''>
                    <Link to={item.path} >
                    <h2 className='flex justify-between text-2xl text-slate-700'>{item.title}</h2>
                   </Link>
                </div>
               
            )
        })}
        </section>
         <section className='mx-10 text-2xl'>
                    
                    login
                </section>
    </nav>
  )
}

export default Navbar