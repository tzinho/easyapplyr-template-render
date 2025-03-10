"use client";

import { PageContentTwoSections } from "~/components/page";
import { Handler } from "~/components/handler";
import { experiencesSchema, generateANewItem } from "./hooks";
import { Item } from "./item";
import { CardList } from "~/components/handler-list";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);
  const name = "experiences";
  const mutations = useMutations({
    name,
    modelName: "experiência",
  });

  return (
    <PageContentTwoSections isLoading={!resumeTemplate}>
      <Handler
        name={name}
        schema={experiencesSchema}
        defaultValues={resumeTemplate?.experiences}
        generateANewItem={generateANewItem}
        mutations={mutations}
        renderList={({
          fields,
          onAppend,
          onMove,
          onClick,
          onAppear,
          onRemove,
        }) => (
          <CardList
            title="Suas experiências"
            actionInfoText="Adicionar uma experiência"
            onAppend={onAppend}
            onMove={onMove}
            fields={fields}
            renderItem={(field, index) => (
              <Item
                key={field.activeIndex}
                index={index}
                value={field}
                onClick={onClick}
                onAppear={onAppear}
                onRemove={onRemove}
              />
            )}
          />
        )}
        renderForm={({ onSubmit, fields, isLoading }) => (
          <FormList
            fields={fields}
            isLoading={isLoading}
            onSubmit={onSubmit}
            submitText="Salvar na lista de experiências"
            render={({ index }) => <FormFields index={index} />}
          />
        )}
      />
    </PageContentTwoSections>
  );
};
