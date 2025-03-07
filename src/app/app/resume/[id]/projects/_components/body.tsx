"use client";

import { useParams } from "next/navigation";

import { Handler } from "~/components/handler";
import { PageContentTwoSections } from "~/components/page";
import { generateANewItem, projectsSchema } from "./hooks";
import { api } from "~/trpc/react";
import { CardList } from "~/components/handler-list";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const name = "projects";
  const responseAPI = api.projects.list.useQuery({ resumeId: params.id });
  const mutations = useMutations({
    name,
    modelName: "projeto",
  });

  return (
    <PageContentTwoSections
      isLoading={responseAPI.isLoading}
      isError={responseAPI.isError}
    >
      <Handler
        name={name}
        schema={projectsSchema}
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
        }) => {
          return (
            <CardList
              onAppend={onAppend}
              onMove={onMove}
              title="Seus projetos"
              actionInfoText="Adicionar um projeto"
              fields={fields}
              renderItem={(field, index) => {
                return (
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
              submitText="Salvar na lista de projetos"
              render={({ index }) => <FormFields index={index} />}
            />
          );
        }}
      />
    </PageContentTwoSections>
  );
};
