import { type PropsWithChildren } from "react";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { Toaster as Sonner } from "~/components/ui/sonner";
import { fontSans } from "~/config/fonts";

export * from "./__metadata";

import "~/styles/globals.css";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pt-BR" className={`${fontSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <main className="h-screen">{children}</main>
        </TRPCReactProvider>
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
