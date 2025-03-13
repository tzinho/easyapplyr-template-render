import { type PropsWithChildren } from "react";

import { ResumeStoreProvider } from "~/providers/resume-store-provider";

export * from "./__metadata";

export default function ResumeLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return <ResumeStoreProvider>{children}</ResumeStoreProvider>;
}
