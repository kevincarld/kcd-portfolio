"use client";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Button } from "../ui/button";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import {
  KcdPortfolioEntity,
  KcdPortfolioEntityResponseCollection,
} from "@/lib/strapi/types";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { slugifier } from "@/lib/utils";

const GET_PORTFOLIOS = gql`
  query KcdPortfolios {
    kcdPortfolios(
      filters: { featured: { eq: true } }
      pagination: { limit: 8 }
    ) {
      __typename
      data {
        __typename
        attributes {
          __typename
          title
          stack
          category
          thumbnail {
            data {
              attributes {
                name
                alternativeText
                caption
                width
                height
                url
                previewUrl
              }
            }
          }
        }
      }
    }
  }
`;

export default function Marquee() {
  const [portfolios, setPortfolios] = useState<KcdPortfolioEntity[]>([]);
  const isD = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  const { loading, error, data } = useQuery<{
    kcdPortfolios: KcdPortfolioEntityResponseCollection;
  }>(GET_PORTFOLIOS, {
    onCompleted: (data) => {
      setPortfolios(data.kcdPortfolios.data);
    },
  });

  return (
    <section className="py-10 overflow-hidden md:py-16">
      <div className="container-sm mb-6 md:mb-14">
        <h2 className="text-lg text-black dark:text-white">Selected works</h2>
      </div>

      <motion.div
        initial={{ x: "10%" }}
        animate={{
          x: "-120%",
          transition: {
            duration: 8 * (isD ? 5 : 2),
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          },
        }}
        className="flex space-x-6 "
      >
        {loading
          ? new Array(10).fill(1).map((_, index) => {
              const imgRatio =
                index % 2 !== 0 ? "aspect-square" : "aspect-[6/9]";
              return (
                <div
                  className="flex items-center flex-shrink-0 basis-[50vw] lg:basis-[40vw] d:basis-[30vw] wide:basis-[25vw]"
                  key={index}
                >
                  <div className="w-full">
                    <Skeleton className={`${imgRatio} w-full rounded-lg`} />
                    <Skeleton className="mt-2 w-[80%] h-5" />
                    <Skeleton className="mt-2 w-[50%] h-5" />
                  </div>
                </div>
              );
            })
          : portfolios?.map(({ attributes }, index) => {
              const imgRatio =
                index % 2 !== 0 ? "aspect-square" : "aspect-[6/9]";
              return (
                <Link
                  href={`/portfolio/${slugifier(attributes?.title)}`}
                  className="flex items-center flex-shrink-0 basis-[50vw] lg:basis-[40vw] d:basis-[30vw] wide:basis-[25vw]"
                  key={index}
                >
                  <div>
                    <img
                      className={`${imgRatio} w-full object-cover rounded-xl`}
                      draggable="false"
                      src={attributes?.thumbnail?.data?.attributes?.url}
                      alt={
                        attributes?.thumbnail?.data?.attributes
                          ?.alternativeText || "Project thumbnail"
                      }
                      {...(attributes?.thumbnail?.data?.attributes?.width && {
                        width: attributes?.thumbnail?.data?.attributes?.width,
                      })}
                      {...(attributes?.thumbnail?.data?.attributes?.height && {
                        height: attributes?.thumbnail?.data?.attributes?.height,
                      })}
                    />
                    <h3 className="capitalize">{attributes?.title}</h3>
                    <p>{attributes?.category.replaceAll("_", " ")}</p>
                    <p className="capitalize">
                      {attributes?.stack?.join(", ")}
                    </p>
                  </div>
                </Link>
              );
            })}
      </motion.div>

      <div className="container-sm mt-6 md:mt-14">
        <Button className="flex" variant="default">
          <Link href="/portfolio">See all selected works</Link>
        </Button>
      </div>
    </section>
  );
}
