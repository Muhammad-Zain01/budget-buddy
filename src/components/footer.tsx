import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const GITHUB_URL = "https://github.com/Muhammad-Zain01";
export const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-zain01";
export const EMAIL = "zainmemon010@gmail.com";
export const WEBSITE = "https://muhammad-zain.com";

const Footer = () => {
  return (
    <footer className="bg-background dark:bg-gray-800 border-t py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 md:text-sm text-xs text-muted-foreground dark:text-gray-300">
          <p>
            Developed by{" "}
            <a
              href={WEBSITE}
              className="font-semibold hover:text-primary transition-colors"
            >
              Muhammad Zain
            </a>
            . All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <LinkedInLogoIcon />
            </Link>
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <GitHubLogoIcon />
            </Link>
            <Link
              href={`mailto:${EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <EnvelopeClosedIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
