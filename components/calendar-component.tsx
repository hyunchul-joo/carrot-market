import moment from "moment";
import React, { useEffect, useState } from "react";
import holidays from "@/lib/holidays.json";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import {
  allVacationsAtom,
  requestDatesAtom,
  selectedDateAtom,
} from "@/app/atom";
import { getVacations } from "@/app/(auth)/calendar/actions";

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

  let [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);
  let onDateClicked = (e: React.PointerEvent<HTMLDivElement>) => {
    setSelectedDate(moment(e.currentTarget.id).toDate());
  };
  const [requestDates, setRequestDates] = useRecoilState(requestDatesAtom);
  if (pathname === "/calendar/request") {
    onDateClicked = (e: React.PointerEvent<HTMLDivElement>) => {
      if (requestDates.length === 2) {
        setRequestDates([moment(e.currentTarget.id).toDate()]);
      } else if (requestDates.length === 1) {
        let newDate = moment(e.currentTarget.id).toDate();
        let oldDate = requestDates[0];
        if (newDate > oldDate) {
          setRequestDates([oldDate, newDate]);
        } else if (newDate < oldDate) {
          setRequestDates([newDate, oldDate]);
        }
      } else {
        setRequestDates([moment(e.currentTarget.id).toDate()]);
      }
    };
  }
  const [allVacations, setAllVacations] = useRecoilState(allVacationsAtom);
  useEffect(() => {
    const fetchData = async () => {
      const vacations = await getVacations();
      setAllVacations(vacations);
    };
    fetchData();
  }, [year, month]);

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
        let classAttrs = "";
        if (pathname !== "/calendar/request") {
          classAttrs += "rounded-md m-1 ";
        }
        if (
          selectedDate &&
          selectedDate.toDateString() === ele.date.toDateString()
        ) {
          classAttrs += "bg-neutral-500 ";
        }
        if (ele.type !== "curr") {
          classAttrs += "opacity-50 ";
        }
        if (ele.date.toDateString() === today.toDateString()) {
          classAttrs += "border ";
        }
        if (
          requestDates.length === 1 &&
          requestDates[0].toDateString() === ele.date.toDateString()
        ) {
          classAttrs += "bg-neutral-500";
        } else if (requestDates.length === 2) {
          if (ele.date >= requestDates[0] && ele.date <= requestDates[1]) {
            classAttrs += "bg-neutral-500";
          }
        }
        const vacationLength = allVacations.filter(
          (value) => value.date.toDateString() === ele.date.toDateString()
        ).length;
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
            } relative flex self-stretch justify-self-stretch justify-center items-center ${classAttrs}`}
            key={`prev${index}`}
            id={moment(ele.date).format("YYYY-MM-DD")}
          >
            {ele.date.getDate()}
            <div
              className="absolute bottom-1 flex gap-1 [&>*:nth-child(1)]:bg-blue-500
              [&>*:nth-child(2)]:bg-green-500 [&>*:nth-child(3)]:bg-yellow-500
              [&>*:nth-child(4)]:bg-purple-500"
            >
              {[...Array(vacationLength)].map((_, index) => (
                <div key={index} className="size-1 rounded-full" />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
