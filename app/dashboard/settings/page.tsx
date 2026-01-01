"use client";

import { useSettings } from "../_contexts/SettingsContext";
import ChangePassword from "./_components/ChangePassword";
import Color from "./_components/Color";
import FontTheme from "./_components/Font";
import SettingsSidebar from "./_ui/SettingsSidebar";

export default function Page() {
  const { currentSettings, setCurrentSettings } = useSettings();
  const settingsSidebar = [
    {
      name: "Colors",
      icon: "Sun",
    },
    {
      name: "Theme",
      icon: "Type",
    },
    {
      name: "Change Password",
      icon: "LockKeyhole",
    },
  ];
  return (
    <div className="grid divide-x divide-neutral-200 dark:divide-neutral-800 min-h-[calc(100vh-81px)] grid-cols-[290px_1fr_290px] bg-white dark:bg-[#0E121B]">
      <div className="h-full overflow-auto scroll-hidden lg:py-5 px-6 md:px-10 lg:px-6">
        <div className="flex flex-col gap-4">
          <div className="grid divide-y divide-neutral-200 dark:divide-neutral-800 gap-2">
            <ul className="flex flex-col gap-2 pb-2">
              {settingsSidebar.map(({ name, icon }) => (
                <SettingsSidebar
                  key={name}
                  name={name}
                  icon={icon}
                  action={() => setCurrentSettings(name)}
                />
              ))}
            </ul>
            <SettingsSidebar name="Logout" icon="LogOut" />
          </div>
        </div>
      </div>
      <div className="p-6">
        {currentSettings === "Colors" && <Color />}
        {currentSettings === "Theme" && <FontTheme />}
        {currentSettings === "Change Password" && <ChangePassword />}
      </div>
    </div>
  );
}
