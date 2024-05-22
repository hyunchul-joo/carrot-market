"use client";

import { vacationAddClicked } from "@/app/atom";
import Footer from "@/components/footer";
import React from "react";
import { useRecoilState } from "recoil";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  const [vacationClicked, setVacationClicked] =
    useRecoilState(vacationAddClicked);

  return (
    <div>
      <div className={`relative h-[92vh] ${vacationClicked ? "blur-sm" : ""}`}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
