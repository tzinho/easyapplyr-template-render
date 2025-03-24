"use client";

import { Minus, Plus } from "lucide-react";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";

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
import { ColorPicker } from "~/components/colorpicker";
import { useState } from "react";
import { ValueSlider } from "~/components/value-slider";
import { generatePDF } from "~/utils/pdfUtils";

export const PAPER_SIZES = {
  A4: { width: 210, height: 297, name: "A4" },
  LETTER: { width: 215.9, height: 279.4, name: "Letter" },
};

export type PaperSize = keyof typeof PAPER_SIZES;

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
  const paperSize = "A4";
  const [color, setColor] = useState("#000000");
  const { width: WIDTH_MM, height: HEIGHT_MM } = PAPER_SIZES[paperSize];

  const handleOnChangeColor = (color: string) => {
    setColor(color);
  };

  const downloadPdf = async () => {
    await generatePDF();
    // const container = document.getElementById("resume");
    // if (!container) return;

    // // Create a clone of the content to avoid scaling issues
    // const contentClone = container.cloneNode(true) as HTMLElement;
    // contentClone.style.transform = "none";
    // contentClone.style.width = `${WIDTH_MM}mm`;
    // contentClone.style.height = `${HEIGHT_MM}mm`;

    // // Temporarily append to body but hide it
    // contentClone.style.position = "absolute";
    // contentClone.style.left = "-9999px";
    // document.body.appendChild(contentClone);

    // try {
    //   // Generate canvas from the content
    //   const canvas = await html2canvas(contentClone, {
    //     scale: 1, // Higher scale for better quality
    //     useCORS: true,
    //     logging: false,
    //   });

    //   // Create PDF with correct dimensions
    //   const pdf = new jsPDF({
    //     orientation: HEIGHT_MM > WIDTH_MM ? "portrait" : "landscape",
    //     unit: "mm",
    //     format: [WIDTH_MM, HEIGHT_MM],
    //   });

    //   // Add the canvas as an image
    //   const imgData = canvas.toDataURL("image/png");
    //   pdf.addImage(imgData, "PNG", 0, 0, WIDTH_MM, HEIGHT_MM);

    //   // Download the PDF
    //   pdf.save(`document-${PAPER_SIZES[paperSize].name.toLowerCase()}.pdf`);
    // } finally {
    //   // Clean up
    //   document.body.removeChild(contentClone);
    // }
  };

  return (
    <div className="mb-3 flex flex-col items-center justify-center gap-3 md:flex-row">
      <FontSizeAdjust />
      <FontSelectAdjust />
      <PaperSelectAdjust />
      <ColorPicker value={color} onChange={handleOnChangeColor} />
      <ValueSlider />
      <Button onClick={downloadPdf}>Baixar PDF</Button>
    </div>
  );
};
