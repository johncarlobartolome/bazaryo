"use client";

import Header from "@/components/shared/header";
import NavBar from "@/components/shared/navbar";

export default function AccountPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <NavBar />
      {children}
    </div>
  );
}
