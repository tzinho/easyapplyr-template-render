"use client";

import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { api } from "~/trpc/react";

const schema = z.object({
  degree: z.string().optional(),
});

interface Experience {
  id: string;
  resumeId: string;
  degree: string | null;
  description: string | null;
  institution: string | null;
  year: string | null;
  appear: boolean | null;
  order: number;
}

const EducationForm = ({ data }: { data: Experience }) => {
  const router = useRouter();
  const { id } = useParams<{ id: string; educationId: string }>();
  const utils = api.useUtils();

  const updateEducationMutation = api.education.update.useMutation({
    onSuccess: () => {
      toast.success("Educação salva com sucesso!");
      void utils.education.invalidate();
      router.push(`/resume/${id}/education`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: data,
  });

  const handleOnSubmit: SubmitHandler<z.infer<typeof schema>> = async (d) => {
    await updateEducationMutation.mutateAsync(d);
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
  const { id, educationId } = useParams<{ id: string; educationId: string }>();
  const education = api.education.get.useQuery(educationId);

  if (education.isLoading) return null;

  return (
    <div>
      <pre>{JSON.stringify(education.data, null, 2)}</pre>
      <EducationForm data={education.data} />
    </div>
  );
}
