import { type PropsWithChildren } from "react";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { Toaster as Sonner } from "~/components/ui/sonner";

export * from "./__metadata";

import "~/styles/globals.css";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <main className="flex-1">{children}</main>
        </TRPCReactProvider>
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
