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
    <section className="group/section relative flex h-screen items-center justify-center overflow-hidden text-center text-white transition-shadow duration-500 ease-in-out">
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* Top and Bottom Glow Shadows on Hover */}
      <div className="absolute left-0 top-0 z-10 h-20 w-full bg-darkBackground bg-opacity-10 backdrop-blur-md" />
      <div className="absolute bottom-0 left-0 z-10 h-10 w-full bg-opacity-70 bg-gradient-to-b from-gray-900/70 to-darkBackground backdrop-blur-sm" />

      {/* Content */}
      <div className="z-20 rounded-lg bg-opacity-50 p-10">
        <h1 className="mb-4 text-6xl font-bold">{title}</h1>
        <p className="mb-6 text-lg">{subtitle}</p>
        <button
          onClick={onButtonClick}
          className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800">
          <span className="relative rounded-md bg-white px-5 py-2.5 text-lg font-semibold transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            {buttonLabel}
          </span>
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
