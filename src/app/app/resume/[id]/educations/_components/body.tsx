"use client";

import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { PageContentEditor } from "~/components/page";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";
import { Handler } from "~/components/handler";
import { CardList } from "~/components/handler-list";
import { Item } from "./item";
import { CardForm } from "./form";
import { educationsSchema, generateANewItem, useMutations } from "./hooks";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const educations = api.educations.list.useQuery({ resumeId: id });
  const mutations = useMutations();

  if (educations.isLoading) return <PageLoading />;

  const defaultValues = educations.data!.length
    ? educations.data!.map((education) => {
        const { id, ...rest } = education;
        return { ...rest, _id: education.id, activeIndex: uuidv4() };
      })
    : null;

  return (
    <PageContentEditor>
      <Handler
        prefix="educations"
        schema={educationsSchema}
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
              title="Suas educações"
              actionInfoText="Adicionar uma educação"
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
