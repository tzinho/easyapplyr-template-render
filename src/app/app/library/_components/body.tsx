"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { templates } from "~/app/_templates";
import { PageContent } from "~/components/page";
import { Preview } from "~/components/preview";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { CATEGORIES } from "~/config/constants";
import { fakeData } from "~/data";
import { type Template } from "~/types/template";

export const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState("pro");
  const [zoom, setZoom] = useState(0.5);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  const templatesCategory = templates.filter((template) =>
    template.categories.includes(selectedCategory),
  );

  const currentIndex = selectedTemplate
    ? templatesCategory.findIndex((t) => t.id === selectedTemplate.id)
    : -1;

  const showNext = () => {
    if (currentIndex < templates.length - 1)
      setSelectedTemplate(templatesCategory[currentIndex + 1]);
  };

  const showPrevious = () => {
    if (currentIndex > 0)
      setSelectedTemplate(templatesCategory[currentIndex - 1]);
  };

  const handleZoomIn = () => {
    if (zoom >= 1) return;

    setZoom((prev) => Math.min(prev + 0.1, 1));
  };

  const handleZoomOut = () => {
    if (zoom <= 0.5) return;
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  return (
    <PageContent className="md:px-28">
      <div className="mb-8 flex w-full flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {templatesCategory.map((template) => (
          <Preview
            key={template.id}
            template={template}
            handleOnSelected={(template) => setSelectedTemplate(template)}
          />
        ))}
      </div>

      <Dialog
        open={!!selectedTemplate}
        onOpenChange={() => setSelectedTemplate(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-[90vw] p-0">
          <div className="fixed right-4 top-4 z-20 flex gap-2">
            <Button variant="secondary" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setSelectedTemplate(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative flex h-[90vh] w-full items-center justify-center bg-black/90">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/20"
              onClick={showPrevious}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {selectedTemplate && (
              <div
                className="relative transition-transform duration-200 ease-in-out"
                style={{
                  transform: `scale(${zoom})`,
                  aspectRatio: "1/1.414", // A4 aspect ratio
                  height: "297mm",
                  width: "210mm",
                }}
              >
                <selectedTemplate.component
                  resumeTemplate={{
                    ...fakeData.female,
                    sections: selectedTemplate.defaultSections.map(
                      (section) => ({
                        ...section,
                        disabled: true,
                      }),
                    ),
                  }}
                />
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/20"
              onClick={showNext}
              disabled={currentIndex >= templates.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContent>
  );
};
