import Logo from "@/app/_ui/Logo";
import SidebarLinks from "../_ui/SidebarLinks";
import { Suspense } from "react";
import Tags from "../_ui/Tags";
import { getTags } from "@/app/_libs/services";
import TagSkeleton from "../skeleton_ui/TagSkeleton";

// TODO: Make sidebar responsive

export default async function Sidebar() {
  const sidebarLinks = [
    {
      name: "All Notes",
      icon: "House",
      href: "/dashboard",
    },
    {
      name: "Archived Notes",
      icon: "Archive",
      href: "/dashboard/archived",
    },
  ];

  const tagsData = await getTags();

  const uniqueTags = Array.from(new Set(tagsData.flatMap((item) => item.tags)));

  return (
    <aside className="my-3 mx-4">
      <div><Logo /></div>

      <div className="grid divide-y divide-neutral-200 dark:divide-neutral-800">
        <div className="flex flex-col gap-2 mt-4 py-2">
          {sidebarLinks.map(({ name, href, icon }) => (
            <SidebarLinks key={href} to={href} name={name} icon={icon} />
          ))}
        </div>

        <div className="mt-2">
          <h3 className="text-sm leading-[120%] -tracking-[0.2px] text-neutral-500 font-medium">
            Tags  
          </h3>

          <Suspense fallback={<TagSkeleton />}>
            <Tags tags={uniqueTags} />
          </Suspense>
        </div>
      </div>
    </aside>
  );
}
