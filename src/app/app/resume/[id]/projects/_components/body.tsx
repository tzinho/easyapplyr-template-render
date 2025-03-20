"use client";

import { Handler } from "~/components/handler";
import { PageContentTwoSections } from "~/components/page";
import { generateANewItem, projectsSchema } from "./hooks";
import { CardList } from "~/components/handler-list";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";
import { useResumeStore } from "~/providers/resume-store-provider";
import { Info } from "~/components/info";

export const Body = () => {
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);
  const name = "projects";
  const mutations = useMutations({
    name,
    modelName: "projeto",
  });

  return (
    <PageContentTwoSections isLoading={!resumeTemplate}>
      <Handler
        name={name}
        info={
          <Info message="Descreva projetos que demonstrem suas habilidades e conquistas. Inclua o nome do projeto, seu papel, as tecnologias ou metodologias utilizadas e os resultados alcançados. Use números para quantificar seu impacto, como 'aumentei a eficiência em 20%' ou 'gerenciei uma equipe de 5 pessoas'. Se possível, adicione links para portfólios ou repositórios (como GitHub)" />
        }
        schema={projectsSchema}
        defaultValues={resumeTemplate?.projects.sort(
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
            title="Seus projetos"
            actionInfoText="Adicionar um projeto"
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
                    <p className="text-sm">{watch.title}</p>
                    <span className="text-xs">{watch.organization}</span>
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
            submitText="Salvar na lista de projetos"
            render={({ index }) => <FormFields index={index} />}
          />
        )}
      />
    </PageContentTwoSections>
  );
};
