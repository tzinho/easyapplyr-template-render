"use client";

import { useState } from "react";
import { BadgeHelp } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "~/lib/utils";

enum InfoType {
  do,
  dont,
}

interface InfoProps {
  message: string;
  items: { message: string; type: InfoType }[];
}

export const Info = ({ message, items }: InfoProps) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);

  return (
    <motion.div
      className="flex cursor-pointer select-none flex-col gap-3 rounded-xl bg-card p-4 text-card-foreground shadow"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setShowVideo((showVideo) => !showVideo)}
    >
      <div className="flex">
        <div className="inline-flex min-w-10 justify-center">
          <BadgeHelp size={24} />
        </div>
        <p className="text-sm">{message}</p>
      </div>
      {showVideo && (
        <div
          className={cn(
            "h-0 space-y-1 opacity-0 transition-all duration-300 ease-in-out",
            showVideo && "h-full opacity-100",
          )}
        >
          {items?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex w-full items-center gap-8 md:items-start"
              >
                <div
                  className={cn(
                    "h-3 w-3 shrink-0 grow-0 flex-wrap rounded-lg",
                    item.type ? "bg-red-500" : "bg-green-500",
                  )}
                ></div>
                <p className="text-xs">{item.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
