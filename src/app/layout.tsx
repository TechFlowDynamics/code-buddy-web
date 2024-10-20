import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ThemeProvider } from "@/hooks/ThemeContext";
import Navbar from "../components/molecule/navbar/ClientNavbar";

export const metadata: Metadata = {
  title: "Coding with buddy",
  description: "Generated by coder's love buddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider>
          <MantineProvider>
            <Navbar />
            <main>{children}</main>
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
