"use client";

import { PageContentTwoSections } from "~/components/page";
import { generateANewItem, languagesSchema } from "./hooks";
import { Handler } from "~/components/handler";
import { CardList } from "~/components/handler-list";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";
import { useResumeStore } from "~/providers/resume-store-provider";
import { Info } from "~/components/info";

export const Body = () => {
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);
  const name = "languages";
  const mutations = useMutations({
    name,
    modelName: "língua",
  });

  return (
    <PageContentTwoSections isLoading={!resumeTemplate}>
      <Handler
        name={name}
        info={
          <Info message="Informe seus conhecimentos em idiomas de forma honesta e clara. Use níveis como 'básico', 'intermediário', 'avançado' ou 'fluente'. Se você possui certificações de proficiência (como TOEFL ou DELE), mencione-as. Destaque idiomas que são relevantes para a vaga ou para o ambiente de trabalho." />
        }
        schema={languagesSchema}
        defaultValues={resumeTemplate?.languages.sort(
          (a, b) => a.order - b.order,
        )}
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
            title="Suas línguas"
            actionInfoText="Adicionar uma língua"
            fields={fields}
            renderItem={(field, index) => (
              <Item
                key={field.activeIndex}
                value={field}
                index={index}
                onClick={onClick}
                onAppear={onAppear}
                onRemove={onRemove}
              >
                {(watch) => (
                  <div>
                    <p className="text-sm">{watch?.name}</p>
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
            submitText="Salvar na lista de línguas"
            render={({ index }) => <FormFields index={index} />}
          />
        )}
      />
    </PageContentTwoSections>
  );
};
