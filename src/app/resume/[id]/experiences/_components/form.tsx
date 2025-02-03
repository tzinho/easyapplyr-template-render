import {
  type FieldValues,
  Form,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { experienceSchema, type ExperienceSchema } from "~/validators";
import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";

interface ExperienceFormProps<T extends FieldValues> {
  handleSubmit: SubmitHandler<T>;
}

export const ExperienceForm = ({
  handleSubmit,
}: ExperienceFormProps<ExperienceSchema>) => {
  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      role: "",
      company: "",
      did: "",
      where: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-6"
      >
        <Input
          placeholder="Analista de Sistemas"
          name="role"
          label="Qual a sua função na empresa?"
        />

        <Input
          placeholder="Google"
          name="company"
          label="Para qual empresa você trabalhou?"
        />

        <Input
          placeholder="Desenvolvedor Full Stack"
          name="did"
          label="O que você fez na empresa?"
        />

        <Input
          placeholder="São Paulo, SP"
          name="where"
          label="Onde a empresa estava localizada?"
        />

        <Button type="submit">Adicionar</Button>
      </form>
    </Form>
  );
};
