import { EyeIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  return (
    <div className="px-5 h-[92vh] flex flex-col justify-center">
      <div className="flex flex-col items-center bg-neutral-800 pb-10 mb-4">
        <div className="size-16 bg-neutral-300 rounded-full -translate-y-1/2" />
        <span className="text-2xl -translate-y-1/2">Joseph Cobb</span>
        <span className="text-sm text-neutral-500 -translate-y-1/2 mb-4">
          Project Manager
        </span>
        <div className="flex justify-evenly w-full">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <EyeIcon className="size-4" />
              <span className="text-xs">Taken</span>
            </div>
            <span className="text-2xl">7</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <EyeIcon className="size-4" />
              <span className="text-xs">Available</span>
            </div>
            <span className="text-2xl">17</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <EyeIcon className="size-4" />
              <span className="text-xs">Total</span>
            </div>
            <span className="text-2xl">22</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-5">
        <span>Statistics</span>
        <span>&gt;</span>
      </div>
      <div className="flex justify-between p-5">
        <span>Profile Info</span>
        <span>&gt;</span>
      </div>
      <div className="flex justify-between p-5">
        <span>Signature</span>
        <span>&gt;</span>
      </div>
      <div className="flex justify-between p-5">
        <span>Log Out</span>
      </div>
    </div>
  );
}
