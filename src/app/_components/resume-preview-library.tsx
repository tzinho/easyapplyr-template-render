"use client";

import { Card } from "~/components/ui/card";
import { TemplatePreview } from "./template-preview";
import { type Resume } from "~/stores/resume-store";

interface ResumePreviewLibraryProps {
  resumeTemplate: Resume;
}

export const ResumePreviewLibrary = ({
  resumeTemplate,
}: ResumePreviewLibraryProps) => {
  return (
    <Card className="group relative h-[290px] w-[215.16px] cursor-pointer transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 overflow-hidden rounded-lg bg-white">
        <div className="relative h-full w-full bg-gray-50">
          <div className="absolute inset-0 bg-white shadow-lg">
            <div className="absolute inset-0 h-full w-full origin-top-left scale-[0.3] transform">
              <div className="flex min-h-full w-[333%] flex-col p-12">
                {/* <TemplatePreview resumeTemplate={resumeTemplate} isPreview /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white p-3">
        <div className="flex flex-col">
          <span className="max-w-[160px] truncate text-sm font-medium">
            {resumeTemplate.title}
          </span>
        </div>
      </div>
    </Card>
  );
};
