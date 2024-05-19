import {
  BriefcaseIcon,
  DocumentCheckIcon,
  DocumentPlusIcon,
  ListBulletIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <div className="fixed h-[8vh] bottom-0 left-0 right-0 flex justify-evenly items-center border-t py-3 *:size-10 bg-black">
      <BriefcaseIcon />
      <DocumentCheckIcon />
      <DocumentPlusIcon />
      <ListBulletIcon />
      <UserIcon />
    </div>
  );
}
