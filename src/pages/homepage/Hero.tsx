
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
const Hero = () => {
    const carouselData = [
    { images: "/deadpool and wolverine1.jpeg" },
    {
      images:
        "https://images.unsplash.com/photo-1721332154191-ba5f1534266e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      images:
        "https://images.unsplash.com/photo-1721332154191-ba5f1534266e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      images:
        "https://images.unsplash.com/photo-1721332154191-ba5f1534266e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      images:
        "https://i.pinimg.com/originals/fb/57/a8/fb57a822c2ff4c1dbb3e1aad0ebc6be0.png",
    },
  ];

  return (
     <section className="relative">
       
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "center",
            loop: true,
          }}
           className="w-11/12 h-3/4 mx-auto"
        >
          <CarouselContent>
            {carouselData.map((items, index) => (
              <CarouselItem
                key={index}
                className="w-fit h-fit"
              >
                <div className="p-1 h-full">
                  <Card className="w-full mx-auto ">
                    <CardContent className="flex items-center justify-center p-0 h-[75vh] ">
                      <img
                        src={items.images}
                        alt="images"
                       sizes="100vw"
                        className="h-full w-full object-cover "
                      />
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
  )
}

export default Hero