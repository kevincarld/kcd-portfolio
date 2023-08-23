import { apollo, gql } from "@/lib/apollo/client";
import {
  KcdPortfolioSettingEntityResponse,
  ComponentKcdTimelineItem,
} from "@/lib/strapi/types";

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
    <section className="container py-10">
      <ol className="ml-3 lg:ml-0 relative border-l border-gray-200 dark:border-gray-700">
        {timelineItems.length &&
          timelineItems.map((item: ComponentKcdTimelineItem, index: number) => (
            <li key={index} className="mb-16 ml-8">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-gray-100 dark:ring-gray-900 dark:bg-gray-900">
                <svg
                  className="w-2.5 h-2.5 text-gray-800 dark:text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {item.date}
              </time>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </li>
          ))}
      </ol>
    </section>
  );
}
