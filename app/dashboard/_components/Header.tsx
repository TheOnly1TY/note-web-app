"use client";

import { Search, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  const ROUTE_TITLES: Record<string, string> = {
    "/dashboard": "All Notes",
    "/dashboard/archived": "Archived Notes",
    "/dashboard/settings": "Settings",
  };

  const headerKind = tag ? "tag" : "default";

  return (
    <header className="lg:h-[81px] lg:border-b lg:border-neutral-200 lg:dark:border-neutral-800 bg-white dark:bg-[#0E121B] lg:sticky top-0 lg:z-50 flex flex-col lg:flex-row lg:items-center lg:justify-between px-6 md:px-10 lg:px-8 mt-5 md:mt-6 lg:mt-0">
      <h2 className="text-2xl leading-[120%] font-bold -tracking-[0.5px] text-neutral-950 dark:text-white">
        {headerKind === "tag" ? (
          <>
            <span className="text-neutral-600 dark:text-neutral-300">
              Notes Tagged:{" "}
            </span>
            {tag!}
          </>
        ) : (
          ROUTE_TITLES[pathname]
        )}
      </h2>
      <div className="flex items-center gap-4">
        {/* FIXME: TEMPORAL HIDDEN */}
        <div
          className={`hidden lg:flex items-center w-full lg:w-[300px] gap-2 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-3 bg-white dark:bg-[#0E121B] my-4 lg:my-0 `}
        >
          <Search className="w-5 h-5 text-neutral-500" />

          <input
            type="text"
            placeholder="Search by title, content, or tags..."
            className="flex-1 text-sm leading-[130%] -tracking-[0.2px] placeholder:text-neutral-500 placeholder:dark:text-neutral-400 text-neutral-950 dark:text-white outline-none bg-transparent"
          />
        </div>
        <Link
          href="/dashboard/settings"
          className={`hidden lg:inline-flex items-center justify-center w-[42px] h-[42px] hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-800 rounded-lg duratiom-300 transition-all ease ${
            pathname === "/dashboard/settings"
              ? "bg-neutral-100"
              : "bg-transparent hover:bg-neutral-100"
          }`}
        >
          <Settings
            className={`w-6 h-6 ${
              pathname === "/dashboard/settings"
                ? "text-blue-light "
                : " text-neutral-500"
            }`}
          />
        </Link>
      </div>
    </header>
  );
}
