"use client";

import { LoaderCircle } from "lucide-react";

export const PageLoading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin" />
      <h1>Carregando ...</h1>
    </div>
  );
};
