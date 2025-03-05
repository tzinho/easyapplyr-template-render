"use client";

import { Header } from "./_components/header";
import { Body } from "./_components/body";
import { ResumeProvider } from "~/providers/resume-provider";

const Format = () => {
  return (
    <>
      <Header />
      <ResumeProvider>
        <Body />
      </ResumeProvider>
    </>
  );
};

export default Format;
