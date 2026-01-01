"use client";

import Button from "@/app/_ui/Button";
import { Archive, Trash2, RotateCcw } from "lucide-react";
import { useModal } from "../_contexts/ModalContext";
import { usePathname } from "next/navigation";

import { restoreNote } from "@/app/_libs/action";
import { useState } from "react";

export default function InfoPanel({ noteId }: { noteId: string | undefined }) {
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const { openModal } = useModal();
  const pathname = usePathname();
// TODO: ADD TOAST
  const handleRestoreNote = async (id: string) => {
    try {
      setIsRestoring(true);
      const note = await restoreNote(id);
    } finally {
      setIsRestoring(false);
    }
  };

  console.log(pathname);
  return (
    <div className="hidden lg:block h-full overflow-auto py-5 px-6">
      {noteId ? (
        <div className="flex flex-col gap-4">
          {pathname === "/dashboard" && (
            <Button
              variant="outline"
              onClick={() => openModal("archive-note", { noteId })}
            >
              <div className="flex items-center justify-start w-full gap-1.5">
                <Archive className="w-5 h-5" />
                Archive Note
              </div>
            </Button>
          )}
          {pathname === "/dashboard/archived" && (
            <Button
              disabled={isRestoring}
              onClick={() => handleRestoreNote(noteId)}
              variant="outline"
            >
              <div className="flex items-center justify-start w-full gap-1.5">
                <RotateCcw className="w-5 h-5" />
                {isRestoring ? "Restoring..." : "Restore Note"}
              </div>
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => openModal("delete-note", { noteId })}
          >
            <div className="flex items-center justify-start w-full gap-1.5">
              <Trash2 className="w-5 h-5" />
              Delete Note
            </div>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
