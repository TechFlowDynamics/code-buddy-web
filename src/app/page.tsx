"use client";
import React from "react";
import HeroBanner from "@/components/molecule/banner/HeroBanner";
import useNavigate from "@/hooks/useNavigation";
import HeroBannerImg from "@/assets/images/png/hero_banner_ (1).jpg";
export default function Home() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/lobby");
  };
  return (
    <>
      <div className=" ">
        <main className="">
          <HeroBanner
            title="Code Together, Solve Challenges"
            subtitle="Collaborate, Code, and Challenge Friends in Real-Time"
            buttonLabel="Get Into Lobby"
            onButtonClick={handleButtonClick}
            backgroundImage={HeroBannerImg}
          />
        </main>
      </div>
    </>
  );
}
