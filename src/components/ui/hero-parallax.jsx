"use client";
import React from "react";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const HeroParallax = ({
  products
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);
  return (
    (<div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>)
  );
};

export const Header = () => {
  return (
    (
          <section className="layout-pt-lg" id="gallery">
      <div data-anim-wrap="" className="container">
        <div className="row justify-center text-center" >
          <div className="col-xl-8 col-lg-10">
            <div data-split="lines" data-anim-child="split-lines delay-2">
              <div className="text-15 uppercase mb-30 sm:mb-10" >
                TIMELESS PHOTOGRAPHY
              </div>
              <h2 className="text-64 md:text-40 capitalize">
                Where Every Frame <br className="hidden md:block" />
    Tells Your Story
              </h2>
            </div>
            <div
              data-anim-child="slide-up delay-4"
              className="row justify-center"
            >
              <div className="col-lg-8">
                <p className="mt-40 md:mt-20">
                 Dive into our meticulously curated collection, where moments transcend time, emotions find their purest expression, and artistic excellence comes to life.Explore a world where every detail tells a story, and every frames invites you to experience the extraordinary.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
    )
  );
};

export const ProductCard = ({
  product,
  translate
}) => {
  return (
    (<motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0">
      <a href={product.link} className="block group-hover/product:shadow-2xl ">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title} />
      </a>

    </motion.div>)
  );
};
