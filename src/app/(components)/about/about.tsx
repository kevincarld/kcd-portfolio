import { FiGithub, FiDownload, FiLinkedin } from "react-icons/fi";
import { gql, apollo } from "@/lib/apollo/client";
import { KcdPortfolioSettingEntityResponse } from "@/lib/strapi/types";
import { parseMarkdown } from "@/lib/utils";

const GET_CONTENT = gql`
  {
    kcdPortfolioSetting {
      data {
        attributes {
          timelinePage {
            ... on ComponentKcdIntro {
              paragraphOne
              paragraphTwo
              title
            }
          }
          homepage {
            ... on ComponentKcdHome {
              email
              githubLink
              linkedinLink
              resumeLink
            }
          }
        }
      }
    }
  }
`;
export default async function About() {
  let timelinePage: any = null;
  let settings: any = null;
  try {
    const { data } = await apollo.query<{
      kcdPortfolioSetting: KcdPortfolioSettingEntityResponse;
    }>({
      query: GET_CONTENT,
    });

    timelinePage = data.kcdPortfolioSetting.data?.attributes?.timelinePage[0];
    settings = data.kcdPortfolioSetting.data?.attributes?.homepage[0];
  } catch (error) {
    console.error(error);
  }
  return (
    <section className="max-w-[90%] lg:max-w-[860px] mx-auto py-10 md:py-14 my-10 md:my-14 border-y-[1px] border-gray-300 dark:border-gray-600">
      <h1 className="text-black dark:text-white text-3xl lg:text-4xl text-medium mb-10">
        {timelinePage?.title || ""}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        {timelinePage?.paragraphOne
          ? parseMarkdown(timelinePage.paragraphOne)
          : ""}

        <div className="flex flex-col justify-between">
          {timelinePage?.paragraphTwo
            ? parseMarkdown(timelinePage.paragraphTwo)
            : ""}

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 mt-6">
            <div className="flex space-x-6 items-center">
              <a
                className="md:hover:-translate-y-1 md:duration-700 text-lg"
                href={settings?.githubLink}
                target="_blank"
              >
                <FiGithub />
              </a>

              <a
                className="md:hover:-translate-y-1 md:duration-700 text-lg"
                href={settings?.linkedinLink}
                target="_blank"
              >
                <FiLinkedin />
              </a>

              <a
                className="md:hover:-translate-y-1 md:duration-700 text-lg"
                href={settings?.resumeLink}
                target="_blank"
              >
                <FiDownload />
              </a>
            </div>

            {/* <span className="hidden sm:block bg-gray-300 h-6 w-px mx-6 " />

            <a
              className="md:hover:-translate-y-1 md:duration-700 text-sm text-gray-500 dark:text-gray-300"
              href={`mailto:${settings?.email}`}
            >
              kevincarld@gmail.com
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}
