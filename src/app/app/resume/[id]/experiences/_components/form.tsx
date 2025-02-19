"use client";

import { type SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import { Input } from "~/components/form/input";
import { Textarea } from "~/components/form/textarea";
import { ButtonLoading } from "~/components/ui/button-loading";

interface ExperienceFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnSubmit: SubmitHandler<any>;
  current: number | null;
}

export const ExperienceForm = ({
  handleOnSubmit,
  current,
}: ExperienceFormProps) => {
  const form = useFormContext<{ role: string; company: string }>();
  const company = useWatch({ name: "company", control: form.control });

  const experiences = useWatch({ control: form.control, name: "experiences" });

  console.log("[current]: ", current);
  console.log("[experiences]: ", experiences);

  return (
    <form
      onSubmit={form.handleSubmit(handleOnSubmit)}
      className="flex flex-col items-end"
    >
      <Input
        name={`experiences.${current}.role`}
        label={`Qual sua função na ${company ? company : "empresa A"}`}
        required
      />
      <Input name={`experiences.${current}.company`} label="Empresa" required />
      <Input
        name={`experiences.${current}.where`}
        label={`Onde está localizada a ${company ? company : "empresa A"}?`}
      />
      <Textarea
        name={`experiences.${current}.did`}
        label={`O que você fez na ${company ? company : "empresa A"}?`}
      />
      <ButtonLoading type="submit">Salvar a experiência</ButtonLoading>
    </form>
  );
};
