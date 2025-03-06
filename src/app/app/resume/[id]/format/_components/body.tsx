"use client";

import { useParams } from "next/navigation";
import { pdfjs } from "react-pdf";
// import { Document, Page } from "@react-pdf/renderer";

import { PageContent } from "~/components/page";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";
// import ResumeTemplate from "./resume";
import Toolbar from "../../../_components/toolbar";
import { useResumeContext } from "~/providers/resume-provider";
import { getTemplate } from "~/lib/templates";

// Configure PDF.js worker
// This is important for react-pdf to work properly
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const resume = api.resumes.get.useQuery(id);
  const { settings } = useResumeContext();

  // Get viewer container dimensions based on paper size
  const getViewerDimensions = () => {
    // Standard dimensions (in points)
    // A4: 595 x 842 points (210 x 297 mm)
    // Letter: 612 x 792 points (216 x 279 mm)

    const aspectRatio =
      settings.paperSize === "A4"
        ? 842 / 595 // A4 aspect ratio
        : 792 / 612; // Letter aspect ratio

    return {
      width: `calc(100% - 40px)`,
      height: `calc((100vh - 180px))`,
      maxWidth: "850px",
      aspectRatio: 1 / aspectRatio,
    };
  };

  if (resume.isLoading) return <PageLoading />;

  const Template = getTemplate(resume.data.templateId).component;

  return (
    <PageContent className="flex h-full flex-col items-center justify-center">
      <Toolbar />
      <div className="mx-auto min-h-[1122.519685px] w-[793.7px] bg-white">
        <div className="h-full w-full">
          <Template resumeTemplate={resume.data} settings={settings} />
        </div>
      </div>
    </PageContent>
  );
};
