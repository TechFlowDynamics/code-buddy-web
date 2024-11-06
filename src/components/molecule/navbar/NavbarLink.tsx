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
          className={`no-underline ${className}  ${
            isActive
              ? "!text-blue-500 font-semibold"
              : `dark:text-white ${pathname === `/` ? "text-white" : ""}`
          } ${highlight ? "!text-green-500 font-semibold" : ""}`}>
          {label}
        </Link>
      ) : (
        <Link
          href={href}
          className={`no-underline text-lg  ${
            isActive
              ? "!text-blue-500 font-semibold"
              : `dark:text-white ${pathname === `/` ? "text-white" : ""}`
          } ${highlight ? "!text-green-500 font-semibold" : ""}`}>
          {label}
        </Link>
      )}
    </>
  );
};

export default NavbarLink;
