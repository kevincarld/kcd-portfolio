import {
  KcdPortfolioEntity,
  KcdPortfolioEntityResponseCollection,
} from "@/lib/strapi/types";
import { apollo, gql } from "@/lib/apollo/client";
import { Button } from "@/app/(components)/ui/button";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiApollographql,
  SiGraphql,
  SiNodedotjs,
  SiShopify,
  SiWordpress,
  SiStrapi,
  SiTailwindcss,
  SiChakraui,
  SiMui,
} from "react-icons/si";
import { MdHttp } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import PageAnimate from "@/app/(components)/page-animate/page-animate";
import Image from "next/image";
import Pagination from "@/app/(components)/project-list/pagination/pagination";
import Snaps from "@/app/(components)/snaps/snaps";

const logos = [
  { React: <SiReact /> },
  { "Next JS": <SiNextdotjs /> },
  { Typescript: <SiTypescript /> },
  { Javascript: <SiJavascript /> },
  { "Apollo Client": <SiApollographql /> },
  { Graphql: <SiGraphql /> },
  { "Rest API": <MdHttp /> },
  { "Node JS": <SiNodedotjs /> },
  { Shopify: <SiShopify /> },
  { WordPress: <SiWordpress /> },
  { Strapi: <SiStrapi /> },
  { "Tailwind CSS": <SiTailwindcss /> },
  { "Chakra UI": <SiChakraui /> },
  { MUI: <SiMui /> },
];
export const dynamicParams = false;

export async function generateStaticParams() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!strapiUrl) throw new Error("No Strapi URL defined in environment.");

  const { data: projects }: { data: KcdPortfolioEntity[] } = await fetch(
    `${strapiUrl}/api/kcd-portfolios?fields[0]=slug`
  ).then((res) => res.json());

  if (!projects) return [];
  // console.log(projects);
  return projects.map((project) => ({
    slug: project.attributes?.slug,
  }));
}

export default async function SinglePortfolioPage({
  params,
}: {
  params: { slug: string };
}) {
  const GET_CURRENT_FOLIO = gql`
    query KcdPortfolios($filters: KcdPortfolioFiltersInput) {
      kcdPortfolios(filters: $filters) {
        data {
          attributes {
            title
            thumbnail {
              data {
                attributes {
                  width
                  url
                  name
                  height
                  alternativeText
                }
              }
            }
            jobsDone
            introduction
            link
            stack
            rank
            screenshots {
              data {
                attributes {
                  width
                  url
                  name
                  height
                  alternativeText
                }
              }
            }
          }
        }
      }
    }
  `;
  const { data } = await apollo.query<{
    kcdPortfolios: KcdPortfolioEntityResponseCollection;
  }>({
    query: GET_CURRENT_FOLIO,
    variables: {
      filters: {
        slug: {
          eq: params.slug,
        },
      },
    },
  });
  const project = data.kcdPortfolios.data[0]?.attributes;

  return (
    <section className="container-sm py-10 md:py-14 md:pb-20 min-h-[70vh]">
      <PageAnimate>
        <Pagination
          containerClass="hidden md:flex justify-end space-x-3 mb-16"
          rank={typeof project?.rank === "number" ? project?.rank : null}
        />

        <div className="md:grid md:grid-cols-2 md:items-start md:gap-12 xl:gap-32">
          <div>
            <h1 className="mb-3 text-3xl font-medium text-black sm:mb-4 md:hidden dark:text-white">
              {project?.title}
            </h1>

            {project?.thumbnail?.data?.attributes?.url && (
              <Image
                className="object-cover aspect-square rounded-xl"
                src={project?.thumbnail?.data?.attributes?.url}
                alt={project?.thumbnail?.data?.attributes?.alternativeText || project?.thumbnail?.data?.attributes?.name || "Project thumbnail"} 
                {...(project?.thumbnail?.data?.attributes?.width && {
                  width: project?.thumbnail?.data?.attributes?.width,
                })}
                {...(project?.thumbnail?.data?.attributes?.height && {
                  height: project?.thumbnail?.data?.attributes?.height,
                })}
              />
            )}

            {project?.link && (
              <a
                href={project?.link}
                target="_blank"
                referrerPolicy="no-referrer"
                className="block mt-6"
              >
                <Button variant="default">View project online</Button>
              </a>
            )}
          </div>

          <div className="mt-5 sm:mt-10 md:mt-0">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <h1 className="hidden text-3xl font-medium text-black md:block lg:text-4xl dark:text-white">
                  {project?.title}
                </h1>
                <p className="pb-3">{project?.introduction}</p>

                <div>
                  <ul role="list" className="space-y-2 sm:space-y-4">
                    {project?.jobsDone?.tasks?.map(
                      (string: string, index: number) => (
                        <li key={index} className="flex space-x-3">
                          <span className="flex mt-1 text-sm ">
                            <BsCheck2Circle />
                          </span>

                          <span className="text-sm sm:text-base">{string}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {Boolean(project?.screenshots?.data?.length) && (
          <>
            <h2 className="mt-10 text-xl text-black dark:text-white">
              Screenshots:
            </h2>
            
            <Snaps screenshots={project?.screenshots?.data || null}/>
          </>
        )}

        <h2 className="mt-10 text-xl text-black dark:text-white">
          Technologies used:
        </h2>
        <div className="grid grid-cols-2 gap-8 mt-10 md:grid-cols-5 lg:grid-cols-6">
          {project?.stack?.map((tech: string, index: number) => {
            //@ts-ignore
            const logo = logos.find((logo) => logo[tech]);
            if (!logo) return null;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center col-span-1 lg:col-span-1"
              >
                <span className="text-6xl text-black dark:text-white">
                  {logo && Object.values(logo)[0]}
                </span>
                <span className="mt-3">{tech}</span>
              </div>
            );
          })}
        </div>

        <Pagination
          containerClass="flex justify-center md:hidden space-x-3 mt-14"
          rank={typeof project?.rank === "number" ? project?.rank : null}
        />
      </PageAnimate>
    </section>
  );
}
