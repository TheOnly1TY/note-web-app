interface SectionHeading {
  tag: string;
  heading: string;
  description: string;
}

export default function SectionHeading({
  tag,
  heading,
  description,
}: SectionHeading) {
  return (
    <div className="text-center">
      <div className="inline-flex gap-1.5 border border-blue-light p-1.5 bg-blue-light/10 rounded-full">
        <p className="text-sm text-blue-light">{tag}</p>
      </div>
      <h2 className="text-2xl md:text-[3rem] leading-[1.1] font-semibold text-neutral-950 max-w-62.5 md:max-w-125 mx-auto mt-4">
        {heading}
      </h2>
      <p className="max-w-[20rem] mx-auto text-base leading-[1.4] text-neutral-600 mt-2.5">
        {description}
      </p>
    </div>
  );
}
