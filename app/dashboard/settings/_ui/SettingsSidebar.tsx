"use client";

import { ChevronRight } from "lucide-react";
import { useSettings } from "../../_contexts/SettingsContext";
import { Sun, Type, LockKeyhole, LogOut } from "lucide-react";

const iconsMap: Record<string, typeof Sun> = {
  Sun: Sun,
  Type: Type,
  LockKeyhole: LockKeyhole,
  LogOut: LogOut,
};

interface SettingsSidebarProps {
  name: string;
  icon: string;
  action?: () => void;
}

export default function SettingsSidebar({
  name,
  icon,
  action,
}: SettingsSidebarProps) {
  const { currentSettings } = useSettings();
  const IconComponent = iconsMap[icon] || Sun;
  return (
    <button
      className={`flex items-center gap-1.5 text-sm leading-[120%] w-full -tracking-[0.2px] font-medium py-3 px-4 rounded-lg text-neutral-950 dark:text-neutral-200 duration-300 transition-all ease cursor-pointer ${
        currentSettings === name
          ? "bg-neutral-100 dark:bg-neutral-800"
          : "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
      }  duration-300 transition-all ease`}
      onClick={action}
    >
      <div className="flex items-center gap-2">
        <IconComponent
          className={`w-5 h-5 duration-300 transition-all ease ${
            currentSettings === name
              ? "text-blue-light"
              : "text-neutral-950 dark:text-white"
          }`}
        />
        {name}
      </div>

      {currentSettings === name && (
        <ChevronRight className="w-5 h-5 ml-auto text-neutral-950 dark:text-white duration-300 transition-all ease" />
      )}
    </button>
  );
}
