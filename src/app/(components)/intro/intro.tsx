import { Button } from "../ui/button";
import Link from "next/link";

export default function Intro() {
  return (
    <section className="container py-8 md:flex md:justify-between md:py-14">
      <div className="md:flex md:flex-col">
        <h1 className="capitalize text-black dark:text-white font-semibold text-3xl lg:text-4xl">
          kevin carl david
        </h1>
        <h2 className="text-sm lg:text-base">Fullstack Developer</h2>

        <div className="hidden md:flex flex-1 items-end">
          <div className="flex flex-1 items-center">
            <a href="mailto:kevincarld@gmail.com">
              <Button variant="default">Let's chat</Button>
            </a>

            <span className="bg-gray-300 h-6 w-px ml-6" />

            <Link href="/about-me">
              <Button variant={"ghost"}>About me</Button>
            </Link>
          </div>
        </div>
      </div>

      <p className="py-8 max-w-md md:py-0">
        Experienced web developer with 5+ years specializing in WordPress
        customization. Transitioned to front-end development, creating immersive
        websites with React, Next.js, Chakra UI, and Tailwind CSS. Skilled in
        headless integrations, including WordPress and Shopify. Currently, I'm
        developing a booking platform using Next.js, Strapi, and Tailwind.
      </p>

      <div className="flex items-center md:hidden">
        <a href="mailto:kevincarld@gmail.com">
          <Button variant="default">Let's chat</Button>
        </a>

        <span className="bg-gray-300 h-6 w-px ml-6" />

        <Link href="/about-me">
          <Button variant={"ghost"}>About me</Button>
        </Link>
      </div>
    </section>
  );
}
