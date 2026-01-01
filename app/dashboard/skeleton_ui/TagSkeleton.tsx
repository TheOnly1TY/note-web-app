export default function TagSkeleton() {
  return (
    <ul className="grid gap-1 mt-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <li className="flex items-center gap-3 py-2.5 px-3" key={index}>
          <div className="w-5 h-5 bg-neutral-100 animate-pulse"></div>
          <div className="w-30 h-5 bg-neutral-100 animate-pulse"></div>
        </li>
      ))}
    </ul>
  );
}
