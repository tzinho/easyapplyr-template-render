import { HydrateClient } from "~/trpc/server";
import { Body } from "./_components/body";
import { Header } from "./_components/header";

export default async function Home() {
  return (
    <HydrateClient>
      <Header />
      <Body />
    </HydrateClient>
  );
}
