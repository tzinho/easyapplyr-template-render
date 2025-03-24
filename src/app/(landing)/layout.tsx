import { type PropsWithChildren } from "react";

import { Header } from "./_components/header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 flex-col gap-20">{children}</div>
    </div>
  );
}
