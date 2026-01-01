import { useState } from "react";
import Button from "@/app/_ui/Button";
import ThemeOption from "../_ui/ThemeOption";
import { CaseSensitive } from "lucide-react";
import { updateFontTheme } from "@/app/_libs/action";

interface FontThemeProps {
  currentFont?: string;
}

export default function FontTheme({
  currentFont = "sans-serif",
}: FontThemeProps) {
  const [selectedFont, setSelectedFont] = useState(currentFont);
  const [isLoading, setIsLoading] = useState(false);

  const fontOptions = [
    {
      icon: CaseSensitive,
      title: "Sans-serif",
      description: "Clean and modern, easy to read",
    },
    {
      icon: CaseSensitive,
      title: "Serif",
      description: "Classic and elegant for a timeless feel.",
    },
    {
      icon: CaseSensitive,
      title: "Monospace",
      description: "Code-like, great for a technical vibe.",
    },
  ];

  const handleFontChange = (fontTitle: string) => {
    // Format the title to match the font value (e.g., "Sans-serif" -> "sans-serif")
    const formattedFont = fontTitle.toLowerCase();
    setSelectedFont(formattedFont);
  };

  const handleApplyChanges = async () => {
    setIsLoading(true);
    try {
      await updateFontTheme(selectedFont);
    } catch (error) {
      console.error("Failed to update font theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <h2 className="text-base leading-[120%] -tracking-[0.3px] text-neutral-950 dark:text-white font-semibold">
          Font Theme
        </h2>
        <p className="text-sm leading-[130%] text-neutral-700 dark:text-neutral-300 -tracking-[0.2px]">
          Choose your font theme:
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-[528px] w-full">
        {fontOptions.map(({ icon, title, description }) => (
          <ThemeOption
            key={title}
            icon={icon}
            title={title}
            description={description}
            currentTheme={selectedFont}
            onThemeChange={handleFontChange}
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
