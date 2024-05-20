import Profile, { ProfileProps } from "@/components/profile";
import { CircleStackIcon } from "@heroicons/react/24/solid";
import React from "react";

interface CardProps {
  avatar?: string;
  dateStart: Date;
  dateEnd: Date;
  userType: string;
}

const Card = ({
  avatar,
  username,
  userType,
  type,
  dateStart,
  dateEnd,
}: CardProps & ProfileProps) => {
  return (
    <div className="px-5 flex flex-col gap-4 bg-neutral-800">
      <Profile username={username} type={userType} avatar={avatar} border />
      <div className="flex flex-col">
        <span className="text-lg">
          {dateStart.toLocaleDateString()}-{dateEnd.toLocaleDateString()}
        </span>
        <span className="text-sm text-neutral-500">{type}</span>
      </div>
      <div className="flex justify-end text-lg gap-2">
        <button className="p-3 text-neutral-500">반려</button>
        <button className="p-3">승인</button>
      </div>
    </div>
  );
};

export default function Incoming() {
  return (
    <>
      <div className="pt-5 border-b bg-neutral-800 h-[11vh]">
        <div className="flex justify-between items-center px-5">
          <div className="flex flex-col">
            <span className="text-2xl mb-2">Incoming Requests</span>
            <span className="text-xs">17 FREE DAYS LEFT</span>
          </div>
        </div>
      </div>
      <div className="relative h-[81vh]">
        <div className="flex flex-col h-full overflow-y-scroll gap-5 p-2">
          <Card
            username="Timothy Elliot"
            userType="진료과장"
            type="Vacation"
            dateStart={new Date(2024, 5, 10)}
            dateEnd={new Date(2024, 5, 13)}
            avatar="1"
          />
          <Card
            username="Timothy Elliot"
            userType="진료과장"
            type="Vacation"
            dateStart={new Date(2024, 5, 10)}
            dateEnd={new Date(2024, 5, 13)}
            avatar="1"
          />
        </div>
      </div>
    </>
  );
}
