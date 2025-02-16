"use client";

import { useEffect, type PropsWithChildren } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type Resume } from "~/stores/resume-store";
import { useStore } from "~/store";
import { useIsMobile } from "~/hooks/use-mobile";
import { Skeleton } from "~/components/ui/skeleton";

export default function Layout({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();
  const { setResumeTemplate } = useResumeStore((state) => state);
  const { setIsSidebarCollapse } = useStore();
  const isMobile = useIsMobile();

  const resume = api.resumes.get.useQuery(id);

  useEffect(() => {
    if (resume.data) setResumeTemplate(resume.data as unknown as Resume);
  }, [resume.isLoading, resume.data, setResumeTemplate]);

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarCollapse(true);
    }
  }, []);

  if (resume.isLoading)
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );

  return (
    <div>
      <div className="mb-5 flex items-center justify-center gap-5">
        <Link href={`/app/resume/${id}/contact`}>
          <Button className="h-6 text-xs">Contato</Button>
        </Link>
        <Link href={`/app/resume/${id}/education`}>
          <Button className="h-6 text-xs">Educações</Button>
        </Link>
        <Link href={`/app/resume/${id}/experiences`}>
          <Button className="h-6 text-xs">Experiências</Button>
        </Link>
        <Link href={`/app/resume/${id}/skills`}>
          <Button className="h-6 text-xs">Habilidades</Button>
        </Link>
        <Link href={`/app/resume/${id}/projects`}>
          <Button className="h-6 text-xs">Projetos</Button>
        </Link>
        <Link href={`/app/resume/${id}/summary`}>
          <Button className="h-6 text-xs">Sumário</Button>
        </Link>
        <Link href={`/app/resume/${id}/format`}>
          <Button className="h-6 text-xs">Visualização</Button>
        </Link>
        <Button className="h-6" variant="outline">
          Adicionar seção
        </Button>
      </div>

      {children}
    </div>
  );
}
