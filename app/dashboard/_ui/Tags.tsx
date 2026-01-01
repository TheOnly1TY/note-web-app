"use client";

import { ChevronRight, Tag } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Tags({ tags }: { tags: string[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tag", tag);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const getSearchParam = searchParams.get("tag");

  return (
    <ul className="grid gap-1 mt-2">
      {tags.map((tag, index) => (
        <li
          key={index}
          onClick={() => handleTag(tag)}
          className={`flex justify-between items-center gap-3 text-neutral-700 dark:text-[#E0E4EA] py-2.5 px-3 rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${
            getSearchParam === tag
              ? "bg-neutral-100 dark:bg-neutral-800"
              : "hover:bg-neutral-100 dark:hover:bg-neutral-800 bg-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
            <Tag
              className={`w-5 h-5 ${
                getSearchParam === tag
                  ? "text-blue-light"
                  : "text-neutral-950 dark:text-neutral-200"
              }`}
            />
            <span className="text-sm leading-[120%] -tracking-[0.2px] font-medium">
              {tag}
            </span>
          </div>
          {getSearchParam === tag && (
            <ChevronRight className="w-5 h-5 ml-auto text-neutral-950 dark:text-neutral-200 duration-300 transition-all ease" />
          )}
        </li>
      ))}
    </ul>
  );
}
