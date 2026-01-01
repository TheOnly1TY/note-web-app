"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export type NoteItem = {
  id: string;
  title: string;
  tags: string[];
  lastEdited: string;
};

export type AllNotesProps = {
  AllNotes: NoteItem[];
  currentId: string | undefined;
};

export default function SidebarNotes({ currentId, AllNotes }: AllNotesProps) {
  const pathname = usePathname();
  const router = useRouter();
  const handleReadNote = (id: string) => {
    router.push(`${pathname}?mode=read&id=${id}`);
    router.refresh();
  };
  return (
    <ul className="grid divide-y divide-neutral-200 dark:divide-neutral-800">
      {AllNotes?.map(({ id, title, tags, lastEdited }) => (
        <li
          key={id}
          onClick={() => handleReadNote(id)}
          className={`flex flex-col gap-2 p-2 rounded-md transition-all duration-300 ease cursor-pointer ${
            currentId === id
              ? "bg-neutral-100 dark:bg-neutral-800"
              : "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
          }`}
        >
          <h2 className="text-base break-normal leading-[120%]  -leading-[0.3px] text-neutral-950 dark:text-white font-semibold">
            {title}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <li
                key={index}
                className="inline-block text-xs leading-[120%] -tracking-[0.2px] text-neutral-950 dark:text-white py-0.5 px-1.5 rounded-sm bg-neutral-200 dark:bg-neutral-700 border border-[#D4E2FF] dark:border-neutral-700"
              >
                {tag}
              </li>
            ))}
          </ul>
          <p className="text-xs leading-4 text-neutral-700 dark:text-neutral-200">
            {new Date(lastEdited).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </li>
      ))}
    </ul>
  );
}
