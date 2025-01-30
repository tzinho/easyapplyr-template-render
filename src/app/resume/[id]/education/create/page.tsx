"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "~/components/form/input";
import { Textarea } from "~/components/form/textarea";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { api } from "~/trpc/react";
import { educationSchema, type EducationSchema } from "~/validators";

export default function EducationCreate() {
  const params = useParams<{ id: string }>();
  const educationCreateMutation = api.education.create.useMutation({
    onSuccess(data, variables, context) {
      toast.success("Education created with success!");
    },
  });

  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
  });

  const onSubmit: SubmitHandler<EducationSchema> = async (values) => {
    console.log(values);
    // await educationCreateMutation.mutateAsync({
    //   ...values,
    //   resumeId: params.id,
    // });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input name="degree" label="Degree" />
        <Input name="institution" label="Institution" />
        <Input name="year" label="Year" />
        <Textarea name="description" label="Description" />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
