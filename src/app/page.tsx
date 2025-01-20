import { HydrateClient } from "~/trpc/server";
import { ResumeModal } from "./_components/resume-modal";
import { ResumeGrid } from "./_components/resume-grid";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="mx-5 flex min-h-screen w-full flex-col items-center justify-center">
        <div className="mt-5 flex w-full flex-wrap gap-5">
          <ResumeModal />
          <ResumeGrid />
        </div>
      </main>
    </HydrateClient>
  );
}
