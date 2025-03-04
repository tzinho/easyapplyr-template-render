"use client";

import { ZoomIn } from "lucide-react";

import { Card } from "./ui/card";
import { fakeData } from "~/data";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const Preview = ({
  template,
  handleOnSelected,
}: {
  template: any;
  handleOnSelected: any;
}) => {
  return (
    <Card className="group relative h-[290px] w-[215.16px] cursor-pointer transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 overflow-hidden rounded-lg bg-white">
        <div className="relative h-full w-full bg-gray-50">
          <div className="absolute inset-0 bg-white shadow-lg">
            <div className="absolute inset-0 h-full w-full origin-top-left scale-[0.3] transform">
              <div className="flex min-h-full w-[333%] flex-col p-6">
                <template.component
                  resumeTemplate={{
                    ...fakeData.female,
                    sections: template.defaultSections.map((section) => ({
                      ...section,
                      disabled: true,
                    })),
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="invisible absolute inset-0 flex items-center justify-center gap-4 bg-gray-900/70 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <Button
            size="icon"
            className="h-9 w-9 rounded-full bg-primary transition-colors hover:bg-primary/50"
            onClick={() => handleOnSelected(template)}
          >
            <ZoomIn className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white p-3">
        <div className="flex w-full justify-between">
          <span className="block max-w-[160px] truncate text-sm font-medium">
            {template.title}
          </span>
          {template.isPro && <Badge>PRO</Badge>}
        </div>
      </div>
    </Card>
  );
};
