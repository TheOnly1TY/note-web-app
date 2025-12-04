import SectionHeading from "../_ui/SectionHeading";
import Image from "next/image";
export default function Features() {
  return (
    <section
      id="features"
      className="max-w-350 mx-auto px-6 md:px-12 my-15 md:my-20 lg:my-25 scroll-mt-24"
    >
      <SectionHeading
        tag="Unique Features"
        heading="Everything You Need to take Better Notes"
        description="Discover powerful tools created to help you write, organize, search, and customize your notes effortlessly."
      />
      <div className="mt-10 md:mt-12 lg:mt-14">
        <ul className="flex justify-center items-center flex-wrap gap-5">
          <li className="max-w-125  bg-white rounded-[1.25rem] shadow-[0px_1px_20px_rgba(0,0,0,0.05)] p-5">
            <Image
              src="/images/features/notes-creation-illustration.png"
              width={468}
              height={280}
              alt="Smart Note Creation"
            />
            <h3 className="text-2xl leading-[1.2] font-semibold text-neutral-950 mt-5">
              Smart Note Creation
            </h3>
            <p className="text-base text-neutral-600 leading-[1.4] mt-1">
              Create clean, organized notes instantly with a simple editor
              designed for fast writing and distraction-free focus.
            </p>
          </li>
          <li className="max-w-125 bg-white rounded-[20px] shadow-[0px_1px_20px_rgba(0,0,0,0.05)] p-5">
            <Image
              src="/images/features/search-tags-ilustration.jpg"
              width={468}
              height={280}
              alt="Search Tags Illustration"
            />
            <h3 className="text-2xl leading-[1.2] font-semibold text-neutral-950 mt-5">
              Powerful Search & Tags
            </h3>
            <p className="text-base text-neutral-600 leading-[1.4] mt-1">
              Quickly find any note fast search or orgnaize your ideas
              effortlessly with customizable tags.
            </p>
          </li>{" "}
          <li className="max-w-125 bg-white rounded-[20px] shadow-[0px_1px_20px_rgba(0,0,0,0.05)] p-5">
            <Image
              src="/images/features/achived-notes-illustration.jpg"
              width={468}
              height={280}
              alt="Achived Notes Illustration"
            />
            <h3 className="text-2xl leading-[1.2] font-semibold text-neutral-950 mt-5">
              Securing Archiving & Management
            </h3>
            <p className="text-base text-neutral-600 leading-[1.4] mt-1">
              Keep your workspace tidy by achiving old notes, restoring them
              anytime, or deleting clutter for a cleaner dashboard.
            </p>
          </li>{" "}
          <li className="max-w-125 bg-white rounded-[1.25rem] shadow-[0px_1px_20px_rgba(0,0,0,0.05)] p-5">
            <Image
              src="/images/features/notes-creation-illustration.png"
              width={468}
              height={280}
              alt="Smart Note Creation"
            />
            <h3 className="text-2xl leading-[1.2] font-semibold text-neutral-950 mt-5">
              Personalized Experience
            </h3>
            <p className="text-base text-neutral-600 leading-[1.4] mt-1">
              Customize your workspace with dark mode, light mode, selectable
              font families, and user profile settings that match.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
