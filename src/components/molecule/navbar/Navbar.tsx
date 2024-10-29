"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "@mantine/core";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { FaBars } from "react-icons/fa";
import useNavigate from "@/hooks/useNavigation";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [opened, setOpened] = useState(false); // Modal state for mobile menu

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-300/60 dark:bg-gray-500/40 backdrop-blur-md"
          : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left section: Business name */}
        <div className="text-lg font-bold">
          <Link href="/">CodieBuddy</Link>
        </div>

        {/* Middle section: Glassmorphism container (Hidden on small screens) */}
        <div className="hidden md:flex space-x-4 bg-gray-700/20 dark:bg-gray-700/50 py-2 px-4 rounded-full backdrop-blur-md border border-gray-400/20 dark:border-gray-400/20 gap-4 ">
          <Link href="/about-us" className="hover:underline">
            About
          </Link>
          <Link href="/pricing" className="hover:underline">
            Pricing
          </Link>
          <Link href="/features" className="hover:underline">
            Features
          </Link>
        </div>

        {/* Right section: Get Started and Login buttons */}
        <div className="flex space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          <Button
            onClick={() => navigate("/get-started")}
            variant="outline"
            className=" hover:bg-blue-600/60 hover:text-white hidden md:block">
            Get Started
          </Button>
          <Button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 hidden md:block">
            Login
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            className="md:hidden px-2"
            onClick={() => setOpened(true)}>
            <FaBars size={20} />
          </Button>
        </div>
      </div>

      {/* Modal for Mobile Menu */}
      <Modal.Root
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        className="p-0"
        transitionProps={{ transition: "fade", duration: 200 }}>
        <Modal.Overlay className="bg-gray-400/20 dark:bg-gray-800/50 backdrop-blur-sm " />
        <Modal.Content className="bg-gray-400/20 dark:bg-gray-800/60 backdrop-blur-lg">
          <Modal.Header className="flex flex-col items-center gap-4 p-4  bg-gray-800/40 dark:bg-gray-400/70">
            <Modal.CloseButton className="text-white" />
          </Modal.Header>
          <Modal.Body className="flex flex-col items-center gap-4 p-4  bg-gray-800/40 dark:bg-gray-400/70 backdrop-blur-lg">
            <Link
              href="/about-us"
              className="hover:underline"
              onClick={() => setOpened(false)}>
              About
            </Link>
            <Link
              href="/pricing"
              className="hover:underline"
              onClick={() => setOpened(false)}>
              Pricing
            </Link>
            <Link
              href="/features"
              className="hover:underline"
              onClick={() => setOpened(false)}>
              Features
            </Link>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </nav>
  );
};

export default Navbar;
