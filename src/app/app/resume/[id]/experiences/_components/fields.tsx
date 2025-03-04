"use client";

import { useFormContext } from "react-hook-form";
import { DateTimeRangePicker } from "~/components/form/datetime-range-picker";
import { Input } from "~/components/form/input";
import { TextareaList } from "~/components/form/textarea-list";
import { Badge } from "~/components/ui/badge";

interface FormFieldsProps {
  index: number;
}

export const FormFields = ({ index }: FormFieldsProps) => {
  const form = useFormContext();

  const company =
    form.watch(`experiences.${index}.company`) || `Empresa ${index + 1}`;
  const role =
    form.watch(`experiences.${index}.role`) || `Experiência ${index + 1}`;

  const appear = form.watch(`experiences.${index}.appear`);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p>
          {role} <span className="text-xs">{company}</span>
        </p>
        {!appear && <Badge>Não mostra no currículo</Badge>}
      </div>

      <Input
        label={`Qual a sua função na(o) ${company}?`}
        name={`experiences.${index}.role`}
        className="focus-visible:ring-2"
        required
      />

      <Input
        label="Em qual empresa você trabalhou?"
        name={`experiences.${index}.company`}
        className="focus-visible:ring-2"
        required
      />

      <div className="flex flex-col gap-3 md:flex-row">
        <Input
          name={`experiences.${index}.where`}
          label={`Onde está localizada a ${company}?`}
          className="focus-visible:ring-2"
        />
        <DateTimeRangePicker
          prefix="experiences"
          index={index}
          label={`Qual o período trabalhou na(o) ${company}?`}
        />
      </div>

      <TextareaList
        name={`experiences.${index}.did`}
        label={`O que você fez na(o) ${company}?`}
        className="min-h-[120px] focus-visible:ring-2"
        highlightWords={["25%"]}
      />
    </div>
  );
};
