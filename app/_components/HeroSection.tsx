import Image from "next/image";
import Button from "@/app/_ui/Button";
import { CreditCard } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="max-w-350 mx-auto px-6 md:px-12 mb-[60px] md:mb-20 lg:mb-[100px]">
      <div className="flex flex-col justify-center items-center pt-37.5 text-center">
        <div className="flex items-center gap-1.5 border border-blue-light p-1.5 bg-blue-light/10 mb-4 rounded-full">
          <div className="-space-x-3 flex items-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <Image
                key={index}
                src={`/images/avatar/avatar-${index + 6}.jpg`}
                width={32}
                height={32}
                alt={`Avatar ${index + 6}`}
                className={`w-8 h-8 rounded-full object-cover border-2 border-white z-${
                  index + 1
                }0`}
              />
            ))}
          </div>

          <p className="text-sm text-blue-light">
            Trusted by <strong>1M+</strong> users
          </p>
        </div>
        <h1 className="max-w-175 text-3xl md:text-[3.75rem] text-neutral-950 leading-[1.2] font-semibold">
          Organize Your Notes,
          <br /> the Smart Way
        </h1>
        <p className="max-w-125 text-base font-medium text-neutral-600 mt-2.5 mb-5">
          Eliminate scattered documents and lost ideas using smart organization
          that arranges every note exactly where it belongs.
        </p>
        <Button>Get Started For Free</Button>
        <span className="flex items-center gap-2 text-sm text-neutral-600 mt-2.5">
          <CreditCard className="text-blue-light" />
          No Credit Card Required
        </span>

        <div className="mt-14">
          <Image
            src="/images/main-dashboard-image.jpg"
            width={1200}
            className="block w-full rounded-2xl md:rounded-[1.25rem] lg:rounded-[1.75rem] bg"
            height={800}
            quality={75}
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            alt="Notes Dashboard Illustration"
          />
        </div>
      </div>
    </div>
  );
}
