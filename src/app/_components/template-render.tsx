"use client";

import { useForm } from "react-hook-form";
import { Simple } from "../_templates/simple";
import { Form } from "~/components/ui/form";

const defaultValues = {
  contact: {
    name: "George Turner",
    phone: "(555) 132-2356",
    email: "george@turner.com",
    location: "New York City",
  },
  skills: [
    { id: "1", title: "ReactJS", order: 1 },
    { id: "2", title: "NodeJS", order: 2 },
    { id: "3", title: "NextJS", order: 3 },
  ],
  experiences: [
    { id: "1", title: "Web Developer", order: 1 },
    { id: "2", title: "Tech Lead", order: 2 },
  ],
  sections: [
    { id: "1", type: "contact", order: 1, disabled: true },
    { id: "2", type: "summary", order: 2 },
    { id: "3", type: "skills", order: 3 },
    { id: "4", type: "experiences", order: 4 },
  ],
};

export const TemplateRender = () => {
  const form = useForm({
    mode: "onBlur",
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form>
        <Simple />
        {/* <AutoSave
          defaultValues={defaultValues}
          onSubmit={(d) => {
            console.log("d", d);
          }}
        /> */}
      </form>
    </Form>
  );
};
