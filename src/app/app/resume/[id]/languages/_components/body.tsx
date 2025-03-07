"use client";

import { useParams } from "next/navigation";

import { PageContentTwoSections } from "~/components/page";
import { generateANewItem, languagesSchema } from "./hooks";
import { api } from "~/trpc/react";
import { Handler } from "~/components/handler";
import { CardList } from "~/components/handler-list";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const responseAPI = api.languages.list.useQuery({ resumeId: params.id });
  const name = "languages";
  const mutations = useMutations({
    name,
    modelName: "língua",
  });

  return (
    <PageContentTwoSections
      isLoading={responseAPI.isLoading}
      isError={responseAPI.isError}
    >
      <Handler
        name={name}
        schema={languagesSchema}
        defaultValues={responseAPI.data!}
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
            <FormList
              fields={fields}
              isLoading={isLoading}
              onSubmit={onSubmit}
              submitText="Salvar na lista de línguas"
              render={({ index }) => <FormFields index={index} />}
            />
          );
        }}
      />
    </PageContentTwoSections>
  );
};
