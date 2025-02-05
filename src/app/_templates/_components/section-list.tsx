import { type PropsWithChildren } from "react";

import { Section } from "./section";

interface SectionListProps extends PropsWithChildren {
  id: string | number;
  disabled?: boolean;
}

export const SectionList = ({ id, disabled, children }: SectionListProps) => {
  return (
    <Section id={id} disabled={disabled}>
      {children}
    </Section>
  );
};
