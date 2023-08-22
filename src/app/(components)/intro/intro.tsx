import { Button } from "../ui/button";
import Link from "next/link";
import { getClient, gql } from "@/lib/apollo/client";
import {
  ComponentKcdHome,
  KcdPortfolioSettingEntityResponse,
  KcdPortfolioSettingHomepageDynamicZone,
  Maybe,
} from "@/lib/strapi/types";
export default async function Intro() {
  const query = gql`
    query {
      kcdPortfolioSetting {
        __typename
        data {
          __typename
          attributes {
            __typename
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

  let homeSettings: ComponentKcdHome | null = null;
  try {
    const { data } = await getClient().query<{
      kcdPortfolioSetting: KcdPortfolioSettingEntityResponse;
    }>({
      query,
    });

    const settings:
      | Array<Maybe<KcdPortfolioSettingHomepageDynamicZone>>
      | undefined = data.kcdPortfolioSetting.data?.attributes?.homepage;
    homeSettings = settings?.find(
      (setting) => setting?.__typename === "ComponentKcdHome"
    ) as ComponentKcdHome;
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="container-sm py-10 md:flex md:justify-between">
      {homeSettings && (
        <>
          <div className="md:flex md:flex-col">
            <h1 className="capitalize text-black dark:text-white font-semibold text-3xl lg:text-4xl">
              {homeSettings.title}
            </h1>
            <p className="text-sm lg:text-base">{homeSettings.subtitle}</p>

            <div className="hidden md:flex flex-1 items-end">
              <div className="flex flex-1 items-center">
                <Cta />
              </div>
            </div>
          </div>

          <p className="py-8 max-w-sm md:py-0">{homeSettings.introParagraph}</p>

          <div className="flex items-center md:hidden">
            <Cta />
          </div>
        </>
      )}
    </section>
  );
}

const Cta = () => (
  <>
    <Link href="/my-timeline">
      <Button variant={"default"}>My timeline</Button>
    </Link>

    <span className="bg-gray-300 h-6 w-px ml-6" />

    <a href="mailto:kevincarld@gmail.com">
      <Button variant="ghost">Email me</Button>
    </a>
  </>
);
