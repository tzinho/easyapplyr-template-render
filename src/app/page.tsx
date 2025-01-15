import { HydrateClient } from "~/trpc/server";
import { Simple } from "./_templates/simple";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="flex items-center justify-between gap-10">
          <Simple />
        </div>
      </main>
    </HydrateClient>
  );
}
