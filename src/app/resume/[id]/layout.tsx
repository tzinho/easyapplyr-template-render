import { type PropsWithChildren } from "react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

interface LayoutProps extends PropsWithChildren {
  params: Promise<{ id: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { id } = await params;

  return (
    <div>
      <div className="flex items-center justify-center gap-5">
        <Link href={`/resume/${id}/contact`}>
          <Button className="h-fit text-xs">Contato</Button>
        </Link>
        <Link href={`/resume/${id}/education`}>
          <Button className="h-fit text-xs">Educações</Button>
        </Link>
        <Link href={`/resume/${id}/experiences`}>
          <Button className="h-fit text-xs">Experiências</Button>
        </Link>
        <Link href={`/resume/${id}/skills`}>
          <Button className="h-fit text-xs">Habilidades</Button>
        </Link>
        <Link href={`/resume/${id}/summary`}>
          <Button className="h-fit text-xs">Sumário</Button>
        </Link>
        <Link href={`/resume/${id}/projects`}>
          <Button className="h-fit text-xs">Projetos</Button>
        </Link>
        <Link href={`/resume/${id}/format`}>
          <Button className="h-fit text-xs">Visualização</Button>
        </Link>
      </div>

      {children}
    </div>
  );
}
