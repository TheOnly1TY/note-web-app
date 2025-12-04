"use client";

import SectionHeading from "../_ui/SectionHeading";
import { Quote, Star } from "lucide-react";
import TestimonialsData from "@/public/data/Testimonials.json";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="max-w-750 mx-auto md:px-12 lg:px-0 pb-5 my-15 md:my-20 lg:my-25 scroll-mt-24"
    >
      <SectionHeading
        tag="Testimonials"
        heading="Hear What Others Say About Us"
        description="Read reviews and feedback from our satisfied users."
      />
      <div className="relative overflow-hidden mt-10 md:mt-12 lg:mt-14">
        <div className="absolute left-0 top-0 w-[100px] h-full bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />

        <ul className="flex gap-5 animate-infinite-scroll">
          {TestimonialsData.map((testimonial, index) => (
            <li
              key={index}
              className="flex flex-col justify-between rounded-[20px] bg-white max-w-[352px] w-full h-[342px] shrink-0 shadow-[0px_1px_20px_rgba(0,0,0,0.05)]"
            >
              <blockquote className="text-base leading-[1.4] font-medium text-neutral-600 mx-6 my-6">
                <Quote className="inline-block text-neutral-950 mr-4" />{" "}
                {testimonial.blockquote}
              </blockquote>

              <footer>
                <div className="w-full h-px bg-neutral-200 my-6" />
                <div className="flex gap-3 mx-6 mb-6">
                  <img
                    src={testimonial.image}
                    className="w-[50px] h-[50px] object-cover rounded-xl"
                    width={50}
                    height={50}
                    alt={`${testimonial.name} profile picture`}
                    loading="lazy"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl leading-[1.4] font-semibold text-neutral-950">
                      {testimonial.name}
                    </h3>
                    <ul className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-[18px] h-[18px] ${
                            index >= testimonial.rating
                              ? "text-gray-300 fill-gray-300"
                              : "text-yellow-500 fill-yellow-500"
                          }`}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </footer>
            </li>
          ))}
          {TestimonialsData.map((testimonial, index) => (
            <li
              key={`duplicate-${index}`}
              className="flex flex-col justify-between rounded-[20px] bg-white max-w-[352px] w-full h-[342px] shrink-0 shadow-[0px_1px_20px_rgba(0,0,0,0.05)]"
            >
              <blockquote className="text-base leading-[1.4] font-medium text-neutral-600 mx-6 my-6">
                <Quote className="inline-block text-neutral-950 mr-4" />{" "}
                {testimonial.blockquote}
              </blockquote>

              <footer className="">
                <div className="w-full h-px bg-neutral-200 my-6" />
                <div className="flex gap-3 mx-6 mb-6">
                  <img
                    src={testimonial.image}
                    className="w-[50px] h-[50px] object-cover rounded-xl"
                    width={50}
                    height={50}
                    alt={`${testimonial.name} profile picture`}
                    loading="lazy"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl leading-[1.4] font-semibold text-neutral-950">
                      {testimonial.name}
                    </h3>
                    <ul className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-[18px] h-[18px] ${
                            index >= testimonial.rating
                              ? "text-gray-300 fill-gray-300"
                              : "text-yellow-500 fill-yellow-500"
                          }`}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </footer>
            </li>
          ))}
        </ul>

        <div className="absolute right-0 top-0 w-[100px] h-full bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(
              calc(
                -352px * ${TestimonialsData.length} - 20px * ${TestimonialsData.length}
              )
            );
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
