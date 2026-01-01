import Button from "@/app/_ui/Button";
import { CircleAlert } from "lucide-react";
// TODO: add hover and active states and make input component resuable
export default function ChangePassword() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-base leading-[120%] -tracking-[0.3px] text-neutral-950 font-semibold">
        Change Password
      </h2>
      <div className="flex flex-col gap-4 max-w-[528px]">
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Old Password</label>
          <input
            type="password"
            className="px-4 py-3 border border-neutral-200 outline-none rounded-lg "
            name="old-password"
            id="old-password"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="new-password "
            className="px-4 py-3 border border-neutral-200 outline-none rounded-lg"
            id="new-password"
          />
          <p className="flex items-center gap-1 text-sm text-neutral-600">
            <CircleAlert className="w-4 h-4" /> At least 8 characters
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Confirm New Password</label>
          <input
            type="password"
            className="px-4 py-3 border border-neutral-200 outline-none rounded-lg"
            name="confirm-new-password"
            id="confirm-new-password"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-end">
          <Button additionalStyles="w-auto px-3 py-4">Save Password</Button>
        </div>
      </div>
    </div>
  );
}
