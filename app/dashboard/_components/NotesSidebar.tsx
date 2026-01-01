

// import { useSearchParams } from "next/navigation";
// import { Suspense } from "react";
// import CreateNoteButton from "../_ui/CreateNoteButton";
// import EmptyNotes from "../_ui/EmptyNotes";
// import Loader from "../_ui/Loader";
// import TagTextNote from "../_ui/TagTextNote";
// import SidebarNotes, { AllNotesProps } from "../_ui/SidebarNotes";

export default function NotesSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  // const searchParams = useSearchParams();
  // const tag = searchParams?.get("tag") ?? undefined;

  // let notes;
  // if (tag) {
  //   notes = AllNotes.filter((note) => note.tags.includes(tag));
  // } else {
  //   notes = AllNotes;
  // }

  return (
    <div className="h-full overflow-auto scroll-hidden lg:py-5 px-6 md:px-10 lg:px-6">
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
