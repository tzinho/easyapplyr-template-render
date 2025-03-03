"use client";

import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { PageContentEditor } from "~/components/page";
import { courseworksSchema, generateANewItem, useMutations } from "./hooks";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";
import { Handler } from "~/components/handler";
import { CardList } from "~/components/handler-list";
import { CardForm } from "./form";
import { Item } from "~/components/item";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const courseworks = api.courseworks.list.useQuery({ resumeId: id });
  const mutations = useMutations();

  if (courseworks.isLoading) return <PageLoading />;

  const defaultValues = courseworks.data!.length
    ? courseworks.data!.map((coursework) => {
        const { id, ...rest } = coursework;
        return { ...rest, _id: coursework.id, activeIndex: uuidv4() };
      })
    : null;

  return (
    <PageContentEditor>
      <Handler
        name="courseworks"
        schema={courseworksSchema}
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
        renderForm={({ activeIndex, onSubmit, fields, isLoading }) => {
          return (
            <CardForm
              fields={fields}
              isLoading={isLoading}
              activeIndex={activeIndex}
              onSubmit={onSubmit}
            />
          );
        }}
      />
    </PageContentEditor>
  );
};
