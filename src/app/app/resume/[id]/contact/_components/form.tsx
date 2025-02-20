"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { City, Country, State } from "country-state-city";

import { Form } from "~/components/ui/form";
import { Input } from "~/components/form/input";
import { type ContactSchema, contactSchema } from "~/validators";
import { api } from "~/trpc/react";
import { ButtonLoading } from "~/components/ui/button-loading";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type Resume, type Contact } from "~/stores/resume-store";
import { SelectItem } from "~/components/ui/select";
import { Select } from "~/components/form/select";

interface SelectCountryProps {
  name: string;
  placeholder?: string;
}

interface SelectStateProps {
  name: string;
  placeholder?: string;
}

interface SelectCityProps {
  name: string;
  placeholder?: string;
}

const SelectCity = ({ name, placeholder }: SelectCityProps) => {
  const { watch } = useFormContext();
  const country = watch("country") as string;
  const state = watch("state") as string;

  const cities = useMemo(
    () => City.getCitiesOfState(country, state),
    [country, state],
  );

  return (
    <Select
      name={name}
      placeholder={placeholder}
      label="Cidade"
      className="flex-1"
    >
      {cities.map((city) => (
        <SelectItem key={city.name} value={city.name}>
          {city.name}
        </SelectItem>
      ))}
    </Select>
  );
};

const SelectState = ({ name, placeholder }: SelectStateProps) => {
  const { watch } = useFormContext();
  const country = watch("country") as string;
  const states = State.getStatesOfCountry(country);

  return (
    <Select
      name={name}
      placeholder={placeholder}
      label="Estado"
      className="flex-1"
    >
      {states.map((state) => (
        <SelectItem key={state.isoCode} value={state.isoCode}>
          {state.name}
        </SelectItem>
      ))}
    </Select>
  );
};

const SelectCountry = ({ name, placeholder }: SelectCountryProps) => {
  const countries = Country.getAllCountries();

  return (
    <Select
      name={name}
      placeholder={placeholder}
      label="País"
      className="flex-1"
    >
      {countries.map((country) => (
        <SelectItem key={country.isoCode} value={country.isoCode}>
          {country.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export const ContactForm = ({
  defaultValues,
}: {
  defaultValues: Resume["contact"];
}) => {
  const params = useParams<{ id: string }>();

  const { setContactTemplate } = useResumeStore((state) => state);

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const updateContact = api.contact.create.useMutation({
    onSuccess(_, variables) {
      setContactTemplate(variables as Contact);
      toast.success("Mudanças salvas com sucesso!");
    },
    onError() {
      toast.error("Ocorreu um erro ao tentar salvar as mudanças! ");
    },
  });

  const onSubmit = async (values: ContactSchema) => {
    await updateContact.mutateAsync({ ...values, resumeId: params.id });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <div className="flex w-full flex-col gap-3 md:flex-row">
          <Input name="name" label="Nome Completo" placeholder="Thiago Luiz" />
          <Input name="email" label="Email" placeholder="thiago@luiz.com" />
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <Input name="phone" label="Telefone" placeholder="(11) 96065-7707" />
          <Input
            name="linkedin"
            label="Linkedin"
            placeholder="https://linkedin.com/in/tluiz"
          />
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <Input
            name="personal"
            label="Site"
            placeholder="https://www.thiagoluiz.com"
            className="flex-1"
          />
          <SelectCountry name="country" placeholder="Brasil" />
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <SelectState name="state" placeholder="São Paulo, SP" />
          <SelectCity name="city" placeholder="Guarulhos" />
        </div>

        <ButtonLoading
          type="submit"
          isLoading={updateContact.isPending}
          className="self-end"
        >
          Salvar as informações de contato
        </ButtonLoading>
      </form>
    </Form>
  );
};
