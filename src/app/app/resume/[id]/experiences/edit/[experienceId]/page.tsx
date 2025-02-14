"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type InferSelectModel } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { type experiences } from "~/server/db/schema";
import { api } from "~/trpc/react";
import {
  educationSchema,
  type ExperienceSchema,
  type EducationSchema,
  experienceSchema,
} from "~/validators";

const ExperienceForm = ({
  data,
}: {
  data: InferSelectModel<typeof experiences>;
}) => {
  const router = useRouter();
  const { id, experienceId } = useParams<{
    id: string;
    experienceId: string;
  }>();
  const utils = api.useUtils();

  const updateExperienceMutation = api.experiences.update.useMutation({
    onSuccess: () => {
      toast.success("Experiência salva com sucesso!");
      void utils.experiences.invalidate();
      router.push(`/app/resume/${id}/education`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const form = useForm<ExperienceSchema>({
    defaultValues: data,
    resolver: zodResolver(experienceSchema),
  });

  const handleOnSubmit: SubmitHandler<ExperienceSchema> = async (d) => {
    await updateExperienceMutation.mutateAsync({ id: experienceId, ...d });
  };

  const handleOnClick = () => {
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Input name="role" label="Função" />
        <Input name="company" label="Empresa" />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="destructive" onClick={handleOnClick}>
            Cancelar
          </Button>
          <ButtonLoading
            type="submit"
            isLoading={updateExperienceMutation.isPending}
          >
            Salvar
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
};

export default function EducationEdit() {
  const { experienceId } = useParams<{ experienceId: string }>();
  const experience = api.experiences.get.useQuery(experienceId);

  if (experience.isLoading) return null;

  return (
    <div>
      <ExperienceForm data={experience.data} />
    </div>
  );
}
