"use client";

import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Download,
  Minus,
  Plus,
  Type,
  AlignJustify,
  TextCursor,
  Palette,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import {
  type FontFamily,
  type PaperSize,
  useResumeContext,
} from "~/providers/resume-provider";

const Toolbar: React.FC = () => {
  const { settings, updateSettings } = useResumeContext();
  const handleDownloadPDF = async () => {
    const input = document.getElementById("resume");
    const canvas = await html2canvas(input!, {
      scale: 2, // Increase scale for better quality
      useCORS: true, // Allow cross-origin images
    });
    const imgData = canvas.toDataURL("image/png"); // Convert canvas to image
    const pdf = new jsPDF("p", "mm", "a4"); // Create a new PDF

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height to maintain aspect ratio

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Add image to PDF
    pdf.save("resume.pdf");
  };

  // Font families available
  const fontFamilies: FontFamily[] = [
    "Source Sans Pro",
    "Inter",
    "Georgia",
    "Arial",
    "Times New Roman",
    "Helvetica",
  ];

  // Paper sizes available
  const paperSizes: { label: string; value: PaperSize }[] = [
    { label: "A4", value: "A4" },
    { label: "Carta", value: "LETTER" },
  ];

  // Color palette options
  const colorOptions = [
    "#3b82f6", // Blue
    "#ef4444", // Red
    "#10b981", // Green
    "#f59e0b", // Yellow
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#000000", // Black
    "#6b7280", // Gray
  ];

  // Handle zoom in
  const handleZoomIn = () => {
    updateSettings({ zoom: Math.min(settings.zoom + 10, 100) });
  };

  // Handle zoom out
  const handleZoomOut = () => {
    updateSettings({ zoom: Math.max(settings.zoom - 10, 50) });
  };

  return (
    <div className="bg-editor-toolbar border-editor-border animate-fade-in flex w-full items-center justify-between border-b px-4 py-3 shadow-sm">
      <div className="flex items-center space-x-2">
        {/* Logo */}
        <div className="mr-6 flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <span className="text-lg font-bold text-primary">56</span>
          </div>
          <div className="ml-2 hidden sm:block">
            <h1 className="text-sm font-semibold">Score</h1>
            <p className="text-xs text-muted-foreground">
              Clique aqui e otimize
            </p>
          </div>
        </div>

        {/* Font Family */}
        <Select
          value={settings.fontFamily}
          onValueChange={(value) =>
            updateSettings({ fontFamily: value as FontFamily })
          }
        >
          <SelectTrigger className="toolbar-item w-[160px]">
            <Type className="h-4 w-4" />
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Font Size */}
        <div className="flex items-center">
          <button
            className="toolbar-button"
            onClick={() =>
              updateSettings({ fontSize: Math.max(settings.fontSize - 1, 8) })
            }
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-sm">{settings.fontSize}</span>
          <button
            className="toolbar-button"
            onClick={() =>
              updateSettings({ fontSize: Math.min(settings.fontSize + 1, 16) })
            }
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Line Height */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="toolbar-button" title="Line Height">
              <AlignJustify className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Altura da linha</h4>
              <div className="flex items-center gap-2">
                <Slider
                  min={1}
                  max={2}
                  step={0.1}
                  value={[settings.lineHeight]}
                  onValueChange={([value]) =>
                    updateSettings({ lineHeight: value })
                  }
                />
                <span className="w-8 text-sm">
                  {settings.lineHeight.toFixed(1)}
                </span>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Letter Spacing */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="toolbar-button" title="Letter Spacing">
              <TextCursor className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Espaço entre as letras</h4>
              <div className="flex items-center gap-2">
                <Slider
                  min={-1}
                  max={2}
                  step={0.1}
                  value={[settings.letterSpacing]}
                  onValueChange={([value]) =>
                    updateSettings({ letterSpacing: value })
                  }
                />
                <span className="w-8 text-sm">
                  {settings.letterSpacing.toFixed(1)}
                </span>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Color Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="toolbar-button" title="Cor primária">
              <Palette className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className={`h-6 w-6 rounded-full ring-offset-2 focus:outline-none focus:ring-2 ${
                      settings.primaryColor === color
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateSettings({ primaryColor: color })}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-3">
        {/* Paper Size */}
        <Select
          value={settings.paperSize}
          onValueChange={(value) =>
            updateSettings({ paperSize: value as PaperSize })
          }
        >
          <SelectTrigger className="toolbar-item w-[100px]">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {paperSizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Zoom Controls */}
        <div className="flex items-center">
          <button className="toolbar-button" onClick={handleZoomOut}>
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-12 text-center text-xs font-medium">
            {settings.zoom}%
          </span>
          <button className="toolbar-button" onClick={handleZoomIn}>
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Download Button */}
        <Button
          size="sm"
          className="hidden sm:flex"
          onClick={handleDownloadPDF}
        >
          <Download className="mr-1 h-4 w-4" />
          Baixar PDF
        </Button>
        <Button size="sm" className="p-2 sm:hidden">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
