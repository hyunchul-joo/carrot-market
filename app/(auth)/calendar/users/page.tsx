import Profile from "@/components/profile";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function UsersPage() {
  return (
    <>
      <div className="pt-5 border-b bg-neutral-800 h-[11vh]">
        <div className="flex justify-between items-center px-5">
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
              <span className="text-2xl mb-2">Users</span>
              <MagnifyingGlassIcon className="size-6" />
            </div>

            <span className="text-xs">78 COLLAGUES</span>
          </div>
        </div>
      </div>
      <div className="relative h-[81vh]">
        <div className="flex flex-col h-full overflow-y-scroll gap-5 p-2">
          <Profile avatar="1" username="Timothy Elliot" type="iOS Developer" />
          <Profile avatar="1" username="Timothy Elliot" type="iOS Developer" />
          <Profile avatar="1" username="Timothy Elliot" type="iOS Developer" />
          <Profile avatar="1" username="Timothy Elliot" type="iOS Developer" />
        </div>
      </div>
    </>
  );
}
