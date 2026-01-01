import { LucideIcon } from "lucide-react";

interface ThemeOptionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  currentTheme: string;
  onThemeChange: (title: string) => void;
}

export default function ThemeOption({
  icon: Icon,
  title,
  description,
  currentTheme,
  onThemeChange,
}: ThemeOptionProps) {

  return (
    <div
      onClick={() => onThemeChange(title)}
      className={`flex justify-between items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 `}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-white dark:bg-[#0E121B] border border-neutral-200 dark:border-neutral-800 rounded-xl">
          <Icon className="w-6 h-6 text-neutral-950 dark:text-white" />
        </div>
        <div>
          <h3 className="text-sm text-left leading-5 -tracking-[1.5%] text-neutral-950 dark:text-white font-semibold">
            {title}
          </h3>
          <p className="text-xs leading-[120%] -tracking-[0.2px] text-neutral-700 dark:text-neutral-300">
            {description}
          </p>
        </div>
      </div>
      <button
        className={`w-[15px] h-[15px] rounded-full transition-colors bg-white dark:bg-[#0E121B] border-2 border-neutral-200 dark:border-neutral-800 `}
      />
    </div>
  );
}
