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
import { Info } from "~/components/info";

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
        info={
          <Info
            message="Descreva suas experiências profissionais de forma clara e impactante. Comece com o nome da empresa, seu cargo e o período em que atuou (mês/ano de início e término). Em seguida, liste suas responsabilidades e conquistas usando marcadores"
            items={[
              {
                message:
                  "Use números e dados quantitativos: Em vez de 'ajudei a aumentar as vendas', escreva 'aumentei as vendas em 25% em 6 meses'.",
                type: 0,
              },
              {
                message:
                  "Foque em resultados: Mostre como suas ações impactaram positivamente a empresa ou equipe.",
                type: 0,
              },
              {
                message:
                  "Seja relevante: Priorize experiências dos últimos 10 anos e que estejam alinhadas com a vaga que você está buscando.",
                type: 0,
              },
              {
                message:
                  "Use palavras de ação: Comece frases com verbos como 'liderar', 'desenvolver', 'implementar', 'otimizar', 'gerenciar', etc.",
                type: 0,
              },
            ]}
          />
        }
        schema={experiencesSchema}
        defaultValues={resumeTemplate?.experiences.sort(
          (a, b) => a.order - b.order,
        )}
        generateANewItem={generateANewItem}
        mutations={mutations}
        renderList={({ onAppend, onMove, onClick, onAppear, onRemove }) => (
          <CardList
            title="Suas experiências"
            actionInfoText="Adicionar uma experiência"
            onAppend={onAppend}
            onMove={onMove}
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
        renderForm={({ onSubmit, isLoading }) => (
          <FormList
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
