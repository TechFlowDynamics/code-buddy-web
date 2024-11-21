import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} CodieBuddy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
