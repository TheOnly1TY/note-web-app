export default function TagTextNote({ tag }: { tag: string | undefined }) {
  if (tag === "" || tag === undefined) return null;

  return (
    <p className="text-sm leading-[130%] -tracking-[0.2px] text-neutral-950">
      All notes with the &quot;{tag}&quot; tag are shown here.
    </p>
  );
}
