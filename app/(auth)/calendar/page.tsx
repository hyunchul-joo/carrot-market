"use client";

import { CalendarComponent } from "@/components/calendar-component";
import Profile, { ProfileProps } from "@/components/profile";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import {} from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";

const SMOKE = "#AABCD0";
const INDIGO = "#8D7AEE";
const TURQUOISE = "#0CC9C3";
const BLACK = "#383F51";

const vacationList: ProfileProps[] = [
  { username: "You", type: "Vacation" },
  { username: "Shawn Harper", type: "Vacation" },
  { username: "Christina Carter", type: "Off" },
  { username: "Vernon Estrada", type: "Etc." },
  { username: "You", type: "Vacation" },
  { username: "Shawn Harper", type: "Vacation" },
  { username: "Christina Carter", type: "Off" },
  { username: "Vernon Estrada", type: "Etc." },
  { username: "You", type: "Vacation" },
  { username: "Shawn Harper", type: "Vacation" },
  { username: "Christina Carter", type: "Off" },
  { username: "Vernon Estrada", type: "Etc." },
  { username: "You", type: "Vacation" },
  { username: "Shawn Harper", type: "Vacation" },
  { username: "Christina Carter", type: "Off" },
  { username: "Vernon Estrada", type: "Etc." },
  { username: "You", type: "Vacation" },
  { username: "Shawn Harper", type: "Vacation" },
  { username: "Christina Carter", type: "Off" },
  { username: "Vernon Estrada", type: "Etc." },
  { username: "You", type: "Vacation" },
  { username: "Shawn Harper", type: "Vacation" },
  { username: "Christina Carter", type: "Off" },
  { username: "Vernon Estrada", type: "Etc." },
];

export default function MyCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const yearMonth = moment(today).format("YYYY-MM");

  const onMonthChange = (e: React.FormEvent<HTMLInputElement>) => {
    const [year, month] = e.currentTarget.value.split("-");
    setYear(Number(year));
    setMonth(Number(month) - 1);
  };
  return (
    <>
      <div className="h-[52%] pt-5 bg-neutral-800">
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
          <Link href="">
            <UserCircleIcon className="size-8" />
          </Link>
        </div>
        <CalendarComponent year={year} month={month} />
      </div>
      <div className="relative h-[48%]">
        <div className="flex flex-col h-full overflow-y-scroll px-5">
          {vacationList.map((vacation, index) => (
            <Profile
              key={index}
              username={vacation.username}
              type={vacation.type}
            />
          ))}
        </div>
      </div>
    </>
  );
}
