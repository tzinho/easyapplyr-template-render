import { type PropsWithChildren } from "react";

import { ResumeStoreProvider } from "~/providers/resume-store-provider";

export * from "./__metadata";

export default function ResumeLayout({
  children,
}: Readonly<PropsWithChildren>) {
  console.log("[ResumeLayout]");
  return <ResumeStoreProvider>{children}</ResumeStoreProvider>;
}
