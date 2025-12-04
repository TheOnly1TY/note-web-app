import SectionHeading from "../_ui/SectionHeading";
import { RefreshCcw, Folders, Search, Lock, Zap, Hand } from "lucide-react";
import BenefitsData from "@/public/data/Benefits.json";

const iconsMap: Record<string, typeof RefreshCcw> = {
  RefreshCcw: RefreshCcw,
  Folders: Folders,
  Search: Search,
  Lock: Lock,
  Zap: Zap,
  Hand: Hand,
};

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="max-w-350 mx-auto px-6 md:px-12 my-15 md:my-20 lg:my-25 scroll-mt-24"
    >
      <SectionHeading
        tag="Benefits"
        heading="Benefits That Truly Matter To You"
        description="Write, organize, and access your notes effortlessly. Fast and designed to simplify your workflow."
      />
      <ul className="flex flex-wrap justify-center gap-5 mt-10 md:mt-12 lg:mt-14">
        {BenefitsData.map((benefit, index) => {
          const IconComponent = iconsMap[benefit.icon] || RefreshCcw;
          return (
            <li
              key={index}
              className="w-full md:w-auto md:max-w-88.75 rounded-[1.25rem] bg-white p-5 shadow-[0px_1px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="w-10 h-10 bg-blue-light/10 rounded-md flex justify-center items-center mb-10">
                <IconComponent className="w-7 h-7 text-blue-light" />
              </div>
              <h3 className="text-xl leading-[1.4] text-neutral-950 font-semibold mb-1">
                {benefit.title}
              </h3>
              <p className="text-base leading-[1.4] font-medium text-neutral-600">
                {benefit.description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
