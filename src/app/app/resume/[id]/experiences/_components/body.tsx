"use client";

import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { PageContentEditor } from "~/components/page";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";
import { Handler } from "~/components/handler";
import { experiencesSchema, generateANewItem, useMutations } from "./hooks";
import { CardList } from "./handle-list";
import { Item } from "./item";
import { CardForm } from "./handle-form";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const experiences = api.experiences.list.useQuery({ resumeId: id });
  const mutations = useMutations();

  if (experiences.isLoading) return <PageLoading />;

  const defaultValues = experiences.data!.length
    ? experiences.data!.map((experience) => {
        const { id, ...rest } = experience;
        return { ...rest, _id: experience.id, activeIndex: uuidv4() };
      })
    : null;

  return (
    <PageContentEditor>
      <Handler
        prefix="experiences"
        schema={experiencesSchema}
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
              title="Suas experiências"
              actionInfoText="Adicionar uma experiência"
              fields={fields}
              renderItem={(field, index) => {
                return (
                  <Item
                    key={field.activeIndex}
                    id={field._id}
                    value={field}
                    index={index}
                    activeIndex={activeIndex}
                    onClick={onClick}
                    onAppear={onAppear}
                    onRemove={onRemove}
                  />
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
