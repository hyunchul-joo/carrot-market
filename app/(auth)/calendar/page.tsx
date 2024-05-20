"use client";

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

function get3Months(year: number, month: number) {
  const currDates: Date[] = [];
  const currLastDate = new Date(year, month + 1, 0).getDate();
  for (let index = 0; index < currLastDate; index++) {
    currDates.push(new Date(year, month, index + 1));
  }

  const prevDates: Date[] = [];
  const prevLastDate = new Date(year, month, 0).getDate();
  for (let index = 0; index < prevLastDate; index++) {
    prevDates.push(new Date(year, month - 1, index + 1));
  }

  const nextDates: Date[] = [];
  const nextLastDate = new Date(year, month + 2, 0).getDate();
  for (let index = 0; index < nextLastDate; index++) {
    nextDates.push(new Date(year, month + 1, index + 1));
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
        <div
          className={`${
            index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : ""
          }`}
          key={index}
        >
          {ele}
        </div>
      ))}
      {prevDates.map((ele, index) => (
        <div
          className={`opacity-50 ${
            ele.getDay() === 0
              ? "text-red-500"
              : ele.getDay() === 6
              ? "text-blue-500"
              : ""
          }`}
          key={`prev${index}`}
        >
          {ele.getDate()}
        </div>
      ))}
      {currDates.map((ele, index) => (
        <div
          className={`${
            ele.getDay() === 0
              ? "text-red-500"
              : ele.getDay() === 6
              ? "text-blue-500"
              : ""
          }`}
          key={`curr${index}`}
        >
          {ele.getDate()}
        </div>
      ))}
      {nextDates.map((ele, index) => (
        <div
          className={`opacity-50 ${
            ele.getDay() === 0
              ? "text-red-500"
              : ele.getDay() === 6
              ? "text-blue-500"
              : ""
          }`}
          key={`next${index}`}
        >
          {ele.getDate()}
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
