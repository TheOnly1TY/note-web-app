import { Suspense } from "react";
import { getAllNotes, getNoteById } from "../_libs/services";
import NotesSidebar from "./_components/NotesSidebar";
import TagTextNote from "./_ui/TagTextNote";
import CreateNoteButton from "./_ui/CreateNoteButton";
import SidebarNotes from "./_ui/SidebarNotes";
import EmptyNotes from "./_ui/EmptyNotes";
import WorkSpaceForm from "./_components/WorkSpaceForm";
import InfoPanel from "./_components/InfoPanel";

type PageProps = {
  searchParams: {
    tag?: string;
    mode?: string;
    id?: string;
  };
};

export const dynamic = "force-dynamic";

export default async function page({ searchParams }: PageProps) {
  let detailedNotes;
  let notes;

  const { tag, mode, id } = await searchParams;

  const AllNotes = await getAllNotes();
  if (id && mode === "read") {
    detailedNotes = await getNoteById(id);
  }

  if (tag) {
    notes = AllNotes.filter((note) => note.tags.includes(tag));
  } else {
    notes = AllNotes;
  }

  return (
    <div className="grid divide-x divide-neutral-200 dark:divide-neutral-800 lg:h-[calc(100vh-81px)] lg:grid-cols-[290px_1fr] dark:bg-[#0E121B] bg-white ">
      <NotesSidebar>
        <CreateNoteButton />

        <TagTextNote tag={tag} />

        {notes && notes.length > 0 ? (
          <Suspense>
            <SidebarNotes currentId={id} AllNotes={notes} />
          </Suspense>
        ) : (
          <EmptyNotes>
            Your notes space is empty! Maybe it&apos;s your first time here,
            maybe your notes are safely tucked away in archives, or maybe that
            tag has no matches. Either way, let&apos;s add something new!
            {"\n\n"}
            No notes match your search. Try a different keyword or create a new
            note.
          </EmptyNotes>
        )}
      </NotesSidebar>
      <div className="h-full overflow-auto scroll-hidden">
        <Suspense fallback={<p>Loading...</p>}>
          {mode || id ? (
            <div className="grid divide-x divide-neutral-200 dark:divide-neutral-800 lg:h-[calc(100vh-81px)] lg:grid-cols-[1fr_290px]">
              <div className="h-full overflow-auto scroll-hidden p-6">
                <WorkSpaceForm key={id} noteToEdit={detailedNotes} />
              </div>
              <InfoPanel noteId={id} />
            </div>
          ) : null}
        </Suspense>
      </div>
    </div>
  );
}
