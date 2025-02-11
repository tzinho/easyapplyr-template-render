import { ResumeGrid } from "../_components/resume-grid";
import { ResumeModal } from "../_components/resume-modal";

export default function Resume() {
  return (
    <div className="mt-5 flex w-full flex-wrap gap-5">
      <ResumeModal />
      <ResumeGrid />
    </div>
  );
}
