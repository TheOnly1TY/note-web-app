import { actionDeleteNote } from "@/app/_libs/action";
import Button from "@/app/_ui/Button";
import { Trash2 } from "lucide-react";

export default function DeleteNoteButton() {
  return (
    <form action={actionDeleteNote.bind(null, "2")}>
      <Button additionalStyles="w-full rounded-lg" variant="outline">
        <Trash2 className="w-5 h-5" /> Delete Note
      </Button>
    </form>
  );
}
