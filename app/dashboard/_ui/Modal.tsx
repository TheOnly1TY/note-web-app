"use client";

import { useEffect } from "react";
import { useModal } from "../_contexts/ModalContext";
import Button from "@/app/_ui/Button";
import { updateArhivedNote } from "@/app/_libs/action";
import { Archive, Trash2 } from "lucide-react";
import { deleteNote } from "@/app/_libs/notes.server";

/* ---------------- MODAL CONTENT MAP ---------------- */

function useModalContent() {
  const { modal, closeModal } = useModal();

  switch (modal.type) {
    case "delete-note":
      return {
        icon: <Trash2 className="w-[18px] h-[18px]" />,
        title: "Delete Note",
        description:
          "Are you sure you want to permanently delete this note? This action cannot be undone.",
        confirmText: "Delete Note",
        onConfirm: () => {},
        action: (
          <Button
            onClick={() => deleteNote(modal.payload?.noteId)}
            variant="destructive"
          >
            Delete Note
          </Button>
        ),
      };

    case "archive-note":
      return {
        icon: <Archive className="w-[18px] h-[18px]" />,
        title: "Archive Note",
        description:
          "Are you sure you want to archive this note? You can restore it later.",
        confirmText: "Archive Note",
        onConfirm: () => {},
        action: (
          <form
            action={updateArhivedNote.bind(
              null,
              modal.payload?.noteId as string
            )}
          >
            <Button>Archive Note</Button>,
          </form>
        ),
      };

    default:
      return null;
  }
}

export default function Modal() {
  const { modal, closeModal } = useModal();
  const content = useModalContent();

  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modal.isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal]);

  if (!modal.isOpen || !content) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.currentTarget === e.target && closeModal()}
    >
      <div className="grid divide-y divide-neutral-200 w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="pt-6 px-6 pb-4">
          <div className="flex gap-3 items-start">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-100 shrink-0">
              {content.icon}
            </div>

            <div>
              <h2 className="text-base text-neutral-950 font-semibold">
                {content.title}
              </h2>
              <p className="text-sm text-neutral-700 mt-1">
                {content.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          {content.action}
        </div>
      </div>
    </div>
  );
}
