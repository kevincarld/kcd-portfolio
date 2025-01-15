import { FiExternalLink, FiMail, FiDownload } from "react-icons/fi";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-[1px] border-gray-300 dark:border-gray-600">
      <div className="container py-10">
        <div className="flex justify-between">
          <ul className="flex flex-col space-y-2">
            <li>
              <a
                className="flex items-center text-sm"
                href="https://docs.google.com/document/d/0BwGDG1n0D3WyMEpxby1iSkVkNVdTTmttbjFScjM2RGJVYVRV/edit?usp=sharing&ouid=112781189008170868665&resourcekey=0-gC9DzepejxMXGifjb5mWAw&rtpof=true&sd=true"
                target="_blank"
              >
                <FiDownload className="inline-block mr-2 " />
                Resumé
              </a>
            </li>
            <li>
              <a
                className="flex items-center text-sm"
                href="mailto:kevincarld@gmail.com"
              >
                <FiMail className="inline-block mr-2 " />
                kevincarld@gmail.com
              </a>
            </li>
            <li>
              <a
                className="flex items-center text-sm"
                href="https://www.linkedin.com/in/kevincarldavid/"
                target="_blank"
              >
                <FiExternalLink className="inline-block mr-2 " />
                Linkedin
              </a>
            </li>
            <li>
              <a
                className="flex items-center text-sm"
                href="https://github.com/kevincarld"
                target="_blank"
              >
                <FiExternalLink className="inline-block mr-2 " />
                Github
              </a>
            </li>
          </ul>

          <ul className="flex flex-col space-y-2">
            <a href="#top">
              <Button
                variant="ghost"
                className="p-0 h-[1rem] min-h-0 leading-none text-sm text-gray-500 dark:text-gray-400"
              >
                _Top
              </Button>
            </a>

            <li>
              <Link
                className="text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-slate-900 dark:hover:text-slate-50"
                href="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className="text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-slate-900 dark:hover:text-slate-50"
                href="/my-profile"
              >
                My Profile
              </Link>
            </li>

            <li>
              <Link
                className="text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-slate-900 dark:hover:text-slate-50"
                href="/portfolio"
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-6 text-xs opacity-70">
          &copy; {new Date().getFullYear()} Kevin Carl David
        </p>
      </div>
    </footer>
  );
}
