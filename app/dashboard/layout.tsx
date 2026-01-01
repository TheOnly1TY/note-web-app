import { Archive, House, Search, Settings, Tag } from "lucide-react";
import Logo from "../_ui/Logo";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { NotesProvider } from "./_contexts/NotesContext";
import { SettingsProvider } from "./_contexts/SettingsContext";
import Modal from "./_ui/Modal";
import { ModalProvider } from "./_contexts/ModalContext";
import { Noto_Sans, Source_Code_Pro, Inter } from "next/font/google";
import { getUserSettings } from "../_libs/services";

interface settingsProps {
  id: number;
  created_at: string;
  user_id: string;
  theme: string;
  font: string;
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source",
  subsets: ["latin"],
});

function getTheme(settings: settingsProps[]) {
  if (settings && settings.length > 0 && settings[0].theme) {
    return settings[0].theme;
  }
  return "light";
}

function getFontClass(font: string) {
  switch (font) {
    case "serif":
      return "font-serif";
    case "mono":
      return "font-mono";
    case "sans-serif":
    default:
      return "font-sans";
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getUserSettings();

  const theme = getTheme(settings);
  const font =
    settings && settings.length > 0 && settings[0].font
      ? settings[0].font
      : "sans-serif";
  const fontClass = getFontClass(font);

  return (
    <div
      className={`${inter.variable} ${notoSans.variable} ${sourceCodePro.variable} ${fontClass} ${theme}`}
    >
      <NotesProvider>
        <SettingsProvider>
          <ModalProvider>
            <div className="hidden lg:flex">
              <aside className="w-[272px] h-screen fixed left-0 top-0 border-r border-neutral-200 dark:border-neutral-800 dark:bg-[#0E121B] bg-white ">
                <Sidebar />
              </aside>
              <div className="ml-[272px] flex-1 min-h-screen flex flex-col">
                <Header />
                <main>{children}</main>
              </div>
            </div>
            <div className="relative lg:hidden">
              <div className="flex items-center w-full bg-neutral-100 h-[54px] md:h-[74px] px-6 md:px-10">
                <Logo />
              </div>
              <Header />
              <main>{children}</main>
              <div className="flex items-center justify-between fixed h-14 md:h-[74px] left-0 right-0 bottom-0 border-t border-neutral-200 z-10 px-6 md:px-10 shadow-[0px_-4px_6px_rgba(240,240,240,0.6)]">
                <div className="flex flex-col items-center gap-1 text-neutral-600">
                  <House className="w-6 h-6" />
                  <span className="hidden md:block lg:hidden text-xs leading-[120%] -tracking-[0.2px]">
                    Home
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-neutral-600">
                  <Search className="w-6 h-6" />
                  <span className="hidden md:block lg:hidden text-xs leading-[120%] -tracking-[0.2px]">
                    Search
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-neutral-600">
                  <Archive className="w-6 h-6" />
                  <span className="hidden md:block lg:hidden text-xs leading-[120%] -tracking-[0.2px]">
                    Archived
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-neutral-600">
                  <Tag className="w-6 h-6" />
                  <span className="hidden md:block lg:hidden text-xs leading-[120%] -tracking-[0.2px]">
                    Tags
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-neutral-600">
                  <Settings className="w-6 h-6" />
                  <span className="hidden md:block lg:hidden text-xs leading-[120%] -tracking-[0.2px]">
                    Settings
                  </span>
                </div>
              </div>
            </div>

            {/* MODAL */}
            <Modal />
          </ModalProvider>
        </SettingsProvider>
      </NotesProvider>
    </div>
  );
}

// TODO:
// FIX CREATING NOTE ISSUE 1
// ACTIVE FONT AND COLOR 1
// CHANGE PASSWORD 1
// LOGOUT 1
// SEARCH 1
// FIX FOOTER LINE 1
// FIX LOGO DARK MODE 1
// ALERT MESSAGES 1
// CONTENT FIX
// LOADING UI FOR NOTES 1
// LOADING FOR DELETE AND RESTORE NOTE 0.5
// ALIGMENT FOR TAG AND LAST EDITED 0.5
// FIX OPENED NOTE WHEN CHAGING TAGS 0.5