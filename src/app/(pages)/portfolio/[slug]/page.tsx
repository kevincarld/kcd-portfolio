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
    <section className="container-sm py-10 md:py-14 min-h-[70vh]">
      <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
        <div>
          <img
            className="aspect-square object-cover rounded-xl"
            src={project?.thumbnail?.data?.attributes?.url}
            alt="Image Description"
          />
        </div>

        <div className="mt-5 sm:mt-10 lg:mt-0">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2 md:space-y-4">
              <h1 className="font-bold text-3xl lg:text-4xl text-black dark:text-white">
                {project?.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {project?.introduction}
              </p>

              <div>
                <ul role="list" className="space-y-2 sm:space-y-4">
                  {project?.jobsDone?.tasks?.map(
                    (string: string, index: number) => (
                      <li key={index} className="flex space-x-3">
                        <span className="flex text-sm mt-1 ">
                          <BsCheck2Circle />
                        </span>

                        <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                          {string}
                        </span>
                      </li>
                    )
                  )}
                </ul>

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
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl mt-10 text-black dark:text-white">
        Technologies used:
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
        {project?.stack?.map((tech: string, index: number) => {
          //@ts-ignore
          const logo = logos.find((logo) => logo[tech]);
          if (!logo) return null;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center col-span-1 md:col-span-2 lg:col-span-1"
            >
              <span className="text-6xl text-black dark:text-white">
                {logo && Object.values(logo)[0]}
              </span>
              <span className="mt-3">{tech}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
