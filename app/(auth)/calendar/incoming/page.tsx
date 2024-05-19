import { CircleStackIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface CardProps {
  name: string;
  dateStart: Date;
  dateEnd: Date;
  type: 'Vacation' | 'Off' | 'Etc.';
}

const Card = () => {
  return (
    <div>
      <div>
        <CircleStackIcon className="size-8" />
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
        <div className="flex flex-col h-full overflow-y-scroll">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
