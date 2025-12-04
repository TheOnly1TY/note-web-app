"use client";
import Button from "../_ui/Button";
import Logo from "../_ui/Logo";

export default function Footer() {
  const phone = "2348142858076";
  const message = "Hello Temitayo, I came across the Note Web App you built.";
  const year: number = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="max-w-350 mx-auto pt-6 px-6 md:pt-12 md:px-12 pb-5">
        <div className="flex flex-col md:flex-row w-full justify-between">
          <div>
            <Logo />
            <p className="text-base leading-[1.4] font-medium text-neutral-600 max-w-87.5 mt-2.5 mb-5">
              Capture, organize, and access your notes effortlessly—fast,
              secure, and available anytime across all your devices.
            </p>
            <Button>Get Started For Free</Button>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:w-62.5 gap-5 mt-5 md:mt-0">
            <div>
              <h3 className="text-xl leading-[1.4] text-neutral-950 font-semibold">
                Sections
              </h3>
              <ul className="flex flex-col gap-2.5 mt-4">
                <li>
                  <a
                    href="#features"
                    className="text-base leading-[1.4] text-neutral-600"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="text-base leading-[1.4] text-neutral-600"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-base leading-[1.4] text-neutral-600"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-base leading-[1.4] text-neutral-600"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl leading-[1.4] text-neutral-950 font-semibold">
                Socials
              </h3>
              <ul className="flex flex-col gap-2.5 mt-4">
                <li>
                  <a
                    href={`https://wa.me/${phone}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base leading-[1.4] text-neutral-600"
                  >
                    Whatsapp
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/dev_TEMITAYO"
                    className="text-base leading-[1.4] text-neutral-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter/X
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/anifowose-temitayo-ba4916286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    className="text-base leading-[1.4] text-neutral-600"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* LINE */}
        <div className="w-full h-px bg-neutral-200 my-5" />
        {/* LINE */}
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
          <p className="text-base text-neutral-950 font-semibold">
            All Rights Reserved &copy; {year} Notes
          </p>
          <p className="text-sm text-neutral-600 font-medium">
            Built By{" "}
            <a
              href="https://github.com/TheOnly1TY"
              target="_blank"
              className="text-blue-light hover:text-blue-dark transform-all duration-300 ease underline"
              title="Visit Profile"
              rel="noopener noreferrer"
            >
              Anifowose Temitayo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
