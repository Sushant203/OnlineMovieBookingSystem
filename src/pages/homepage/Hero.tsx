import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type Movie = {
  poster: string;
};

const Hero = () => {
  const [carouselData, setCarouselData] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch movie posters from the database
    const fetchImagePoster = async () => {
      try {
        const response = await axios.get('http://localhost:4000/movie/now-showing'); // Replace with your actual API endpoint
        setCarouselData(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
    fetchImagePoster();
  }, []);

  return (
    <section className="relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-11/12 h-3/4 mx-auto"
      >
        <CarouselContent>
          {carouselData.map((item, index) => (
            <CarouselItem
              key={index}
              className="w-fit h-fit"
            >
              <div className="p-1 h-full">
                <Card className="w-full mx-auto">
                  <CardContent className="flex items-center justify-center p-0 h-[75vh]">
                    <div className="w-full h-full aspect-w-16 aspect-h-9">
                      <img
                        src={`http://localhost:4000/${item.poster}`}
                        alt={`Movie Poster ${index + 1}`}
                        sizes="100vw"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg" />
      </Carousel>
    </section>
  );
};

export default Hero;
