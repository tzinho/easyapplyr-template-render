"use client";

import { PageContentTwoSections } from "~/components/page";
import { generateANewItem, skillsSchema } from "./hooks";
import { CardList } from "~/components/handler-list";
import { Handler } from "~/components/handler";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const name = "skills";
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);
  const mutations = useMutations({
    name,
    modelName: "habilidade",
  });

  return (
    <PageContentTwoSections isLoading={!resumeTemplate}>
      <Handler
        name={name}
        schema={skillsSchema}
        defaultValues={resumeTemplate.skills}
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
            onAppend={onAppend}
            onMove={onMove}
            title="Suas habilidades"
            actionInfoText="Adicionar uma habilidade"
            fields={fields}
            renderItem={(field, index) => (
              <Item
                prefix="skills"
                key={field.activeIndex}
                value={field}
                index={index}
                onClick={onClick}
                onAppear={onAppear}
                onRemove={onRemove}
              >
                {(watch) => (
                  <div>
                    <p className="text-sm">{watch.text}</p>
                  </div>
                )}
              </Item>
            )}
          />
        )}
        renderForm={({ onSubmit, fields, isLoading }) => (
          <FormList
            fields={fields}
            isLoading={isLoading}
            onSubmit={onSubmit}
            submitText="Salvar na lista de habilidades"
            render={({ index }) => <FormFields index={index} />}
          />
        )}
      />
    </PageContentTwoSections>
  );
};
