"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import { CardResume } from "./card/resume";
import { DeleteResume } from "./dialog/delete-resume";
import { type Resume } from "~/types/template";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { MoreVertical } from "lucide-react";
import { data } from "tailwindcss/defaultTheme";

const fakeUserData = {
  header: {
    fullName: "Charles Bloomberg",
    title: "SEO Specialist",
    email: "charles.bloomberg@email.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
  },
  summary:
    "Results-driven SEO specialist with extensive experience in developing and implementing comprehensive search engine optimization strategies. Proven track record of improving organic search rankings and driving significant traffic growth. Skilled in conducting thorough keyword research and competitor analysis to identify opportunities and optimize content for maximum visibility.",
  experience: [
    {
      company: "Digital Marketing Agency",
      position: "Senior SEO Specialist",
      startDate: "2020",
      endDate: "Present",
      description:
        "Lead SEO strategist for enterprise clients, achieving 150% average increase in organic traffic through technical optimization and content strategy.",
    },
    {
      company: "Tech Startup",
      position: "SEO Analyst",
      startDate: "2018",
      endDate: "2020",
      description:
        "Developed and executed SEO strategies resulting in 200% growth in organic search visibility.",
    },
  ],
  education: [
    {
      institution: "New York University",
      degree: "Bachelor in Marketing",
      startDate: "2014",
      endDate: "2018",
    },
  ],
};

function CompactResumePreview({
  data,
  lastEdited,
}: {
  data: typeof fakeUserData;
  lastEdited: string;
}) {
  return (
    <Card className="group relative flex h-[290px] w-[240px] flex-col overflow-hidden border-0">
      <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
              <MoreVertical className="h-3 w-3" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardContent className="flex-grow space-y-3 p-4">
        <div className="h-[450%] w-[450%] origin-top-left scale-[0.22] transform">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="mb-2 text-3xl font-bold">
                {data.header.fullName}
              </h2>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
                <span>{data.header.email}</span>
                <span>•</span>
                <span>{data.header.phone}</span>
                <span>•</span>
                <span>{data.header.location}</span>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gray-300">
                SUMMARY
              </h3>
              <p className="text-gray-400">{data.summary}</p>
            </div>

            {/* Education */}
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gray-300">
                EDUCATION
              </h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">
                        {edu.institution}
                      </p>
                      <p className="text-gray-400">{edu.degree}</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gray-300">
                EXPERIENCE
              </h3>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">{exp.position}</p>
                      <p className="text-gray-400">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <p className="mt-1 text-gray-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative z-10 mt-auto p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-semibold">{data.header.title}</span>
          {lastEdited && (
            <span className="text-xs text-gray-400">Edited {lastEdited}</span>
          )}
        </div>
      </CardFooter>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0" />
    </Card>
  );
}

export const ResumeGrid = () => {
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const resumes = api.resume.list.useQuery();

  return (
    <>
      {resumes?.data?.map((resume) => (
        <CompactResumePreview
          key={resume.id}
          data={fakeUserData}
          lastEdited={"Two hours ago"}
        />
        // <CardResume
        //   key={resume.id}
        //   resume={resume}
        //   setSelectedResume={setSelectedResume}
        // />
      ))}

      <DeleteResume
        open={!!selectedResume}
        onOpenChange={() => setSelectedResume(null)}
        resume={selectedResume}
      />
    </>
  );
};
