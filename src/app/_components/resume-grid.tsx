"use client";

import { useState } from "react";

import { type SectionType, type Resume } from "~/types/template";
import { api } from "~/trpc/react";
import { DeleteResume } from "./dialog/delete-resume";
import { CompactResumePreview } from "./resume";
import { fakeUserData } from "~/data";

interface TemplateProps {
  sections: SectionType[];
}

const Template = ({ data }: TemplateProps) => {
  return (
    <div className="absolute inset-0 p-4">
      <div className="h-[450%] w-[450%] origin-top-left scale-[0.22] transform">
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-3xl font-bold">{data.header.fullName}</h2>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-600">
              <span>{data.header.email}</span>
              <span>•</span>
              <span>{data.header.phone}</span>
              <span>•</span>
              <span>{data.header.location}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">SUMMARY</h3>
            <p className="text-gray-600">{data.summary}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">EXPERIENCE</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{exp.position}</p>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="mt-1 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResumeGrid = () => {
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const resumes = api.resumes.list.useQuery();

  return (
    <>
      {resumes?.data?.map((resume) => (
        <CompactResumePreview
          key={resume.id}
          resume={resume}
          onDelete={setSelectedResume}
          lastEdited="two hours ago"
          template={Template}
        />
      ))}

      <DeleteResume
        open={!!selectedResume}
        onOpenChange={() => setSelectedResume(null)}
        resume={selectedResume}
      />
    </>
  );
};
