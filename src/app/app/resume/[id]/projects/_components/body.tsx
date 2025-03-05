"use client";

import { useParams } from "next/navigation";

import { Handler } from "~/components/handler";
import { PageContentEditor } from "~/components/page";
import { generateANewItem, projectsSchema } from "./hooks";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";
import { CardList } from "~/components/handler-list";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const name = "projects";
  const projects = api.projects.list.useQuery({ resumeId: id });
  const mutations = useMutations({
    name,
    modelName: "projeto",
  });

  if (projects.isLoading) return <PageLoading />;

  return (
    <PageContentEditor>
      <Handler
        name={name}
        schema={projectsSchema}
        defaultValues={projects.data}
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
    </PageContentEditor>
  );
};
