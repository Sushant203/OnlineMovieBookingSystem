import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import H1 from "/1.jpg";
import H2 from "/2.jpg";
import H3 from "/3.jpg";
import Hero2 from "/hero1.png";
import Hero3 from "/hero2.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  // Static array of local images
  const carouselData = [
    { poster: H1 },
    // { poster: H2 },
    { poster: H3 },
    // { poster: Hero2 },
    { poster: Hero3 },
  ];

  return (
    <section className="relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000, // Increased delay for better user experience
          }),
        ]}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full h-[80vh] mx-auto" // Adjusted height for better view
      >
        <CarouselContent>
          {carouselData.map((item, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <div className="flex items-center justify-center p-2">
                <Card className="w-full h-full shadow-lg rounded-lg overflow-hidden">
                  <CardContent className="flex items-center justify-center p-0 h-full">
                    <div className="w-full h-full">
                      <img
                        src={item.poster}
                        alt={`Hero image ${index + 1}`}
                        className="w-full h-full object-cover" // Changed to object-cover for better fit
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-200 transition" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-200 transition" />
      </Carousel>
    </section>
  );
};

export default Hero;
