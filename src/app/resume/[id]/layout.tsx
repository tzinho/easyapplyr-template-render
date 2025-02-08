import { type PropsWithChildren } from "react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

interface LayoutProps extends PropsWithChildren {
  params: Promise<{ id: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { id } = await params;

  const resume = await api.resumes.get(id);

  const links = [
    { label: "contato", type: "contact" },
    { label: "educações", type: "educations" },
    { label: "experiências", type: "experiences" },
    { label: "habilidades", type: "skills" },
    { label: "sumário", type: "summary" },
    { label: "projetos", type: "projects" },
  ];

  const useSections = resume?.sections
    .filter((section) => section.appear)
    .map((section) => section.type);

  return (
    <div>
      {/* {links.map((item) => {
        if (useSections?.includes(item.type)) {
          return item.label;
        }
      })} */}
      <div className="flex items-center justify-center gap-5">
        <Link href={`/resume/${id}/contact`}>
          <Button className="h-6 text-xs">Contato</Button>
        </Link>
        <Link href={`/resume/${id}/education`}>
          <Button className="h-6 text-xs">Educações</Button>
        </Link>
        <Link href={`/resume/${id}/experiences`}>
          <Button className="h-6 text-xs">Experiências</Button>
        </Link>
        <Link href={`/resume/${id}/skills`}>
          <Button className="h-6 text-xs">Habilidades</Button>
        </Link>
        <Link href={`/resume/${id}/summary`}>
          <Button className="h-6 text-xs">Sumário</Button>
        </Link>
        <Link href={`/resume/${id}/projects`}>
          <Button className="h-6 text-xs">Projetos</Button>
        </Link>
        <Link href={`/resume/${id}/format`}>
          <Button className="h-6 text-xs">Visualização</Button>
        </Link>
      </div>

      {children}
    </div>
  );
}
