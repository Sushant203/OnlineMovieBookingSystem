import NowShowing from "@/components/movie/NowShowing";
import Hero from "./Hero";


const HomePage = () => {
  
  return (
    <main>
      <section>
        <Hero/>
      </section>

     <section className="container py-10">
  {/* Now Showing */}
  <div className="bg-slate-400 contain-inline-size px-2 py-3">
    <h1 className="text-2xl font-bold font-serif ">Now Showing</h1>
  </div>
  <NowShowing />
</section>


      <section>
        {/* upcoming */}
      </section>
    </main>
  );
};

export default HomePage;
