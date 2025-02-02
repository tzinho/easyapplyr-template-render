"use client";

import { useParams } from "next/navigation";

import { TemplateRender } from "~/app/_components/template-render";
import { api } from "~/trpc/react";
import { ContactForm } from "./_components/form";

const Contact = () => {
  const params = useParams<{ id: string }>();

  const contact = api.contact.get.useQuery(params.id);

  if (contact.isLoading) return <h1>Carregando ...</h1>;

  return (
    <div className="w-full">
      <div className="flex w-full gap-10">
        <ContactForm data={contact.data} />
        {/* <TemplateRender /> */}
      </div>
    </div>
  );
};

export default Contact;
