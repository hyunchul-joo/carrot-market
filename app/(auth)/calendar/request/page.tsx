"use client";

import { CalendarComponent } from "@/components/calendar-component";
import moment from "moment";
import React, { useState } from "react";

export default function RequestPage() {
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
        </div>
        <CalendarComponent year={year} month={month} />
      </div>
      <div className="relative h-[48%]">
        <div className="flex flex-col h-full overflow-y-scroll p-5">
          <form className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <span className="text-sm">Request Type:</span>
              <select name="" id="">
                <option value="Vacation">Vacation</option>
                <option value="Off">Off</option>
                <option value="Etc.">Etc.</option>
              </select>
            </div>
            <button>신청하기</button>
          </form>
        </div>
      </div>
    </>
  );
}
