"use client";

import { useParams } from "next/navigation";

import { PageContentEditor } from "~/components/page";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";
import { Handler } from "~/components/handler";
import { CardList } from "~/components/handler-list";
import { educationsSchema, generateANewItem } from "./hooks";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const name = "educations";
  const educations = api.educations.list.useQuery({ resumeId: id });
  const mutations = useMutations({ name, modelName: "educação" });

  if (educations.isLoading) return <PageLoading />;

  return (
    <PageContentEditor>
      <Handler
        name={name}
        schema={educationsSchema}
        defaultValues={educations.data}
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
              title="Suas educações"
              actionInfoText="Adicionar uma educação"
              fields={fields}
              renderItem={(field, index) => {
                return (
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
              submitText="Salvar na lista de educações"
              render={({ index }) => <FormFields index={index} />}
            />
          );
        }}
      />
    </PageContentEditor>
  );
};
