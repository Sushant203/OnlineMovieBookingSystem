import NowShowing from "@/components/movie/NowShowing";
import Hero from "./Hero";
import NextRelease from "@/components/movie/NextRelease";

const HomePage = () => {
  return (
    <main>
      <section className="container">
        <Hero />
      </section>

      <section className="container">
        {/* Now Showing */}
        <div className=" contain-inline-size px-2 py-3">
          <h1 className="text-2xl font-bold font-serif ">Now Showing</h1>
        </div>
        <NowShowing />
      </section>

      <section className="container">
        {/* upcoming */}
        <div className=" contain-inline-size px-2 py-3">
          <h1 className="text-2xl font-bold font-serif ">NextRelease</h1>
        </div>
        <NextRelease />
      </section>
    </main>
  );
};

export default HomePage;
