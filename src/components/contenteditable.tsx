"use client";

import { useRef, type ReactNode } from "react";
import { debounce } from "lodash";

export const ContentEditable = ({
  children,
  onChange,
}: {
  children: ReactNode;
  onChange?: (value: string | null) => void;
}) => {
  const debounced = useRef(
    debounce((value: string) => {
      onChange?.(value);
    }, 800),
  ).current;

  return (
    <p
      contentEditable={!!onChange}
      suppressContentEditableWarning={!!onChange}
      onInput={(e) => debounced(e.currentTarget.textContent!)}
      className="inline-flex cursor-text text-wrap text-justify outline-0"
    >
      {children}
    </p>
  );
};
