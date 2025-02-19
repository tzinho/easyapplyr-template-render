"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { templates } from "~/app/_templates";
import { PageContent } from "~/components/page";
import { Preview } from "~/components/preview";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { CATEGORIES } from "~/config/constants";
import { fakeData } from "~/data";
import { type Template } from "~/types/template";

export const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState("pro");
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

  return (
    <PageContent>
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
        <DialogContent className="h-[90vh] max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.title}</DialogTitle>
            <DialogDescription>
              Clique nas setas pra encontrar o seu template ideal
            </DialogDescription>
          </DialogHeader>
          <div className="relative flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 z-10"
              onClick={showPrevious}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <ScrollArea className="h-[calc(90vh-8rem)] w-full">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg bg-white">
                <div className="relative h-full w-full bg-gray-50">
                  <div className="absolute inset-0 bg-white shadow-lg">
                    <div className="absolute inset-0 h-full w-full origin-top-left transform">
                      <div className="flex min-h-full flex-col p-12">
                        {selectedTemplate && (
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 z-10"
              onClick={showNext}
              disabled={currentIndex >= templates.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContent>
  );
};
