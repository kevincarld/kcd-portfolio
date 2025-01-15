import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Switch } from "../ui/switch";
import Link from "next/link";
import {
  ComponentKcdHome,
  KcdPortfolioSettingEntityResponse,
  KcdPortfolioSettingHomepageDynamicZone,
  Maybe,
} from "@/lib/strapi/types";
import { gql, apollo } from "@/lib/apollo/client";

let strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
export default async function Header() {
  const GET_HEADER_LOGO = gql`
    query {
      kcdPortfolioSetting {
        data {
          attributes {
            homepage {
              __typename
              ... on ComponentKcdHome {
                __typename
                headerLogo {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  let homeSettings: Pick<ComponentKcdHome, "headerLogo" | "__typename"> | null =
    null;
  let headerLogo = null;
  try {
    const { data } = await apollo.query<{
      kcdPortfolioSetting: KcdPortfolioSettingEntityResponse;
    }>({
      query: GET_HEADER_LOGO,
    });

    const settings:
      | Array<Maybe<KcdPortfolioSettingHomepageDynamicZone>>
      | undefined = data.kcdPortfolioSetting.data?.attributes?.homepage;

    homeSettings = settings?.find(
      (setting) => setting?.__typename === "ComponentKcdHome"
    ) as Pick<ComponentKcdHome, "headerLogo" | "__typename">;
    headerLogo = homeSettings?.headerLogo.data?.attributes?.formats?.thumbnail;
  } catch (error) {
    console.log(error);
  }

  if (!strapiUrl) {
    throw new Error("Missing env variable NEXT_PUBLIC_STRAPI_URL");
  }
  return (
    <header
      id="top"
      className="flex justify-between pt-6 container-sm md:pt-10"
    >
      <div className="flex space-x-2 md:space-x-5">
        <Link href="/" aria-label="Link to homepage">
          <Avatar>
            <AvatarImage
              alt="Main logo"
              src={headerLogo ? `${headerLogo.url}` : ""}
            />
            <AvatarFallback>KD</AvatarFallback>
          </Avatar>
        </Link>

        <nav>
          <ul className="flex flex-col space-y-1">
            <li>
              <Link
                className="text-sm transition-colors hover:text-black dark:hover:text-white md:text-base dark:text-gray-300"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-sm transition-colors hover:text-black dark:hover:text-white md:text-base dark:text-gray-300"
                href="/my-profile"
              >
                My profile
              </Link>
            </li>
            <li>
              <Link
                className="text-sm transition-colors hover:text-black dark:hover:text-white md:text-base dark:text-gray-300"
                href="/portfolio"
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Switch />
    </header>
  );
}
