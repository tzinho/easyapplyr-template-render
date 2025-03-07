"use client";

import { useParams } from "next/navigation";

import { PageContentTwoSections } from "~/components/page";
import { api } from "~/trpc/react";
import { generateANewItem, skillsSchema } from "./hooks";
import { CardList } from "~/components/handler-list";
import { Handler } from "~/components/handler";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const name = "skills";
  const responseAPI = api.skills.list.useQuery({ resumeId: params.id });
  const mutations = useMutations({
    name,
    modelName: "habilidade",
  });

  return (
    <PageContentTwoSections
      isLoading={responseAPI.isLoading}
      isError={responseAPI.isError}
    >
      <Handler
        name={name}
        schema={skillsSchema}
        defaultValues={responseAPI.data!}
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
        }) => {
          return (
            <CardList
              onAppend={onAppend}
              onMove={onMove}
              title="Suas habilidades"
              actionInfoText="Adicionar uma habilidade"
              fields={fields}
              renderItem={(field, index) => {
                return (
                  <Item
                    prefix="skills"
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
                        <p className="text-sm">{watch.text}</p>
                      </div>
                    )}
                  </Item>
                );
              }}
            />
          );
        }}
        renderForm={({ onSubmit, fields, isLoading }) => {
          return (
            <FormList
              fields={fields}
              isLoading={isLoading}
              onSubmit={onSubmit}
              submitText="Salvar na lista de habilidades"
              render={({ index }) => <FormFields index={index} />}
            />
          );
        }}
      />
    </PageContentTwoSections>
  );
};
