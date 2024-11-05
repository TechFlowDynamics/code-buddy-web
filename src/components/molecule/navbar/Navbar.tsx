"use client";
import React, { useState } from "react";
import { Button } from "@mantine/core";
import ThemeToggle from "@/components/ThemeToggle";
import { FaBars } from "react-icons/fa";
import useNavigate from "@/hooks/useNavigation";
import useScroll from "@/hooks/useScroll";
import MobileMenu from "./MobileMenu";
import NavbarLink from "./NavbarLink";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const scrolled = useScroll();
  const [opened, setOpened] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-blue-300/20 dark:bg-gray-500/40 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div >
          <NavbarLink href="/" label="CodieBuddy" className="!text-4xl !font-bold"/>
        </div>

        <div className="hidden md:flex space-x-4 bg-gray-700/20 dark:bg-gray-700/50 py-2 px-4 rounded-full backdrop-blur-md border border-gray-400/20 dark:border-gray-400/20 gap-4">
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
            className="hover:bg-blue-600/60 hover:text-white hidden md:block">
            Get Started
          </Button>
          <Button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 hidden md:block">
            Login
          </Button>
          <Button
            variant="outline"
            className="md:hidden px-2"
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
