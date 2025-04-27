import { cn } from "@/lib/utils";

const LINKS = [
  {
    href: "mailto:laughing0900@gmail.com",
    text: "Email",
  },
  {
    href: "https://www.linkedin.com/in/chengszelong/",
    text: "Linkedin",
  },
  {
    href: "https://github.com/Laughing0900",
    text: "GitHub",
  },
];

const Footer = () => {
  return (
    <div
      id="footer"
      className="relative h-full max-h-[800px] bg-background"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div
        className="relative h-[800px]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 h-full max-h-[800px] w-full">
          <div className="px-10 pt-10">
            <div className="flex flex-col space-y-2 ">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:opacity-95"
                >
                  {link.text}
                </a>
              ))}
            </div>
            <h2
              className={cn(
                "silkscreen absolute right-0 bottom-0 origin-bottom-right translate-x-[0.2ch] text-8xl text-foreground leading-[100%]",
                "md:translate-y-[0.1em] lg:text-[200px]",
                "max-md:-rotate-90 -translate-y-[7.5ch]",
              )}
            >
              Laughing
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
