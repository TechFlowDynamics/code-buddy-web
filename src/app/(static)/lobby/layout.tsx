import React from "react";

import { Metadata } from "next";

import Navbar from "@/components/molecule/navbar/Navbar";

export const metadata: Metadata = {
  title: "Codie buddy | Lobby",
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
