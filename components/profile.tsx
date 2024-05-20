import { UserCircleIcon } from "@heroicons/react/24/solid";

export interface ProfileProps {
  avatar?: string;
  username: string;
  type: string;
  border?: boolean;
}
export default function Profile({
  avatar,
  username,
  type,
  border = false,
}: ProfileProps) {
  return (
    <div
      className={`flex justify-between items-center py-3 ${
        border ? "border-b border-neutral-500" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        {avatar ? <UserCircleIcon className="size-8" /> : null}
        <div className="flex flex-col">
          <span>{username}</span>
          <span className="text-xs text-neutral-500">{type}</span>
        </div>
      </div>

      <div className="flex gap-x-2">
        <div className="size-5 bg-neutral-300 rounded-md" />
        <div className="size-5 bg-neutral-500 rounded-md" />
      </div>
    </div>
  );
}
