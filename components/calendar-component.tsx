import moment from "moment";
import React, { useState } from "react";
import holidays from "@/lib/holidays.json";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

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

interface DateWithTypeProps {
  date: Date;
  type: "prev" | "curr" | "next";
}

export const CalendarComponent = ({ year, month }: CalendarProps) => {
  const pathname = usePathname();

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
  const prevDatesWithType: DateWithTypeProps[] = prevDates.map((value) => ({
    date: value,
    type: "prev",
  }));
  const currDatesWithType: DateWithTypeProps[] = currDates.map((value) => ({
    date: value,
    type: "curr",
  }));
  const nextDatesWithType: DateWithTypeProps[] = nextDates.map((value) => ({
    date: value,
    type: "next",
  }));
  const allDatesWithType = [
    ...prevDatesWithType,
    ...currDatesWithType,
    ...nextDatesWithType,
  ];
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const onDateClicked = (e: React.PointerEvent<HTMLDivElement>) => {
    setSelectedDate(moment(e.currentTarget.id).toDate());
  };

  return (
    <div className="grid grid-cols-7 grid-rows-6 justify-items-center items-center h-80 ">
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
      {allDatesWithType.map((ele, index) => {
        let border = "";
        if (
          selectedDate &&
          selectedDate.toDateString() === ele.date.toDateString()
        ) {
          border = "border";
        }
        let opacity = "";
        if (ele.type !== "curr") {
          opacity = "opacity-50";
        }
        let isToday = "";
        if (ele.date.toDateString() === today.toDateString()) {
          isToday = "bg-neutral-500";
        }
        return (
          <div
            onClick={onDateClicked}
            className={`${
              ele.date.getDay() === 0 ||
              holidays.find((p) => p === moment(ele.date).format("YYYY-MM-DD"))
                ? "text-red-500"
                : ele.date.getDay() === 6
                ? "text-blue-500"
                : ""
            } flex self-stretch justify-self-stretch m-1 justify-center items-center rounded-md ${border} ${opacity} ${isToday}`}
            key={`prev${index}`}
            id={moment(ele.date).format("YYYY-MM-DD")}
          >
            {ele.date.getDate()}
          </div>
        );
      })}
    </div>
  );
};
