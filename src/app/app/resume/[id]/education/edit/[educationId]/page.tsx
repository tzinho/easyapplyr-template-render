"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type InferSelectModel } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { type educations } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { educationSchema, type EducationSchema } from "~/validators";

const EducationForm = ({
  data,
}: {
  data: InferSelectModel<typeof educations>;
}) => {
  const router = useRouter();
  const { id, educationId } = useParams<{ id: string; educationId: string }>();
  const utils = api.useUtils();

  const updateEducationMutation = api.educations.update.useMutation({
    onSuccess: () => {
      toast.success("Educação salva com sucesso!");
      void utils.educations.invalidate();
      router.push(`/app/resume/${id}/education`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<EducationSchema>({
    defaultValues: data,
    resolver: zodResolver(educationSchema),
  });
  const handleOnSubmit: SubmitHandler<EducationSchema> = async (d) => {
    const { institution, description, ...rest } = d;
    await updateEducationMutation.mutateAsync({
      id: educationId,
      institution: institution ?? undefined,
      description: description ?? undefined,
      ...rest,
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
};

export default function EducationEdit() {
  const { educationId } = useParams<{ id: string; educationId: string }>();
  const education = api.educations.get.useQuery(educationId);

  if (education.isLoading) return null;

  return (
    <div>
      <EducationForm data={education.data!} />
    </div>
  );
}
