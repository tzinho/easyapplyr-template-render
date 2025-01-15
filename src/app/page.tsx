import { api, HydrateClient } from "~/trpc/server";
import { ResumeModal } from "./_components/resume-modal";
import { Simple } from "./_templates/simple";

interface TemplateProps {
  title: string;
}

const Resume = ({ title }: TemplateProps) => {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
};

export default async function Home() {
  const resumes = await api.resume.list();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {/* <ResumeModal /> */}

        <Simple />

        {/* <div>
          {resumes.map((resume) => {
            return <Resume key={resume.id} title={resume.title} />;
          })}
        </div> */}
      </main>
    </HydrateClient>
  );
}
