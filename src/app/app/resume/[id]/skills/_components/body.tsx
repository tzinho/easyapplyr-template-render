"use client";

import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { PageContentEditor } from "~/components/page";
import { api } from "~/trpc/react";
import { generateANewItem, skillsSchema, useMutations } from "./hooks";
import { PageLoading } from "~/components/page-loading";
import { CardList } from "~/components/handler-list";
import { Handler } from "~/components/handler";
import { Item } from "~/components/item";
import { CardForm } from "./form";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const skills = api.skills.list.useQuery({ resumeId: id });
  const mutations = useMutations();

  if (skills.isLoading) return <PageLoading />;

  const defaultValues = skills.data!.length
    ? skills.data!.map((skill) => {
        const { id, ...rest } = skill;
        return { ...rest, _id: skill.id, activeIndex: uuidv4() };
      })
    : null;

  return (
    <PageContentEditor>
      <Handler
        name="skills"
        schema={skillsSchema}
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
