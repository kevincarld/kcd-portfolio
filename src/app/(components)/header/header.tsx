import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Switch } from "../ui/switch";
import Link from "next/link";

export default function Header() {
  return (
    <header
      id="top"
      className="container-sm flex justify-between pt-6 md:pt-10"
    >
      <div className="flex space-x-2 md:space-x-5">
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarImage src="" />
          <AvatarFallback>KD</AvatarFallback>
        </Avatar>

        <nav>
          <ul>
            <li>
              <Link
                className="text-sm md:text-base dark:text-gray-300"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-sm md:text-base dark:text-gray-300"
                href="/about-me"
              >
                About me
              </Link>
            </li>
            <li>
              <Link
                className="text-sm md:text-base dark:text-gray-300"
                href="/"
              >
                Work timeline
              </Link>
            </li>
            <li>
              <Link
                className="text-sm md:text-base dark:text-gray-300"
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
