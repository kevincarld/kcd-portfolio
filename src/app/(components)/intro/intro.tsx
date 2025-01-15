import { Button } from "../ui/button";
import Link from "next/link";
import { getClient, gql, apollo } from "@/lib/apollo/client";
import {
  ComponentKcdHome,
  KcdPortfolioSettingEntityResponse,
  KcdPortfolioSettingHomepageDynamicZone,
  Maybe,
} from "@/lib/strapi/types";
export default async function Intro() {
  const GET_HOME_SETTINGS = gql`
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

  let homeSettings: Omit<ComponentKcdHome, "headerLogo"> | null = null;
  try {
    const { data } = await apollo.query<{
      kcdPortfolioSetting: KcdPortfolioSettingEntityResponse;
    }>({
      query: GET_HOME_SETTINGS,
    });

    const settings:
      | Array<Maybe<KcdPortfolioSettingHomepageDynamicZone>>
      | undefined = data.kcdPortfolioSetting.data?.attributes?.homepage;
    homeSettings = settings?.find(
      (setting) => setting?.__typename === "ComponentKcdHome"
    ) as Omit<ComponentKcdHome, "headerLogo">;
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="py-10 container-sm md:py-14 md:flex md:justify-between">
      {homeSettings && (
        <>
          <div className="md:flex md:flex-col">
            <h1 className="text-3xl font-semibold text-black capitalize dark:text-white lg:text-4xl">
              {homeSettings.title}
            </h1>
            <p className="text-sm lg:text-base">{homeSettings.subtitle}</p>

            <div className="items-end flex-1 hidden md:flex">
              <div className="flex items-center flex-1">
                <Cta email={homeSettings.email} />
              </div>
            </div>
          </div>

          <p className="max-w-sm py-8 md:py-0">{homeSettings.introParagraph}</p>

          <div className="flex items-center md:hidden">
            <Cta email={homeSettings.email} />
          </div>
        </>
      )}
    </section>
  );
}

type CtaProps = {
  email: string;
};
const Cta = ({ email }: CtaProps) => (
  <>
    <Link href="/my-profile">
      <Button variant={"default"}>My Profile</Button>
    </Link>

    <span className="w-px h-6 ml-6 bg-gray-300" />

    <a href={`mailto:${email}`}>
      <Button variant="ghost">Email me</Button>
    </a>
  </>
);
