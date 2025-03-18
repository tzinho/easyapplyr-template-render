import { type PropsWithChildren } from "react";

import { api } from "~/trpc/server";
import { Wrapper } from "./_components/wrapper";

interface ResumeLayoutEditProps extends PropsWithChildren {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResumeLayoutEdit({
  children,
  params,
}: ResumeLayoutEditProps) {
  const { id } = await params;

  const responseAPI = await api.resumes.get(id);

  return (
    <div className="flex h-full flex-col gap-3">
      <Wrapper resumeTemplate={responseAPI}>{children}</Wrapper>
    </div>
  );
}
