"use client";
import { vacationAddClicked } from "@/app/atom";
import {
  BriefcaseIcon,
  DocumentCheckIcon,
  DocumentPlusIcon,
  ListBulletIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";

export default function Footer() {
  const [vacationClicked, setVacationClicked] =
    useRecoilState(vacationAddClicked);
  return (
    <>
      {vacationClicked ? (
        <div className="fixed bottom-0 left-0 right-0 flex flex-col bg-neutral-700">
          <div className="flex items-center gap-5 p-4">
            <SunIcon className="size-8" />
            <span>Vacations</span>
          </div>
          <div className="flex items-center gap-5 p-4">
            <SunIcon className="size-8" />
            <span>Vacations</span>
          </div>
          <div className="flex items-center gap-5 p-4">
            <SunIcon className="size-8" />
            <span>Vacations</span>
          </div>
        </div>
      ) : (
        <div className="fixed h-[8vh] bottom-0 left-0 right-0 flex justify-evenly items-center border-t py-3 *:size-10 bg-black">
          <BriefcaseIcon />
          <DocumentCheckIcon />
          <DocumentPlusIcon onClick={() => setVacationClicked(true)} />
          <ListBulletIcon />
          <UserIcon />
        </div>
      )}
    </>
  );
}
