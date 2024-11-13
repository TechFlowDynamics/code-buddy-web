"use client";

import MobileMenu from "./MobileMenu";
import NavbarLink from "./NavbarLink";
import { Button } from "@mantine/core";
import { FaBars } from "react-icons/fa";

import React, { useState } from "react";

import useNavigate from "@/hooks/useNavigation";
import useScroll from "@/hooks/useScroll";

import ThemeToggle from "@/components/ThemeToggle";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const scrolled = useScroll();
  const [opened, setOpened] = useState(false);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-blue-300/20 shadow-md backdrop-blur-sm dark:bg-gray-500/40"
          : "bg-transparent"
      }`}>
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div>
          <NavbarLink
            href="/"
            label="CodieBuddy"
            className="!text-4xl !font-bold"
          />
        </div>

        <div className="hidden gap-4 space-x-4 rounded-full border border-gray-400/20 bg-gray-700/20 px-4 py-2 backdrop-blur-md md:flex dark:border-gray-400/20 dark:bg-gray-700/50">
          <NavbarLink href="/" label="Home" />
          <NavbarLink href="/about-us" label="About" />
          <NavbarLink href="/pricing" label="Pricing" />
          <NavbarLink href="/features" label="Features" />
          <NavbarLink href="/lobby" label="Lobby" highlight />
        </div>

        <div className="flex space-x-4">
          <ThemeToggle />
          <Button
            onClick={() => navigate("/get-started")}
            variant="outline"
            className="hidden hover:bg-blue-600/60 hover:text-white md:block">
            Get Started
          </Button>
          <Button
            onClick={() => navigate("/login")}
            className="hidden bg-blue-500 hover:bg-blue-600 md:block">
            Login
          </Button>
          <Button
            variant="outline"
            className="px-2 md:hidden"
            onClick={() => setOpened(true)}>
            <FaBars size={20} />
          </Button>
        </div>
      </div>

      <MobileMenu opened={opened} onClose={() => setOpened(false)} />
    </nav>
  );
};

export default Navbar;
