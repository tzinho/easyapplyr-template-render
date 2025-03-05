"use client";

import { useParams } from "next/navigation";

import { PageContentEditor } from "~/components/page";
import { courseworksSchema, generateANewItem } from "./hooks";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";
import { Handler } from "~/components/handler";
import { CardList } from "~/components/handler-list";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const courseworks = api.courseworks.list.useQuery({ resumeId: id });
  const name = "courseworks";
  const mutations = useMutations({
    name,
    modelName: "curso",
  });

  if (courseworks.isLoading) return <PageLoading />;

  return (
    <PageContentEditor>
      <Handler
        name={name}
        schema={courseworksSchema}
        defaultValues={courseworks.data}
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
              title="Seus cursos"
              actionInfoText="Adicionar um curso"
              fields={fields}
              renderItem={(field, index) => {
                return (
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
              submitText="Salvar na lista de cursos"
              render={({ index }) => <FormFields index={index} />}
            />
          );
        }}
      />
    </PageContentEditor>
  );
};
