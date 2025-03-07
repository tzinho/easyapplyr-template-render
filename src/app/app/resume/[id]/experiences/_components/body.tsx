"use client";

import { useParams } from "next/navigation";

import { PageContentTwoSections } from "~/components/page";
import { api } from "~/trpc/react";
import { Handler } from "~/components/handler";
import { experiencesSchema, generateANewItem } from "./hooks";
import { Item } from "./item";
import { CardList } from "~/components/handler-list";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const responseAPI = api.experiences.list.useQuery({ resumeId: params.id });
  const name = "experiences";
  const mutations = useMutations({
    name,
    modelName: "experiência",
  });

  return (
    <PageContentTwoSections
      isLoading={responseAPI.isLoading}
      isError={responseAPI.isError}
    >
      <Handler
        name={name}
        schema={experiencesSchema}
        defaultValues={responseAPI.data}
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
              title="Suas experiências"
              actionInfoText="Adicionar uma experiência"
              onAppend={onAppend}
              onMove={onMove}
              fields={fields}
              renderItem={(field, index) => {
                return (
                  <Item
                    key={field.activeIndex}
                    index={index}
                    value={field}
                    onClick={onClick}
                    onAppear={onAppear}
                    onRemove={onRemove}
                  />
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
              submitText="Salvar na lista de experiências"
              render={({ index }) => <FormFields index={index} />}
            />
          );
        }}
      />
    </PageContentTwoSections>
  );
};
