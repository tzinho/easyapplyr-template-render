"use client";

import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { Handler } from "~/components/handler";
import { PageContentEditor } from "~/components/page";
import { generateANewItem, projectsSchema, useMutations } from "./hooks";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";
import { CardList } from "~/components/handler-list";
import { CardForm } from "./form";
import { Item } from "./item";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const projects = api.projects.list.useQuery({ resumeId: id });
  const mutations = useMutations();

  if (projects.isLoading) return <PageLoading />;

  const defaultValues = projects.data!.length
    ? projects.data!.map((project) => {
        const { id, ...rest } = project;
        return { ...rest, _id: project.id, activeIndex: uuidv4() };
      })
    : null;

  return (
    <PageContentEditor>
      {" "}
      <Handler
        prefix="projects"
        schema={projectsSchema}
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
              title="Seus projetos"
              actionInfoText="Adicionar um projeto"
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
