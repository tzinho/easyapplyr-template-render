import { HydrateClient } from "~/trpc/server";
import { TemplateRender } from "./_components/template-render";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <TemplateRender />
      </main>
    </HydrateClient>
  );
}
