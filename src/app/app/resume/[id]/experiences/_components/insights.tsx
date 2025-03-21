"use client";

import { CircleCheckBig, CircleX } from "lucide-react";

import {
  analyzeActiveVoice,
  analyzeBuzzwords,
  analyzeNumberOfBullets,
  analyzePersonalPronouns,
  analyzeQuantification,
} from "~/lib/resume-scoring";
import { useHandlerInner } from "~/providers/handler-provider";

export const Insights = ({ text }: { text: string }) => {
  const { setHighlightWords } = useHandlerInner();

  const value = text.split("\n");
  const results = [
    analyzePersonalPronouns(value),
    analyzeBuzzwords(value),
    analyzeActiveVoice(value),
    analyzeQuantification(value),
    analyzeNumberOfBullets(value),
  ];

  return (
    <ul>
      {results
        .filter((result) => !result.pass)
        .map((result, index) => (
          <li
            key={index}
            className="flex cursor-pointer items-center gap-1 rounded-sm py-1 text-xs hover:bg-card/90"
            onClick={() => setHighlightWords(result.highlightWords)}
            onMouseEnter={() => setHighlightWords(result.highlightWords)}
            onMouseLeave={() => {
              setHighlightWords([]);
            }}
          >
            {result.pass ? (
              <CircleCheckBig size={12} className="stroke-green-500" />
            ) : (
              <CircleX size={12} className="stroke-red-500" />
            )}
            {result.title}
          </li>
        ))}
    </ul>
  );
};
