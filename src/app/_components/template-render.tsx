"use client";

import { useForm } from "react-hook-form";
import { Simple } from "../_templates/simple";
import { Form } from "~/components/ui/form";

export const TemplateRender = () => {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      contact: {
        name: "George Turner",
        phone: "(555) 132-2356",
        email: "george@turner.com",
        location: "New York City, United States",
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
    },
  });

  console.log("form", form);

  // const saveDataToLocalStorage = (dirtyFields) => {
  //   try {
  //     const currentData = localStorage.getItem("data");
  //     const parsedData = currentData ? JSON.parse(currentData) : {};
  //     const updatedData = { ...parsedData, ...dirtyFields };
  //     localStorage.setItem("data", JSON.stringify(updatedData));
  //   } catch (error) {
  //     console.error("Error saving data to local storage:", error);
  //   }
  // };

  return (
    <Form {...form}>
      <form>
        <Simple />
      </form>
    </Form>
  );
};
