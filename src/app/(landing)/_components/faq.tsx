import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "~/components/ui/accordion";
import { questions } from "~/config/questions";

export const FAQ = () => {
  return (
    <div className="center mx-5 flex-col gap-5">
      <h3 className="text-center text-4xl">Perguntas Frequentes (FAQs)</h3>
      <div className="w-full max-w-lg lg:max-w-6xl">
        <div className="w-full space-y-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="1"
          >
            {questions.map((question) => (
              <AccordionItem
                value={question.question}
                key={question.question}
                className="py-2"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="text-md flex flex-1 items-center gap-3 py-2 text-left font-semibold leading-6 transition-all lg:text-xl [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&>svg]:-order-1 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                    {question.question}
                    <Plus
                      size={16}
                      strokeWidth={2}
                      className="shrink-0 opacity-60 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-2 ps-7 text-sm text-muted-foreground lg:text-lg">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
