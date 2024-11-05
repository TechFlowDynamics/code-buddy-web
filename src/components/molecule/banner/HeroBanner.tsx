import React from "react";
import Image, { StaticImageData } from "next/image";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  onButtonClick: () => void;
  backgroundImage: StaticImageData;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  buttonLabel,
  onButtonClick,
  backgroundImage,
}) => {
  return (
    <section className="relative flex items-center justify-center h-screen text-center text-white transition-shadow duration-500 ease-in-out group/section overflow-hidden">
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* Top and Bottom Glow Shadows on Hover */}
      <div className="absolute top-0 left-0 w-full h-20 bg-darkBackground bg-opacity-10 backdrop-blur-md z-10" />
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-gray-900/70 to-darkBackground bg-opacity-70 backdrop-blur-sm z-10" />


      {/* Content */}
      <div className="z-20 bg-opacity-50 p-10 rounded-lg">
        <h1 className="text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{subtitle}</p>
        <button
          onClick={onButtonClick}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg font-semibold">
            {buttonLabel}
          </span>
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
