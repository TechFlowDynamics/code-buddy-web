"use client";

import HeroBannerImg from "@/assets/images/png/hero_banner_ (1).jpg";

import React from "react";

import useNavigate from "@/hooks/useNavigation";

import HeroBanner from "@/components/molecule/banner/HeroBanner";
import QuestionHome from "@/components/molecule/questions/Questions";
import Footer from "@/components/atoms/footer/Footer";

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
          <QuestionHome />
          <Footer />
        </main>
      </div>
    </>
  );
}
