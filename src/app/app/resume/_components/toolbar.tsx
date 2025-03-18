import { Minus, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useResumeStore } from "~/providers/resume-store-provider";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const PaperSelectAdjust = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] flex-1">
        <SelectValue placeholder="Select a paper size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="A4">A4</SelectItem>
          <SelectItem value="Letter">Letter</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const LineHeightAdjust = () => {
  return <div>LineHeightAdjust</div>;
};

const SectionSpacing = () => {
  return <div>SectionSpacing</div>;
};

const FontSelectAdjust = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] flex-1">
        <SelectValue placeholder="Select a font family" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Merriweather">Merriweather</SelectItem>
          <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
          <SelectItem value="Calibri">Calibri</SelectItem>
          <SelectItem value="Times New Roman">Times New Roman</SelectItem>
          <SelectItem value="Comic Sans">Comic Sans</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const FontSizeAdjust = () => {
  const { resumeTemplate, setSettings } = useResumeStore((state) => state);
  return (
    <div className="flex w-full flex-1 items-center justify-center gap-3">
      <Button
        variant="outline"
        className="rounded-full"
        size="icon"
        onClick={() => {
          if (resumeTemplate!.settings.fontSize <= 6) return;
          setSettings({ fontSize: resumeTemplate!.settings.fontSize - 0.5 });
        }}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-full max-w-8 text-center text-xs">
        {resumeTemplate?.settings.fontSize}
      </span>
      <Button
        variant="outline"
        className="h-8 rounded-full"
        size="icon"
        onClick={() => {
          if (resumeTemplate!.settings.fontSize >= 16) return;
          setSettings({ fontSize: resumeTemplate!.settings.fontSize + 0.5 });
        }}
      >
        <Plus className="h-2 w-2" />
      </Button>
    </div>
  );
};

export const Toolbar = () => {
  return (
    <div className="mb-3 flex flex-col items-center justify-center gap-3 md:flex-row">
      <FontSizeAdjust />
      <FontSelectAdjust />
      <PaperSelectAdjust />
      <Button>Baixar PDF</Button>
    </div>
  );
};
