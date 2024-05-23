"use client";

import { requestDatesAtom } from "@/app/atom";
import { CalendarComponent } from "@/components/calendar-component";
import moment from "moment";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { UploadVacations } from "./actions";
import Button from "@/components/button";

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
  const requestDates = useRecoilValue(requestDatesAtom);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const result = await UploadVacations(formdata);
    if (result) {
      alert("신청이 정상적으로 완료되었습니다.");
    } else {
      alert("신청이 완료되지 못했습니다.");
    }
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
          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-between h-full"
          >
            <div className="flex flex-col">
              <span className="text-sm">신청타입:</span>
              <select name="type" id="">
                <option value="Vacation">Vacation</option>
                <option value="Off">Off</option>
                <option value="Etc.">Etc.</option>
              </select>
              <input
                type="hidden"
                name="requestDate1"
                value={
                  requestDates[0]
                    ? moment(requestDates[0]).format("YYYY-MM-DD")
                    : ""
                }
              />
              <input
                type="hidden"
                name="requestDate2"
                value={
                  requestDates[1]
                    ? moment(requestDates[1]).format("YYYY-MM-DD")
                    : ""
                }
              />
            </div>
            <div className="flex justify-center">
              신청일: {requestDates[0]?.toLocaleDateString()}
              {requestDates[1] ? "-" : ""}
              {requestDates[1]?.toLocaleDateString()}
            </div>
            {/* <Button text="신청하기" /> */}
            <button>신청하기</button>
          </form>
        </div>
      </div>
    </>
  );
}
