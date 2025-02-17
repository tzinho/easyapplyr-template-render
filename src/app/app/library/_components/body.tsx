"use client";

import { useState } from "react";
import { PageContent } from "~/components/page";

import { Button } from "~/components/ui/button";

const categories = [
  { id: "pro", label: "Pro" },
  { id: "business", label: "Negócios" },
  { id: "programming", label: "Programação" },
  { id: "engineering", label: "Engenheiros" },
  { id: "marketing", label: "Marketing" },
  { id: "design", label: "Design" },
  { id: "student", label: "Estudantes" },
  { id: "medical", label: "Medicina" },
  { id: "finance", label: "Financeiro" },
  { id: "education", label: "Educação" },
  { id: "legal", label: "Legal" },
  { id: "other", label: "Outros" },
];

export const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState("marketing");

  return (
    <PageContent>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategory === category.id.toLowerCase()
                ? "default"
                : "secondary"
            }
            className={`${
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
    </PageContent>
  );
};
