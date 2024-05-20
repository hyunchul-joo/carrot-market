import Footer from "@/components/footer";
import React from "react";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[92vh]">
      {children}
      <Footer />
    </div>
  );
}
