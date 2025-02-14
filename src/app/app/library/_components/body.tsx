import { useState } from "react";
import { Search } from "lucide-react";

import { ResumePreviewLibrary } from "~/app/_components/resume-preview-library";
import { templates } from "~/app/_templates";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { fakeUserData } from "~/data";

const categories = [
  { id: "pro", label: "PRO" },
  { id: "business", label: "BUSINESS" },
  { id: "programming", label: "PROGRAMMING" },
  { id: "engineering", label: "ENGINEERING" },
  { id: "marketing", label: "MARKETING" },
  { id: "design", label: "DESIGN" },
  { id: "student", label: "STUDENT" },
  { id: "medical", label: "MEDICAL" },
  { id: "finance", label: "FINANCE" },
  { id: "education", label: "EDUCATION" },
  { id: "legal", label: "LEGAL" },
  { id: "other", label: "OTHER" },
];

export const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState("marketing");

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Procure o modelo ideal</h1>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search resume and cover letter samples by role or skill"
            className="w-full py-6 pl-12 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-purple-500"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedCategory === category.id.toLowerCase()
                  ? "default"
                  : "secondary"
              }
              className={`rounded-full ${
                selectedCategory === category.id.toLowerCase()
                  ? "bg-primary hover:bg-primary"
                  : "bg-secondary hover:bg-secondary"
              }`}
              onClick={() => setSelectedCategory(category.id.toLowerCase())}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {templates.map((template) => (
            <ResumePreviewLibrary
              key={template.id}
              resumeTemplate={fakeUserData}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};
