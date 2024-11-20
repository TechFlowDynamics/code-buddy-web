"use client";

import AccountDropdown from "./AccountDropdown";
import MobileMenu from "./MobileMenu";
import NavbarLink from "./NavbarLink";
import { Button } from "@mantine/core";
import { FaBars } from "react-icons/fa";
import "react-icons/fa";

import React, { useState } from "react";

import { useAuth } from "@/hooks/AuthContext";
import useNavigate from "@/hooks/useNavigation";
import useScroll from "@/hooks/useScroll";

import ThemeToggle from "@/components/ThemeToggle";
import AccountButton from "@/components/atoms/buttons/AccountButton";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
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
            className="text-2xl !font-bold "
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
          {isLoggedIn ? (
            <AccountDropdown onLogout={logout} />
          ) : (
            <>
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
            </>
          )}
          <span className="block px-2 md:hidden">
            {isLoggedIn ? (
              <AccountButton onClick={() => setOpened(true)} />
            ) : (
              <Button variant="outline" onClick={() => setOpened(true)}>
                <FaBars size={20} />
              </Button>
            )}
          </span>
        </div>
      </div>

      <MobileMenu
        opened={opened}
        onClose={() => setOpened(false)}
        onLogout={logout}
        isLoggedIn={isLoggedIn}
      />
    </nav>
  );
};

export default Navbar;
