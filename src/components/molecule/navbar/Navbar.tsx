"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Scroll event listener to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300  ${
        scrolled ? "bg-gray-300/60 dark:bg-gray-500/40 backdrop-blur-md" : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left section: Business name */}
        <div className="  text-lg font-bold">
          <Link href="/">CodieBuddy</Link>
        </div>

        {/* Middle section: Glassmorphism container */}
        <div
          className="
        h-full  bg-clip-padding rounded-full backdrop-filter backdrop-blur-md bg-opacity-0 border dark:border-gray-400/20 border-gray-400/20
        flex space-x-4 bg-gray-700/20 dark:bg-gray-700/50 py-2 px-4 gap-4 firefox:bg-opacity-70">
          <Link href="/about" className="  hover:underline">
            About
          </Link>
          <Link href="/pricing" className="  hover:underline">
            Pricing
          </Link>
          <Link href="/features" className="  hover:underline">
            Features
          </Link>
        </div>

        {/* Right section: Get Started and Login buttons */}
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="  border-white hover:bg-white/10">
            Get Started
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600  ">Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
