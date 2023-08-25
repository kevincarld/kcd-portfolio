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
  SiPhp,
} from "react-icons/si";

export default function MyStack() {
  const logos = {
    frontend: [
      { React: <SiReact /> },
      { "Next JS": <SiNextdotjs /> },
      { Javascript: <SiJavascript /> },
      { Typescript: <SiTypescript /> },

      { "Tailwind CSS": <SiTailwindcss /> },
      { "Chakra UI": <SiChakraui /> },
      { MUI: <SiMui /> },
    ],
    backend: [
      { Apollo: <SiApollographql /> },
      { Graphql: <SiGraphql /> },
      { "Node JS": <SiNodedotjs /> },
      { PHP: <SiPhp /> },
      { WordPress: <SiWordpress /> },
      { Shopify: <SiShopify /> },
      { Strapi: <SiStrapi /> },
    ],
  };

  return (
    <section className="container">
      <h2 className="text-xl mt-10 text-black dark:text-white">
        Frontend stack:
      </h2>
      <div className="mt-10 grid grid-cols-3 gap-6 md:grid-cols-5 lg:grid-cols-8">
        {logos.frontend.map((logoObj, index: number) => {
          const [tech, icon] = Object.entries(logoObj)[0];

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center col-span-1 lg:col-span-1"
            >
              <span className="text-3xl text-black dark:text-white">
                {icon}
              </span>
              <span className="mt-3 text-sm">{tech}</span>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl mt-6 text-black dark:text-white">
        Backend stack:
      </h2>
      <div className="mt-10 grid grid-cols-3 gap-6 md:grid-cols-5 lg:grid-cols-8">
        {logos.backend.map((logoObj, index: number) => {
          const [tech, icon] = Object.entries(logoObj)[0];

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center col-span-1 lg:col-span-1"
            >
              <span className="text-3xl text-black dark:text-white">
                {icon}
              </span>
              <span className="mt-3 text-sm">{tech}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
