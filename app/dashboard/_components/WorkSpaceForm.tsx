"use client";

import { actionCreateNote } from "@/app/_libs/action";
import Button from "@/app/_ui/Button";
import { Clock, Tag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Inputs = {
  id: string;
  title: string;
  content: string;
  tags: string[];
};

export default function WorkSpaceForm({ noteToEdit = {} }) {
  const { id: editId, ...editValues } = noteToEdit;
  const isEditSession = Boolean(editId);
  const isEditing = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<Inputs>({
    defaultValues: isEditSession ? editValues : {},
  });

  const titleValue = watch("title");
  const hasTags = watch("tags");

  const hasTitle = Boolean(titleValue?.trim());
  // const hasTags = Boolean(tagValue);

  const isCreateDisabled = (!hasTitle && !hasTags) || isSubmitting;
  const isEditDisabled =
    (!isDirty && isEditSession) || !hasTitle || isSubmitting;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await actionCreateNote(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Wrap all editable fields in a fieldset to disable while submitting */}
      <fieldset
        disabled={isSubmitting}
        className={isSubmitting ? "pointer-events-none opacity-60" : ""}
      >
        {/* Hidden ID field */}
        <input type="hidden" {...register("id")} defaultValue={editId} />

        <header>
          {/* Title */}
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <h2
                contentEditable
                suppressContentEditableWarning
                data-placeholder="Enter title..."
                className="text-2xl font-bold outline-none text-neutral-950 dark:text-white
                           empty:before:content-[attr(data-placeholder)]
                           empty:before:text-neutral-950 empty:before:dark:text-white mb-4"
                onInput={(e) =>
                  field.onChange(e.currentTarget.textContent || "")
                }
                ref={(el) => {
                  if (el && el.textContent !== field.value) {
                    el.textContent = field.value;
                  }
                }}
              />
            )}
          />

          <div className="flex flex-col gap-4">
            {/* Tags */}
            <div className="flex items-center gap-12">
              <p className="flex items-center text-sm gap-2 leading-4 text-neutral-700 dark:text-neutral-300">
                <Tag className="w-4 h-4" /> Tags
              </p>
              <Controller
                name="tags"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="Add tags separated by commas (e.g. Work, Planning)"
                    className="block w-full px-3
                               text-sm leading-4 text-neutral-700 dark:text-white
                               empty:before:content-[attr(data-placeholder)]
                               empty:before:text-neutral-400 empty:before:dark:text-white"
                    onFocus={() => {
                      isEditing.current = true;
                    }}
                    onBlur={(e) => {
                      isEditing.current = false;
                      const text = e.currentTarget.textContent ?? "";
                      const tagsArray = text
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean);
                      field.onChange(tagsArray);
                    }}
                    onInput={(e) => {
                      if (isEditing.current) {
                        const text = e.currentTarget.textContent ?? "";
                        field.onChange(
                          text
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean)
                        );
                      }
                    }}
                    ref={(el) => {
                      if (!el) return;
                      if (!isEditing.current) {
                        const displayValue = field?.value?.join(", ");
                        if (el.textContent !== displayValue) {
                          el.textContent = displayValue;
                        }
                      }
                    }}
                  />
                )}
              />
            </div>

            {/* Last Edited */}
            <div className="flex items-center gap-12">
              <p className="flex items-center text-sm gap-2 leading-4 text-neutral-700 dark:text-neutral-300">
                <Clock className="w-4 h-4" /> Last Edited
              </p>
              <span className="text-sm leading-4 text-neutral-400 dark:text-white">
                {!Object.keys(noteToEdit).length
                  ? "Not yet saved"
                  : new Date(
                      "2025-12-26 14:27:12.429029+00"
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
              </span>
            </div>
          </div>
          <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 my-4" />
        </header>

        {/* Content */}
        <Controller
          name="content"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <main
              contentEditable
              suppressContentEditableWarning
              data-placeholder="Start typing your note here..."
              className="whitespace-pre-line text-sm text-neutral-900 dark:text-white
                         empty:before:content-[attr(data-placeholder)]
                         empty:before:text-neutral-700 empty:before:dark:text-white outline-none"
              onInput={(e) => field.onChange(e.currentTarget.textContent || "")}
              ref={(el) => {
                if (el && el.textContent !== field.value) {
                  el.textContent = field.value;
                }
              }}
            />
          )}
        />
      </fieldset>

      {/* Footer buttons */}
      <footer className="fixed bottom-5 w-full">
        <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 my-4" />
        <div className="flex gap-4">
          <Button disabled={isEditSession ? isEditDisabled : isCreateDisabled}>
            {!isEditSession
              ? isSubmitting
                ? "Creating..."
                : "Create Note"
              : isSubmitting
              ? "Saving..."
              : "Save Note"}
          </Button>
          <Button
            onClick={() => router.push(pathname)}
            type="button"
            variant="solid"
          >
            Cancel
          </Button>
        </div>
      </footer>
    </form>
  );
}
