import { ResumeTemplates } from "./resume-grid";
import { ResumeModal } from "./resume-modal";

export const Body = () => {
  return (
    <main className="mx-5 flex min-h-screen w-full flex-col items-center justify-center">
      <div className="mt-5 flex w-full flex-wrap gap-5">
        <ResumeModal />
        <ResumeTemplates />
      </div>
    </main>
  );
};
