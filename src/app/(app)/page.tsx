"use client"
import * as React from "react"
 
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import AutoPlay from "embla-carousel-autoplay"
import messages from "@/messages.json";
export default function Home() {
  return (
   <div>
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
      <section className="text-center  mb-8 md:mb-12 ">
        <h1 className="text-4xl md:text-5xl font-bold">
          Dive into the World of Anonymous Conversations
        </h1>
        <p className="md:text-xl mt-4 text-base">
          Explore the world of anonymous conversations with Random Message. Share your thoughts, feelings, and emotions with the world without revealing your identity.
        </p>
      </section>
      <Carousel plugins={[AutoPlay({ delay: 2000 })]} className="w-full max-w-xs">
      <CarouselContent>
        {
          messages.map((message, index) => (
            <CarouselItem key={index}>
            <div className="p-1">
              <Card>
              <CardHeader>
                {message.title}
              </CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-lg font-bold">{message.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    </main>
    
    <footer className="text-center text-sm text-gray-500 mt-8">
      <p>&copy; 2021 Random Message. All rights reserved.</p>
    </footer>
   </div>
  );
}
