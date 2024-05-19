"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { VacationsProps, getVacations } from "./actions";
import Modal from "@/components/modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState, requestDate } from "@/app/atom";

interface CalendarProps {
  year: number;
  month: number;
  today: Date;
  vacations: VacationsProps;
}

interface DateProps {
  date: Date;
  isToday: boolean;
  isHoliday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  vacations: VacationsProps;
}

function MyDate({
  date,
  isToday,
  isHoliday,
  isSaturday,
  isSunday,
  vacations,
}: DateProps) {
  const setModalOpen = useSetRecoilState(modalState);
  const setReqDate = useSetRecoilState(requestDate);
  const onClick = () => {
    setReqDate(date);
    setModalOpen(true);
  };
  const backgroundColor = isToday ? "bg-purple-500" : "";
  const color = isSaturday
    ? "text-blue-500"
    : isHoliday
    ? "text-red-500"
    : isSunday
    ? "text-red-500"
    : "";
  return (
    <div
      className="hover:bg-slate-500 transition pt-2 cursor-pointer"
      onClick={onClick}
    >
      <span className={`p-1 rounded-full ${backgroundColor} ${color}`}>
        {date.getDate()}
      </span>
      <div className="flex flex-col mt-2">
        {vacations.map((vacation) => (
          <span key={vacation.id}>{vacation.HanilUser.koreanName}</span>
        ))}
      </div>
    </div>
  );
}

function Calendar({ year, month, today, vacations }: CalendarProps) {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  return (
    <div className="grid grid-cols-7 grid-rows-5 h-[90vh]">
      {[...Array(firstDayOfWeek)].map((_, i) => (
        <div key={i + 30}></div>
      ))}
      {[...Array(lastDate)].map((_, i) => {
        const date = new Date(year, month, i + 1);
        const dateVacations = vacations.filter(
          (vacation) =>
            vacation.date.toLocaleDateString() === date.toLocaleDateString()
        );
        return (
          <MyDate
            key={i}
            date={date}
            isToday={date.toLocaleDateString() === today.toLocaleDateString()}
            isHoliday={false}
            isSaturday={date.getDay() === 6}
            isSunday={date.getDay() === 0}
            vacations={dateVacations}
          />
        );
      })}
    </div>
  );
}

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [vacations, setVacations] = useState<VacationsProps>([]);
  const today = new Date();
  const onLeftClick = () => {
    const prevDate = moment(date).subtract(1, "month").toDate();
    setDate(prevDate);
  };
  const onRightClick = () => {
    const nextDate = moment(date).add(1, "month").toDate();
    setDate(nextDate);
  };
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const onModalCloseClicked = () => {
    setModalOpen(false);
  };
  const [reqDate, setReqDate] = useRecoilState(requestDate);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getVacations();
      setVacations(result);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen overflow-hidden relative">
      <div className="flex flex-col pt-5">
        <div className="flex justify-evenly">
          <div onClick={onLeftClick} className="cursor-pointer">
            &larr;
          </div>
          <div className="text-center text-xl">{`${date.getFullYear()}.${
            date.getMonth() + 1
          }`}</div>
          <div onClick={onRightClick} className="cursor-pointer">
            &rarr;
          </div>
        </div>

        <div className="grid grid-cols-7 text-center mt-2">
          <span>일</span>
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span>토</span>
        </div>
      </div>
      <Calendar
        today={today}
        year={date.getFullYear()}
        month={date.getMonth()}
        vacations={vacations}
      />
      {modalOpen ? (
        <>
          <Modal date={reqDate} />
          <div
            className="absolute top-[10%] right-0 text-3xl p-5 cursor-pointer"
            onClick={onModalCloseClicked}
          >
            X
          </div>
        </>
      ) : null}
    </div>
  );
}
