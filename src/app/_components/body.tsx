import { ListOfResumeTemplates } from "./list-of-resume-templates";
import { ModalToCreateAResume } from "./modal-to-create-a-resume";

export const Body = () => {
  return (
    <main className="mx-5 flex min-h-screen w-full flex-col items-center justify-center">
      <div className="mt-5 flex w-full flex-wrap gap-5">
        <ModalToCreateAResume />
        <ListOfResumeTemplates />
      </div>
    </main>
  );
};
