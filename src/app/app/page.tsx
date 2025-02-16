"use client";

import { useEffect } from "react";

import { Body } from "./_components/body";
import { Header } from "./_components/header";
import { useStore } from "~/store";
import { useIsMobile } from "~/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();
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
