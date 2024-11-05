import React from "react";
import { Modal } from "@mantine/core";
import NavbarLink from "./NavbarLink";

interface MobileMenuProps {
  opened: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ opened, onClose }) => {
  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      centered
      className="p-0"
      transitionProps={{ transition: "fade", duration: 200 }}>
      <Modal.Overlay className="bg-gray-400/20 dark:bg-gray-800/50 backdrop-blur-" />
      <Modal.Content className="bg-gray-400/20 dark:bg-gray-800/50 backdrop-blur-lg">
        <Modal.Header className="flex flex-col items-center gap-4 p-4 bg-gray-800/65 dark:bg-gray-600/76">
          <Modal.CloseButton className="text-white" />
        </Modal.Header>
        <Modal.Body className="flex flex-col items-center gap-4 p-4 bg-gray-800/70 dark:bg-gray-600/80 backdrop-blur-lg">
          <NavbarLink href="/" label="Home" />
          <NavbarLink href="/about-us" label="About" />
          <NavbarLink href="/pricing" label="Pricing" />
          <NavbarLink href="/features" label="Features" />
          <NavbarLink href="/lobby" label="Lobby" highlight />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default MobileMenu;
