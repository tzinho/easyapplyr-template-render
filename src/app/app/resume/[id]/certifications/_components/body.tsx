"use client";

import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { api } from "~/trpc/react";
import { Handler } from "~/components/handler";
import { PageContentEditor } from "~/components/page";
import { certificationsSchema, generateANewItem, useMutations } from "./hooks";
import { PageLoading } from "~/components/page-loading";
import { CardList } from "~/components/handler-list";
import { Item } from "~/components/item";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const certifications = api.certifications.list.useQuery({ resumeId: id });
  const mutations = useMutations();

  if (certifications.isLoading) return <PageLoading />;

  const defaultValues = certifications.data!.length
    ? certifications.data!.map((certification) => {
        const { id, ...rest } = certification;
        return { ...rest, _id: certification.id, activeIndex: uuidv4() };
      })
    : null;

  return (
    <PageContentEditor>
      <Handler
        name="certifications"
        schema={certificationsSchema}
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
    </PageContentEditor>
  );
};
