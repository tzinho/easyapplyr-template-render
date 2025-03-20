"use client";

import { PageContentTwoSections } from "~/components/page";
import { courseworksSchema, generateANewItem } from "./hooks";
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
  const name = "courseworks";
  const mutations = useMutations({
    name,
    modelName: "curso",
  });

  return (
    <PageContentTwoSections isLoading={!resumeTemplate}>
      <Handler
        name={name}
        info={
          <Info message="Liste cursos relevantes que complementam sua formação e mostram seu comprometimento com o aprendizado contínuo. Inclua o nome do curso, a instituição ou plataforma (como Coursera ou Udemy), e a data de conclusão. Destaque habilidades ou conhecimentos adquiridos que são úteis para a vaga." />
        }
        schema={courseworksSchema}
        defaultValues={resumeTemplate?.courseworks.sort(
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
            title="Seus cursos"
            actionInfoText="Adicionar um curso"
            fields={fields}
            renderItem={(field, index) => (
              <Item
                key={field.activeIndex}
                value={field}
                index={index}
                activeIndex={activeIndex}
                onClick={onClick}
                onAppear={onAppear}
                onRemove={onRemove}
              >
                {(watch) => (
                  <div>
                    <p className="text-sm">{watch.name}</p>
                    <span className="text-xs">{watch.where}</span>
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
            submitText="Salvar na lista de cursos"
            render={({ index }) => <FormFields index={index} />}
          />
        )}
      />
    </PageContentTwoSections>
  );
};
