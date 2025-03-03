"use client";

import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { PageContentEditor } from "~/components/page";
import { generateANewItem, languagesSchema, useMutations } from "./hooks";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";
import { Handler } from "~/components/handler";
import { CardList } from "~/components/handler-list";
import { CardForm } from "./form";
import { Item } from "~/components/item";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const languages = api.languages.list.useQuery({ resumeId: id });
  const mutations = useMutations();

  if (languages.isLoading) return <PageLoading />;

  const defaultValues = languages.data!.length
    ? languages.data!.map((language) => {
        const { id, ...rest } = language;
        return { ...rest, _id: language.id, activeIndex: uuidv4() };
      })
    : null;

  return (
    <PageContentEditor>
      <Handler
        name="languages"
        schema={languagesSchema}
        defaultValues={defaultValues}
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
              title="Suas línguas"
              actionInfoText="Adicionar uma língua"
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
                        <p className="text-sm">{watch?.name}</p>
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
            <CardForm
              fields={fields}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          );
        }}
      />
    </PageContentEditor>
  );
};
