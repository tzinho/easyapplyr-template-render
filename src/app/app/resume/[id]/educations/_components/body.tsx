"use client";

import { PageContentTwoSections } from "~/components/page";
import { Handler } from "~/components/handler";
import { CardList } from "~/components/handler-list";
import { educationsSchema, generateANewItem } from "./hooks";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";
import { useResumeStore } from "~/providers/resume-store-provider";
import { Info } from "~/components/info";
import { info } from "console";

export const Body = () => {
  const name = "educations";
  const mutations = useMutations({ name, modelName: "educação" });
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);

  return (
    <PageContentTwoSections isLoading={!resumeTemplate}>
      <Handler
        name={name}
        info={
          <Info message="Descreva sua formação acadêmica de forma clara e objetiva. Inclua o nome da instituição, o curso, o grau obtido e as datas de início e conclusão. Se você teve um desempenho acadêmico destacado (como prêmios, bolsas ou média alta), mencione! Para cursos técnicos ou profissionalizantes, destaque habilidades relevantes adquiridas." />
        }
        schema={educationsSchema}
        defaultValues={resumeTemplate?.educations.sort(
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
          activeIndex,
        }) => (
          <CardList
            onAppend={onAppend}
            onMove={onMove}
            title="Suas educações"
            actionInfoText="Adicionar uma educação"
            fields={fields}
            renderItem={(field, index) => (
              <Item
                key={field.activeIndex}
                value={field}
                activeIndex={activeIndex}
                onClick={onClick}
                onAppear={onAppear}
                onRemove={onRemove}
                index={index}
              >
                {(watch) => (
                  <div>
                    <p className="text-sm">{watch.degree}</p>
                    <span className="text-xs">{watch.institution}</span>
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
            submitText="Salvar na lista de educações"
            render={({ index }) => <FormFields index={index} />}
          />
        )}
      />
    </PageContentTwoSections>
  );
};
