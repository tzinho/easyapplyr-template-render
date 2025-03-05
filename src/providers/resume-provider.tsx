import React, { createContext, useContext, useState, useEffect } from "react";

// Resume formatting types
export type PaperSize = "A4" | "LETTER";
export type FontFamily =
  | "Inter"
  | "Source Sans Pro"
  | "Georgia"
  | "Arial"
  | "Times New Roman"
  | "Helvetica"
  | "Merriweather";
export type ThemeColor = string;

// Resume settings interface
export interface ResumeSettings {
  paperSize: PaperSize;
  fontFamily: FontFamily;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  primaryColor: ThemeColor;
  zoom: number;
}

// Default values for settings
const defaultSettings: ResumeSettings = {
  paperSize: "A4",
  fontFamily: "Source Sans Pro",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: 0,
  primaryColor: "#3b82f6", // Blue
  zoom: 100,
};

// Define context types
interface ResumeContextType {
  settings: ResumeSettings;
  updateSettings: (newSettings: Partial<ResumeSettings>) => void;
  resetSettings: () => void;
}

// Create context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Context provider component
export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<ResumeSettings>(() => {
    // Try to load saved settings from localStorage
    const savedSettings = localStorage.getItem("resumeSettings");
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("resumeSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<ResumeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    // No need for debounce as react-pdf will handle the rendering efficiently
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <ResumeContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook to use the resume context
export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};
