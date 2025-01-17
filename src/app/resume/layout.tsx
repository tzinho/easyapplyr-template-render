import {
  BookDashed,
  Contact,
  Download,
  Languages,
  List,
  Workflow,
} from "lucide-react";

import { Stepper } from "../_components/stepper";

const steps = [
  {
    label: "Contact Info",
    description: "What's the best way for employers to reach you?",
    icon: <Contact size={14} />,
    href: "/resume/contact",
  },
  {
    label: "Education",
    description: "What's the best way for employers to reach you?",
    icon: <Languages size={14} />,
    href: "/resume/education",
  },
  {
    label: "Experiences",
    description: "What's the best way for employers to reach you?",
    icon: <BookDashed size={14} />,
    href: "/resume/experiences",
  },
  {
    label: "Skills",
    description: "What's the best way for employers to reach you?",
    icon: <Workflow size={14} />,
    href: "/resume/skills",
  },
  {
    label: "Summary",
    description: "What's the best way for employers to reach you?",
    icon: <List size={14} />,
    href: "/resume/summary",
  },
  {
    label: "Format & Download",
    description: "What's the best way for employers to reach you?",
    icon: <Download size={14} />,
    href: "/resume/format",
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-3 flex min-h-screen w-full flex-col items-center justify-between">
      <Stepper steps={steps} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
