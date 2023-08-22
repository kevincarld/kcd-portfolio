"use client";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Button } from "../ui/button";
import Link from "next/link";
const mockData = [
  {
    img: "https://placehold.co/600x400/c00c00/fff",
    title: "Project 1",
    category: "Website Development",
  },
  {
    img: "https://placehold.co/600x400/c00c00/fff",
    title: "Project 2",
    category: "Website Design",
  },
  {
    img: "https://placehold.co/600x400/c00c00/fff",
    title: "Project 3",
    category: "Website Development",
  },
  {
    img: "https://placehold.co/600x400/c00c00/fff",
    title: "Project 4",
    category: "Website Development",
  },
  {
    img: "https://placehold.co/600x400/c00c00/fff",
    title: "Project 5",
    category: "Website Development",
  },
];

export default function Marquee() {
  const isD = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  return (
    <section className="py-10 overflow-hidden">
      <div className="container-sm mb-6">
        <h2 className="text-lg text-black dark:text-white">Selected works</h2>
      </div>

      <motion.div
        initial={{ x: "10%" }}
        animate={{
          x: "-120%",
          transition: {
            duration: mockData.length * (isD ? 5 : 2),
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          },
        }}
        className="flex space-x-6 "
      >
        {mockData.map((item, index) => {
          const imgRatio = index % 2 !== 0 ? "aspect-square" : "aspect-[6/9]";
          return (
            <div
              className="flex items-center flex-shrink-0 basis-[50vw] lg:basis-[40vw] d:basis-[30vw] wide:basis-[25vw]"
              key={index}
            >
              <div>
                <img
                  className={`${imgRatio} w-full object-cover rounded-xl`}
                  draggable="false"
                  src={item.img}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      <div className="container-sm mt-6">
        <Button className="flex md:ml-auto" variant="default">
          <Link href="/portfolio">See all selected works</Link>
        </Button>
      </div>
    </section>
  );
}
