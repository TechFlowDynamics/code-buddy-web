import NavbarLink from "./NavbarLink";
import { Button, Divider, Modal } from "@mantine/core";

import React from "react";

import useNavigate from "@/hooks/useNavigation";

interface MobileMenuProps {
  opened: boolean;
  isLoggedIn?: boolean;
  onLogout: () => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  opened,
  isLoggedIn,
  onLogout,
  onClose,
}) => {
  const navigate = useNavigate();
  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      centered
      className="p-0"
      transitionProps={{ transition: "fade", duration: 200 }}>
      <Modal.Overlay className="backdrop-blur- bg-gray-400/20 dark:bg-gray-800/50" />
      <Modal.Content className="bg-gray-400/20 backdrop-blur-lg dark:bg-gray-800/50">
        <Modal.Header className="dark:bg-gray-600/76 flex flex-col items-center gap-4 bg-gray-800/65 p-4">
          <Modal.CloseButton className="text-white" />
        </Modal.Header>
        <Modal.Body className="flex flex-col items-center gap-4 bg-gray-800/70 p-4 backdrop-blur-lg dark:bg-gray-600/80">
          <NavbarLink href="/" label="Home" />
          <NavbarLink href="/about-us" label="About" />
          <NavbarLink href="/pricing" label="Pricing" />
          <NavbarLink href="/features" label="Features" />
          {isLoggedIn && <Divider className="w-full border-gray-800/70" />}
          {isLoggedIn && <NavbarLink href="/dashboard" label="Dashboard" />}
          <NavbarLink href="/lobby" label="Lobby" highlight />
          <Divider className="w-full border-gray-800/70" />
          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => navigate("/get-started")}
                variant="outline"
                className="hover:bg-blue-600/60 hover:text-white">
                Get Started
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-500 hover:bg-blue-600">
                Login
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={onLogout}
              className="border-red-400 px-4 py-2 text-left text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-600 hover:dark:text-white">
              Logout
            </Button>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default MobileMenu;
