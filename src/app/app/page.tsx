import { HydrateClient } from "~/trpc/server";
import { Body } from "./_components/body";

export default async function Home() {
  return (
    <HydrateClient>
      <Body />
    </HydrateClient>
  );
}
