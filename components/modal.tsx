import { modalState } from "@/app/atom";
import moment from "moment";
import React from "react";
import { useRecoilState } from "recoil";

interface ModalProps {
  date: Date;
}

export default function Modal({ date }: ModalProps) {
  const vacationDate = moment(date).format("YYYY-MM-DD");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div className="absolute top-[10%] left-0 bg-slate-500 opacity-95 flex flex-col justify-center items-center h-4/5 w-full">
      <div>휴가 신청</div>
      <form action="" onSubmit={onSubmit}>
        <input
          name="date"
          type="date"
          value={vacationDate}
          readOnly
          className="text-black bg-lime-400"
        />
        <button className="p-2 bg-orange-200">신청하기</button>
      </form>
    </div>
  );
}

// id        Int      @id @default(autoincrement())
// date      DateTime
// createdAt DateTime @default(now())
// approved  Boolean  @default(false)

// HanilUser   HanilUser @relation(fields: [hanilUserId], references: [id])
// hanilUserId Int
