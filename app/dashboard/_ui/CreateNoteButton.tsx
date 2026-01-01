"use client";

import Button from "@/app/_ui/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";



export default function CreateNoteButton() {
  const router = useRouter();
  const handleCreate = () => {
    router.push("/dashboard?mode=create");
    router.refresh();
  };
  return (
    <Button
      onClick={handleCreate}
      additionalStyles="fixed lg:static w-[48px] h-[48px] md:w-[64px] md:h-[64px] lg:w-auto lg:h-auto bottom-20 md:bottom-25 right-[1.5rem] md:right-[2.5rem] justify-center lg:w-full rounded-full lg:rounded-lg shadow-[0px_7px_11px_rgba(202,207,216,0.7)] lg:shadow-none py-3 px-4"
    >
      <Plus />
      <span className="hidden lg:block">Create New Note</span>
    </Button>
  );
}
