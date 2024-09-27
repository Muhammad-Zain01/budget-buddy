import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export const GITHUB_URL = "https://github.com/Muhammad-Zain01";
export const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-zain01";
export const EMAIL = "zainmemon010@gmail.com";
export const WEBSITE = "https://muhammad-zain.com";

const Footer = () => {
  return (
    <footer className="bg-background dark:bg-gray-800 border-t py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-muted-foreground dark:text-gray-300">
          <p className="text-center text-[12px] sm:text-left mb-2 sm:mb-0">
            Developed by{" "}
            <a
              href={WEBSITE}
              className="font-semibold hover:text-primary transition-colors"
            >
              Muhammad Zain
            </a>
            . All rights reserved.
          </p>
          <div className="flex  space-x-5 md:space-x-3">
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <LinkedInLogoIcon className="w-5 h-5 " />
            </Link>
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <GitHubLogoIcon className="w-5 h-5 " />
            </Link>
            <Link
              href={`mailto:${EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <EnvelopeClosedIcon className="w-5 h-5 " />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
