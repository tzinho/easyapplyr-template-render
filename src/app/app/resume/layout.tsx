import { type PropsWithChildren } from "react";

import { ResumeStoreProvider } from "~/providers/resume-store-provider";

export * from "./__metadata";

export default function ResumeLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <ResumeStoreProvider>
      <div className="mt-3 flex min-h-screen w-full flex-col items-center justify-between">
        <div className="w-full flex-1 p-4">{children}</div>
      </div>
    </ResumeStoreProvider>
  );
}
