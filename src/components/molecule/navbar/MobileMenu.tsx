import NavbarLink from "./NavbarLink";
import { Modal } from "@mantine/core";

import React from "react";

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
          <NavbarLink href="/lobby" label="Lobby" highlight />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default MobileMenu;
