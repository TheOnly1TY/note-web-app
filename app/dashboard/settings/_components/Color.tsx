import { useState } from "react";
import Button from "@/app/_ui/Button";
import { Sun, Moon, Monitor } from "lucide-react";
import ThemeOption from "../_ui/ThemeOption";
import { updateUserTheme } from "@/app/_libs/action";

interface ColorThemeProps {
  currentTheme?: string;
}

export default function ColorTheme({
  currentTheme = "light",
}: ColorThemeProps) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [isLoading, setIsLoading] = useState(false);

  const colorOptions = [
    {
      icon: Sun,
      title: "Light Mode",
      description: "Pick a clean and classic light theme",
    },
    {
      icon: Moon,
      title: "Dark Mode",
      description: "Select a sleek and modern dark theme",
    },
    {
      icon: Monitor,
      title: "System",
      description: "Adapts to your device's theme",
    },
  ];

  const handleThemeChange = (theme: string) => {
    const formattedTheme = theme.split(" ")[0].toLowerCase();
    const resolvedTheme =
      formattedTheme === "system" ? "light" : formattedTheme;
    setSelectedTheme(resolvedTheme);
  };

  const handleApplyChanges = async () => {
    setIsLoading(true);
    try {
      await updateUserTheme(selectedTheme);
    } catch (error) {
      console.error("Failed to update color theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base leading-[120%] -tracking-[0.3px] text-neutral-950 dark:text-white font-semibold">
          Color Theme
        </h2>
        <p className="text-sm leading-[130%] text-neutral-700 dark:text-neutral-300 -tracking-[0.2px]">
          Choose your color theme:
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-[528px] w-full">
        {colorOptions.map(({ icon, title, description }) => (
          <ThemeOption
            key={title}
            icon={icon}
            title={title}
            description={description}
            currentTheme={selectedTheme}
            onThemeChange={handleThemeChange}
          />
        ))}
      </div>

      <div className="flex items-center justify-end">
        <Button
          additionalStyles="w-auto px-3 py-4 rounded-lg"
          onClick={handleApplyChanges}
          disabled={isLoading}
        >
          {isLoading ? "Applying..." : "Apply Changes"}
        </Button>
      </div>
    </div>
  );
}
