import { FiGithub, FiDownload, FiLinkedin } from "react-icons/fi";
export default function About() {
  return (
    <section className="max-w-[90%] lg:max-w-[860px] mx-auto py-10 my-10 border-y-[1px] border-gray-300 dark:border-gray-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        <p>
          Hi! Kamusta! I'm an experienced web developer who embarked on a unique
          journey. Originally, I graduated from an aeronautical college with a
          degree in avionics technology. Although my studies didn't align with
          my true passion, one thing remained clear: I wanted to be a
          programmer. The allure of creating and the power of coding drove me
          forward. Through dedicated self-study and while working various jobs,
          I delved deeper into coding and fell in love with its creative
          potential.
        </p>

        <div>
          <p>
            I've journeyed from customizing WordPress to building dynamic
            e-commerce platforms at an agency. Transitioning to frontend
            development with React and Next.js, I've delved into headless CMS
            solutions. Now, I'm focused on creating a booking platform using
            Next.js, Strapi, and Tailwind CSS.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 mt-6">
            <div className="flex space-x-6 items-center">
              <a
                className="text-lg"
                href="https://github.com/kevincarld"
                target="_blank"
              >
                <FiGithub />
              </a>

              <a
                className="text-lg"
                href="https://www.linkedin.com/in/kevincarldavid/"
                target="_blank"
              >
                <FiLinkedin />
              </a>

              <a
                className="text-lg"
                href="https://docs.google.com/document/d/0BwGDG1n0D3WyMEpxby1iSkVkNVdTTmttbjFScjM2RGJVYVRV/edit?usp=sharing&ouid=112781189008170868665&resourcekey=0-gC9DzepejxMXGifjb5mWAw&rtpof=true&sd=true"
              >
                <FiDownload />
              </a>
            </div>

            <span className="hidden sm:block bg-gray-300 h-6 w-px mx-6 " />

            <a
              className="text-sm text-gray-500 dark:text-gray-300"
              href="mailto:kevincarld@gmail.com"
            >
              kevincarld@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
