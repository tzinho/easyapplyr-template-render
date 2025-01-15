import { type PropsWithChildren } from "react";

import { Section } from "./section";

interface SectionListProps extends PropsWithChildren {
  id: number;
}

export const SectionList = ({ id, children }: SectionListProps) => {
  return <Section id={id}>{children}</Section>;
};
