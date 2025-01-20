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
    label: "Contato",
    description: "What's the best way for employers to reach you?",
    icon: <Contact size={14} />,
    href: "/contact",
  },
  {
    label: "Educação",
    description: "What's the best way for employers to reach you?",
    icon: <Languages size={14} />,
    href: "/education",
  },
  {
    label: "Experiências",
    description: "What's the best way for employers to reach you?",
    icon: <BookDashed size={14} />,
    href: "/experiences",
  },
  {
    label: "Habilidades",
    description: "What's the best way for employers to reach you?",
    icon: <Workflow size={14} />,
    href: "/skills",
  },
  {
    label: "Sumário",
    description: "What's the best way for employers to reach you?",
    icon: <List size={14} />,
    href: "/summary",
  },
  {
    label: "Formatar & Download",
    description: "What's the best way for employers to reach you?",
    icon: <Download size={14} />,
    href: "/format",
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-3 flex min-h-screen w-full flex-col items-center justify-between">
      <Stepper steps={steps} />
      <div className="w-full flex-1 p-4">{children}</div>
    </div>
  );
}
