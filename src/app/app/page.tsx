"use client";

import { useEffect } from "react";

import { Body } from "./_components/body";
import { Header } from "./_components/header";
import { useStore } from "~/store";

export default function Home() {
  const { setIsSidebarCollapse } = useStore();

  useEffect(() => {
    setIsSidebarCollapse(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Body />
    </>
  );
}
