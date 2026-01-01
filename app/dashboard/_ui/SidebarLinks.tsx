"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { House, Archive } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarLinksProps {
  name: string;
  icon: string;
  to: string;
  key?: string;
}

const iconsMap: Record<string, typeof House> = {
  House: House,
  Archive: Archive,
};

export default function SidebarLinks({
  name,
  icon,
  to,
  key,
}: SidebarLinksProps) {
  const pathname = usePathname();
  const isActive =
    to === "/dashboard" ? pathname === "/dashboard" : pathname === to;
  const IconComponent = iconsMap[icon] || House;
  return (
    <Link
      key={key}
      href={to}
      className={`flex items-center gap-1.5 text-sm leading-[120%] w-full -tracking-[0.2px] font-medium py-3 px-4 rounded-lg text-neutral-950 dark:text-neutral-200 duration-300 transition-all ease ${
        isActive
          ? "bg-neutral-100 dark:bg-neutral-800"
          : "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
      }`}
    >
      <div className="flex items-center gap-2">
        <IconComponent
          className={`w-5 h-5 ${
            isActive
              ? "text-blue-light"
              : "text-neutral-950 dark:text-neutral-200"
          } duration-300 transition-all ease`}
        />
        {name}
      </div>
      {isActive && (
        <ChevronRight className="w-5 h-5 ml-auto text-neutral-950 dark:text-neutral-200 duration-300 transition-all ease" />
      )}
    </Link>
  );
}
