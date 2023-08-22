import { Button } from "../ui/button";
import Link from "next/link";
import { getClient, gql } from "@/lib/apollo/client";

export default async function Intro() {
  const query = gql`
    query {
      kcdPortfolioSetting {
        data {
          attributes {
            homepage {
              __typename
              ... on ComponentKcdHome {
                title
                subtitle
                resumeLink
                email
                linkedinLink
                githubLink
                introParagraph
              }
            }
          }
        }
      }
    }
  `;
  let settings = null;
  try {
    const { data } = await getClient().query({
      query,
    });
    settings = data;
    console.log(settings);
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="container-sm py-10 md:flex md:justify-between">
      <div className="md:flex md:flex-col">
        <h1 className="capitalize text-black dark:text-white font-semibold text-3xl lg:text-4xl">
          kevin carl david
        </h1>
        <p className="text-sm lg:text-base">Fullstack Developer</p>

        <div className="hidden md:flex flex-1 items-end">
          <div className="flex flex-1 items-center">
            <a href="mailto:kevincarld@gmail.com">
              <Button variant="default">Let's chat</Button>
            </a>

            <span className="bg-gray-300 h-6 w-px ml-6" />

            <Link href="/my-timeline">
              <Button variant={"ghost"}>My timeline</Button>
            </Link>
          </div>
        </div>
      </div>

      <p className="py-8 max-w-sm md:py-0">
        Hello there! I'm an enthusiastic web developer on a mission to create
        exceptional digital experiences. With a strong foundation in WordPress
        customization, I've evolved into a frontend specialist, harnessing
        React, Next.js, and more to bring websites to life.
      </p>

      <div className="flex items-center md:hidden">
        <a href="mailto:kevincarld@gmail.com">
          <Button variant="default">Let's chat</Button>
        </a>

        <span className="bg-gray-300 h-6 w-px ml-6" />

        <Link href="/my-timeline">
          <Button variant={"ghost"}>My timeline</Button>
        </Link>
      </div>
    </section>
  );
}
