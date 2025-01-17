"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Step {
  label: string;
  description?: string;
  icon: React.ReactNode;
  href: string;
}

interface StepperProps {
  steps: Step[];
}

export const Stepper = ({ steps }: StepperProps) => {
  const pathname = usePathname();

  console.log("pathname", pathname);

  return (
    <ul className="relative flex flex-col gap-2 md:flex-row md:gap-10">
      {steps.map((step) => {
        return (
          <Link href={step.href} key={step.label}>
            <li className="group flex flex-1 items-center justify-center gap-3">
              <div className="flex min-h-7 min-w-7 flex-col items-center align-middle text-xs md:inline-flex md:w-full md:flex-row md:flex-wrap">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-800">
                  {step.icon}
                </span>
                <div className="mt-2 h-full w-px bg-gray-200 group-last:hidden md:ms-2 md:mt-0 md:h-px md:w-full md:flex-1"></div>
              </div>
              <div className="grow">
                <span className="block whitespace-nowrap text-sm font-medium text-gray-800">
                  {step.label}
                </span>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
