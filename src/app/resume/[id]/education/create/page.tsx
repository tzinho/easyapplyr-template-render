"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { api } from "~/trpc/react";
import { educationSchema, type EducationSchema } from "~/validators";

export default function EducationCreate() {
  const utils = api.useUtils();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const educationCreateMutation = api.education.create.useMutation({
    onSuccess() {
      void utils.education.invalidate();
      toast.success("Education created with success!");
      router.push(`/resume/${params.id}/education`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
  });

  const handleOnSubmit: SubmitHandler<EducationSchema> = async (values) => {
    await educationCreateMutation.mutateAsync({
      ...values,
      resumeId: params.id,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Input name="degree" label="Degree" />
        <Input name="institution" label="Institution" />
        <Input name="description" label="Description" />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
