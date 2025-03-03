"use client";

import { useParams } from "next/navigation";

import { PageContentEditor } from "~/components/page";
import { ContactForm } from "./form";
import { PageLoading } from "~/components/page-loading";
import { api } from "~/trpc/react";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const contact = api.contact.get.useQuery(id);

  if (contact.isLoading) return <PageLoading />;

  return (
    <PageContentEditor>
      <ContactForm defaultValues={contact.data!} />
    </PageContentEditor>
  );
};
