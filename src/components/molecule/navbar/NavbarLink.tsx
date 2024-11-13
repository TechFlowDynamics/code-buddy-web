import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLinkProps {
  href: string;
  label: string;
  highlight?: boolean;
  className?: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({
  href,
  label,
  highlight,
  className,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <>
      {className ? (
        <Link
          href={href}
          className={`no-underline ${className} ${
            isActive
              ? "font-semibold !text-blue-500"
              : `dark:text-white ${pathname === `/` ? "text-white" : ""}`
          } ${highlight ? "font-semibold !text-green-500" : ""}`}>
          {label}
        </Link>
      ) : (
        <Link
          href={href}
          className={`text-lg no-underline ${
            isActive
              ? "font-semibold !text-blue-500"
              : `dark:text-white ${pathname === `/` ? "text-white" : ""}`
          } ${highlight ? "font-semibold !text-green-500" : ""}`}>
          {label}
        </Link>
      )}
    </>
  );
};

export default NavbarLink;
