"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const carRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  
useEffect(() => {
  const container = containerRef.current;
  const car = carRef.current;

  if (!container || !car) return;

  let cards1Visible = false;
  let cards2Visible = false;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=2500",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress > 0.25 && !cards1Visible) {
            cards1Visible = true;

            gsap.to(["#card1", "#card2"], {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.2,
            });
          }

          if (progress <= 0.25 && cards1Visible) {
            cards1Visible = false;

            gsap.to(["#card1", "#card2"], {
              opacity: 0,
              y: 40,
              duration: 0.4,
              stagger: 0.1,
            });
          }

          if (progress > 0.5 && !cards2Visible) {
            cards2Visible = true;

            gsap.to("#card3", {
              opacity: 1,
              y: 0,
              duration: 0.5,
            });
          }

          if (progress <= 0.5 && cards2Visible) {
            cards2Visible = false;

            gsap.to("#card3", {
              opacity: 0,
              y: 40,
              duration: 0.4,
            });
          }
        },
      },
    });

    tl.to(car, { x: "70vw", ease: "none" }, 0);

    tl.to(
      ".text-mask",
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
      },
      0
    );
  }, container);

  return () => ctx.revert();
}, []);
  const text = "WELCOME ITZFIZZ";

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-black flex items-center overflow-hidden"
    >
      <div className="absolute left-20 z-10">
        <div
          className="text-mask"
          style={{ clipPath: "inset(0% 100% 0% 0%)" }}
        >
          <h1
            ref={textRef}
            className="text-white text-8xl font-bold whitespace-nowrap flex"
          >
            {text.split("").map((letter, i) => (
              <span key={i} className="inline-block">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <img
        ref={carRef}
        src="/car.png"
        alt="Car"
        className="absolute left-0 w-96 z-20"
      />

      <div
        id="card1"
        className="absolute top-10 right-20 bg-green-400 text-black p-6 rounded-xl opacity-0 translate-y-10"
      >
        <div className="text-5xl font-bold">58%</div>
        Increase in pick up point use
      </div>

      <div
        id="card2"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-green-400 text-black p-6 rounded-xl opacity-0 translate-y-10"
      >
        <div className="text-4xl font-bold">23%</div>
        Decreased in customer phone calls
      </div>

      <div
        id="card3"
        className="absolute top-10 left-10 bg-green-500 text-black p-6 rounded-xl opacity-0 translate-y-10"
      >
        <div className="text-5xl font-bold">27%</div>
        Increase in pick up point use
      </div>
    </section>
  );
}