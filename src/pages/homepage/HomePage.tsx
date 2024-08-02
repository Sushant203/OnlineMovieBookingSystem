import React from 'react'
import { Carousel } from 'react-carousel-ts';


const HomePage = () => {
  const data= [
    <div>1</div>,
    <div>3</div>,
    <div>3</div>
  ];
  return (
   <main>
      <section>
        {/* hero section */}
        <Carousel items={data} className='carousel'/>
      </section>

      <section>
        {/* Now Showing */}
      </section>

      <section>
        {/* upcoming */}
      </section>
   </main>
  )
}

export default HomePage