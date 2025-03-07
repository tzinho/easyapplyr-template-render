"use client";

import { useParams } from "next/navigation";

import { api } from "~/trpc/react";
import { Handler } from "~/components/handler";
import { PageContentTwoSections } from "~/components/page";
import { certificationsSchema, generateANewItem } from "./hooks";
import { CardList } from "~/components/handler-list";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";
import { certifications } from "~/server/db/schema";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const responseAPI = api.certifications.list.useQuery({ resumeId: params.id });
  const name = "certifications";
  const mutations = useMutations({
    name,
    modelName: "certificado",
  });

  return (
    <PageContentTwoSections
      isLoading={responseAPI.isLoading}
      isError={responseAPI.isError}
    >
      <Handler
        name={name}
        schema={certificationsSchema}
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
          activeIndex,
        }) => {
          return (
            <CardList
              onAppend={onAppend}
              onMove={onMove}
              title="Suas certificações"
              actionInfoText="Adicionar uma certificação"
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
              submitText="Salvar na lista de certificações"
              render={({ index }) => <FormFields index={index} />}
            />
          );
        }}
      />
    </PageContentTwoSections>
  );
};
