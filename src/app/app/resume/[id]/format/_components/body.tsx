"use client";

import { PageContent } from "~/components/page";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { PageLoading } from "~/components/page-loading";
import { Document, Page } from "@react-pdf/renderer";
import ResumeTemplate from "./resume";
import Toolbar from "../../../_components/toolbar";
import { useResumeContext } from "~/providers/resume-provider";

import { pdfjs } from "react-pdf";

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

  return (
    <PageContent className="flex h-full flex-col items-center justify-center">
      <Toolbar />
      <div className="mx-auto min-h-[1122.519685px] w-[793.7px] bg-red-100">
        <div className="bg-editor-bg animate-slide-up flex min-h-[calc(100vh-80px)] w-full justify-center overflow-auto py-8">
          <div
            className="pdf-shadow overflow-hidden rounded-lg transition-transform duration-300"
            style={{
              transform: `scale(${settings.zoom / 100})`,
              transformOrigin: "top center",
              ...getViewerDimensions(),
            }}
          >
            <div className="paper-effect h-full w-full bg-white">
              <Document file="">
                <Page>
                  <ResumeTemplate settings={settings} />
                </Page>
              </Document>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
};
