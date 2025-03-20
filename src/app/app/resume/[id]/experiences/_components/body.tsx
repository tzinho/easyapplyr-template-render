"use client";

import { useState } from "react";
import { BadgeHelp } from "lucide-react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player/lazy";

import { PageContentTwoSections } from "~/components/page";
import { Handler } from "~/components/handler";
import { experiencesSchema, generateANewItem } from "./hooks";
import { Item } from "./item";
import { CardList } from "~/components/handler-list";
import { FormList } from "~/components/form";
import { FormFields } from "./fields";
import { useMutations } from "~/hooks/use-mutations";
import { useResumeStore } from "~/providers/resume-store-provider";
import { cn } from "~/lib/utils";

export const Body = () => {
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);
  const name = "experiences";
  const mutations = useMutations({
    name,
    modelName: "experiência",
  });

  const handleShowVideo = () => {
    setShowVideo((showVideo) => !showVideo);
  };

  return (
    <PageContentTwoSections isLoading={!resumeTemplate}>
      <Handler
        name={name}
        info={
          <motion.div
            className="flex cursor-pointer flex-col gap-3 rounded-xl bg-card p-4 text-card-foreground shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center" onClick={handleShowVideo}>
              <div className="inline-flex min-w-10 justify-center">
                <BadgeHelp size={24} />
              </div>
              <p className="text-sm">
                Mostre sua experiência relevante (últimos 10 anos). Use
                marcadores para anotar suas conquistas, se possível: use números
                e dados quantitativos
              </p>
            </div>
            {showVideo && (
              <div
                className={cn(
                  "h-0 opacity-0 transition-all duration-300 ease-in-out",
                  showVideo && "h-full opacity-100",
                )}
              >
                <ReactPlayer
                  controls
                  // light={
                  //   <img
                  //     src="data:image/png;base64,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"
                  //     alt="Thumbnail"
                  //   />
                  // }
                  url="https://www.youtube.com/watch?v=OtEJTgmL5rc"
                  width="100%"
                  height="100%"
                  config={{
                    youtube: {
                      playerVars: {
                        showinfo: 1,
                        modestbranding: 0,
                        rel: 1,
                        controls: 0,
                        enablejsapi: 1,
                      },
                      embedOptions: {},
                    },
                  }}
                />
              </div>
            )}
          </motion.div>
        }
        schema={experiencesSchema}
        defaultValues={resumeTemplate?.experiences.sort(
          (a, b) => a.order - b.order,
        )}
        generateANewItem={generateANewItem}
        mutations={mutations}
        renderList={({ onAppend, onMove, onClick, onAppear, onRemove }) => (
          <CardList
            title="Suas experiências"
            actionInfoText="Adicionar uma experiência"
            onAppend={onAppend}
            onMove={onMove}
            renderItem={(field, index) => (
              <Item
                key={field.activeIndex}
                index={index}
                value={field}
                onClick={onClick}
                onAppear={onAppear}
                onRemove={onRemove}
              />
            )}
          />
        )}
        renderForm={({ onSubmit, isLoading }) => (
          <FormList
            isLoading={isLoading}
            onSubmit={onSubmit}
            submitText="Salvar na lista de experiências"
            render={({ index }) => <FormFields index={index} />}
          />
        )}
      />
    </PageContentTwoSections>
  );
};
