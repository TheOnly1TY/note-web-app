export default function EmptyNotes({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-sm leading-[130%] -tracking-[0.2px] text-neutral-500 bg-neutral-100 border border-neutral-200 rounded-lg p-2">
      {children}
    </p>
  );
}
