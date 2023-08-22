import { FiExternalLink, FiMail, FiDownload } from "react-icons/fi";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t-[1px] border-gray-300 dark:border-gray-600">
      <div className="container py-10">
        <div className="flex justify-between">
          <ul className="flex flex-col space-y-2">
            <li>
              <a
                className="text-sm flex items-center"
                href="https://docs.google.com/document/d/0BwGDG1n0D3WyMEpxby1iSkVkNVdTTmttbjFScjM2RGJVYVRV/edit?usp=sharing&ouid=112781189008170868665&resourcekey=0-gC9DzepejxMXGifjb5mWAw&rtpof=true&sd=true"
                target="_blank"
              >
                <FiDownload className="inline-block mr-2 " />
                Resumé
              </a>
            </li>
            <li>
              <a
                className="text-sm flex items-center"
                href="mailto:kevincarld@gmail.com"
              >
                <FiMail className="inline-block mr-2 " />
                kevincarld@gmail.com
              </a>
            </li>
            <li>
              <a
                className="text-sm flex items-center"
                href="https://www.linkedin.com/in/kevincarldavid/"
                target="_blank"
              >
                <FiExternalLink className="inline-block mr-2 " />
                Linkedin
              </a>
            </li>
            <li>
              <a
                className="text-sm flex items-center"
                href="https://github.com/kevincarld"
                target="_blank"
              >
                <FiExternalLink className="inline-block mr-2 " />
                Github
              </a>
            </li>
          </ul>

          <a href="#top">
            <Button
              variant="ghost"
              className="p-0 h-[1rem] min-h-0 leading-none text-sm text-gray-500 dark:text-gray-400"
            >
              _Top
            </Button>
          </a>
        </div>

        <p className="text-xs mt-6 opacity-70">
          &copy; {new Date().getFullYear()} Kevin Carl David
        </p>
      </div>
    </footer>
  );
}
