import { apollo, gql } from "@/lib/apollo/client";
import {
  KcdPortfolioSettingEntityResponse,
  ComponentKcdTimelineItem,
} from "@/lib/strapi/types";
import { MdWork, MdSchool } from "react-icons/md";

const GET_TIMELINE_ITEMS = gql`
  {
    kcdPortfolioSetting {
      data {
        attributes {
          timelineItems {
            ... on ComponentKcdTimelineItem {
              id
              title
              date
              description
              place
              icon
            }
          }
        }
      }
    }
  }
`;
export default async function Timeline() {
  let timelineItems: any = null;
  try {
    const { data } = await apollo.query<{
      kcdPortfolioSetting: KcdPortfolioSettingEntityResponse;
    }>({
      query: GET_TIMELINE_ITEMS,
    });

    timelineItems = data.kcdPortfolioSetting.data?.attributes?.timelineItems;
  } catch (error) {
    console.error(error);
  }
  return (
    <section className="max-w-[90%] lg:max-w-[860px] mx-auto py-10 my-10 md:my-14 border-t-[1px] border-gray-300 dark:border-gray-600 md:py-16">
      <ol className="relative ml-3 border-l border-gray-200 lg:ml-0 dark:border-gray-700">
        {timelineItems &&
          timelineItems.map((item: ComponentKcdTimelineItem, index: number) => (
            <li key={index} className="mb-16 ml-8">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-gray-100 dark:ring-gray-800 dark:bg-gray-800">
                {item.icon === "school" ? (
                  <MdSchool className="text-lg text-black dark:text-white" />
                ) : (
                  <MdWork className="text-lg text-black dark:text-white" />
                )}
              </span>
              <h3 className="mb-1 text-lg font-medium text-black dark:text-white">
                {item.title}
              </h3>
              {item?.place && (
                <p className="mb-1 text-base text-gray-500 dark:text-gray-300">
                  {item.place}
                </p>
              )}
              <time className="block mb-2 text-sm leading-none text-gray-400 dark:text-gray-300">
                {item.date}
              </time>
              <p className="text-base text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </li>
          ))}
      </ol>
    </section>
  );
}
