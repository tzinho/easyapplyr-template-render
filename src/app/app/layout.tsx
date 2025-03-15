"use client";

import { type PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Sidebar from "~/components/sidebar";
import { useStore } from "~/store";

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  const { isSidebarOpen, setIsSidebarOpen } = useStore();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${isSidebarOpen ? "overflow-hidden" : ""} h-screen font-sans`}
      >
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute left-0 top-0 z-20 h-screen w-full bg-black/60 md:hidden"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
              className="absolute left-0 top-0 z-30 md:hidden"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex w-screen overflow-x-hidden">
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <div className="mx-auto w-full max-w-[1440px] flex-1 overflow-x-auto bg-slate-50">
            {children}
          </div>
        </div>
      </motion.div>
    </>
  );
}
