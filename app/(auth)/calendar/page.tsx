"use client";

import {
  BriefcaseIcon,
  DocumentCheckIcon,
  DocumentPlusIcon,
  ListBulletIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {} from "@heroicons/react/24/solid";
import moment from "moment";
import React, { useState } from "react";

const SMOKE = "#AABCD0";
const INDIGO = "#8D7AEE";
const TURQUOISE = "#0CC9C3";
const BLACK = "#383F51";

const vacationList = [
  { user: "You", type: "Vacaton" },
  { user: "Shawn Harper", type: "Vacaton" },
  { user: "Christina Carter", type: "Work from Home" },
  { user: "Vernon Estrada", type: "Sick Leave" },
  { user: "You", type: "Vacaton" },
  { user: "Shawn Harper", type: "Vacaton" },
  { user: "Christina Carter", type: "Work from Home" },
  { user: "Vernon Estrada", type: "Sick Leave" },
  { user: "You", type: "Vacaton" },
  { user: "Shawn Harper", type: "Vacaton" },
  { user: "Christina Carter", type: "Work from Home" },
  { user: "Vernon Estrada", type: "Sick Leave" },
  { user: "You", type: "Vacaton" },
  { user: "Shawn Harper", type: "Vacaton" },
  { user: "Christina Carter", type: "Work from Home" },
  { user: "Vernon Estrada", type: "Sick Leave" },
  { user: "You", type: "Vacaton" },
  { user: "Shawn Harper", type: "Vacaton" },
  { user: "Christina Carter", type: "Work from Home" },
  { user: "Vernon Estrada", type: "Sick Leave" },
  { user: "You", type: "Vacaton" },
  { user: "Shawn Harper", type: "Vacaton" },
  { user: "Christina Carter", type: "Work from Home" },
  { user: "Vernon Estrada", type: "Sick Leave" },
];

function get3Months(year: number, month: number) {
  const currDates: number[] = [];
  const currLastDate = new Date(year, month + 1, 0).getDate();
  for (let index = 0; index < currLastDate; index++) {
    currDates.push(index + 1);
  }

  const prevDates: number[] = [];
  const prevLastDate = new Date(year, month, 0).getDate();
  for (let index = 0; index < prevLastDate; index++) {
    prevDates.push(index + 1);
  }

  const nextDates: number[] = [];
  const nextLastDate = new Date(year, month + 2, 0).getDate();
  for (let index = 0; index < nextLastDate; index++) {
    nextDates.push(index + 1);
  }

  return [prevDates, currDates, nextDates];
}

interface CalendarProps {
  year: number;
  month: number;
}

const CalendarComponent = ({ year, month }: CalendarProps) => {
  const dayHeader = ["일", "월", "화", "수", "목", "금", "토"];
  let [prevDates, currDates, nextDates] = get3Months(year, month);
  const startDay = new Date(year, month, 1).getDay();
  prevDates = prevDates.slice(-startDay);
  if (startDay === 0) {
    prevDates = [];
  }
  const nextIndex = 35 - [...prevDates, ...currDates].length;
  nextDates = nextDates.slice(0, nextIndex);
  if (nextIndex < 0) {
    nextDates = [];
  }

  return (
    <div className="grid grid-cols-7 grid-rows-6 justify-items-center items-center h-80">
      {dayHeader.map((ele, index) => (
        <div key={index}>{ele}</div>
      ))}
      {prevDates.map((ele, index) => (
        <div className="opacity-50" key={`prev${index}`}>
          {ele}
        </div>
      ))}
      {currDates.map((ele, index) => (
        <div key={`curr${index}`}>{ele}</div>
      ))}
      {nextDates.map((ele, index) => (
        <div className="opacity-50" key={`next${index}`}>
          {ele}
        </div>
      ))}
    </div>
  );
};

export default function MyCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const yearMonth = moment(today).format("YYYY-MM");

  const onMonthChange = (e: React.FormEvent<HTMLInputElement>) => {
    const [year, month] = e.currentTarget.value.split("-");
    setYear(Number(year));
    setMonth(Number(month));
  };
  return (
    <div className="relative h-screen">
      <div className="h-[48%] pt-5 bg-neutral-800">
        <div className="flex justify-between items-center px-5">
          <div className="flex flex-col">
            <span className="text-2xl mb-2">
              <input
                type="month"
                className="bg-neutral-800 "
                id="month"
                onChange={onMonthChange}
                defaultValue={yearMonth}
              />
            </span>
            <span className="text-xs pl-3">17 FREE DAYS LEFT</span>
          </div>
          <div>
            <UserCircleIcon className="size-8" />
          </div>
        </div>
        <CalendarComponent year={year} month={month} />
      </div>
      <div className="relative h-[44%]">
        <div className="flex flex-col h-full overflow-y-scroll">
          {vacationList.map((vacation, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 px-5"
            >
              <div className="flex flex-col">
                <span>{vacation.user}</span>
                <span className="text-xs">{vacation.type}</span>
              </div>
              <div className="flex gap-x-2">
                <div className="size-5 bg-neutral-300 rounded-md" />
                <div className="size-5 bg-neutral-500 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed h-[8%] bottom-0 left-0 right-0 flex justify-evenly items-center border-t py-3 *:size-10 bg-black">
        <BriefcaseIcon />
        <DocumentCheckIcon />
        <DocumentPlusIcon />
        <ListBulletIcon />
        <UserIcon />
      </div>
    </div>
  );
}
