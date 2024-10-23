import Navbar from "@/components/molecule/navbar/Navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Codie buddy | About Us",
  description: "Generated by coder's love buddy",
};

export default function StaticPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {" "}
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
