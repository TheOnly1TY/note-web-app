import { getNoteById } from "@/app/_libs/services";
import InfoPanel from "../../_components/InfoPanel";
import WorkSpaceForm from "../../_components/WorkSpaceForm";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getNoteById(id);
  // FIXME: ADDING A SUSPENSE AND ALSO FOR WRITING
  return (
    <>
      <div className="h-full overflow-auto scroll-hidden p-6">
        <WorkSpaceForm detailedNote={data} />
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
      <InfoPanel noteId={id} />
    </>
  );
}
