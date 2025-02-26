"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import {
  CircleCheckBig,
  CircleX,
  EyeClosedIcon,
  GripVertical,
  MoreHorizontal,
  Trash,
} from "lucide-react";

import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { type ExperienceSchema } from "~/validators";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

const buzzwords = [
  "inovação",
  "transformação digital",
  "inteligência artificial",
  "machine learning",
  "big data",
  "cloud computing",
  "blockchain",
  "metaverso",
  "realidade aumentada",
  "realidade virtual",
  "internet das coisas",
  "cybersegurança",
  "tecnologia disruptiva",
  "api",
  "plataforma",
  "algoritmo",
  "agilidade",
  "escalabilidade",
  "data driven",
  "metodologias ágeis",
  "startup",
  "empreendedorismo",
  "sinergia",
  "otimização",
  "performance",
  "impacto",
  "sustentabilidade",
  "colaboração",
  "empoderamento",
  "liderança",
  "proativo",
  "resiliência",
  "pensamento crítico",
  "networking",
  "mentoria",
  "cultura organizacional",
  "roi",
  "retorno sobre o investimento",
  "experiência do usuário",
  "ux",
  "ui",
  "engajamento",
  "branding",
  "marketing digital",
  "conteúdo relevante",
  "influenciador digital",
  "storytelling",
  "posicionamento de marca",
  "comunidade",
  "tráfego orgânico",
  "seo",
  "otimização para mecanismos de busca",
  "mindset",
  "competências",
  "habilidades",
  "desenvolvimento pessoal",
  "protagonismo",
  "flexibilidade",
  "versatilidade",
  "inclusão",
  "diversidade",
  "propósito",
  "jornada",
];

const analyzeActiveVoice = (bullets: string[]) => {
  const passiveIndicators = [
    "foi",
    "foram",
    "sido",
    "sendo",
    "é",
    "são",
    "era",
    "eram",
  ];
  const hasPassiveVoice = bullets.some((b) =>
    passiveIndicators.some((word) => new RegExp(`\\b${word}\\b`, "i").test(b)),
  );

  return {
    pass: !hasPassiveVoice,
    title: "Use uma voz ativa",
    message: hasPassiveVoice
      ? "Considere usar mais voz ativa em seus itens."
      : "Bom uso de voz ativa!",
  };
};

const analyzeBuzzwords = (bullets: string[]) => {
  const hasBuzzwords = bullets.some((bullet) => {
    const wordsInBullet = bullet.toLowerCase().split(/\b/); // Split using word boundaries
    const cleanedWords = wordsInBullet.filter((word) => word.trim() !== ""); // Remove empty strings

    return buzzwords.some((buzzword) => {
      return cleanedWords.includes(buzzword);
    });
  });

  return {
    pass: !hasBuzzwords,
    title: "Remova as palavras da moda",
    message: hasBuzzwords
      ? "Considere substituir palavras da moda por descrições mais específicas e significativas."
      : "Bom trabalho evitando palavras da moda genéricas!",
  };
};

const analyzePersonalPronouns = (bullets: string[]) => {
  const pronouns = [
    "eu",
    "me",
    "meu",
    "minha",
    "meus",
    "minhas",
    "nós",
    "nosso",
    "nossa",
    "nossos",
    "nossas",
  ];
  const hasPronouns = bullets.some((b) =>
    pronouns.some((pronoun) => new RegExp(`\\b${pronoun}\\b`, "i").test(b)),
  );

  return {
    pass: !hasPronouns,
    title: "Remova os pronomes pessoais",
    message: hasPronouns
      ? "Remova os pronomes pessoais para manter um tom profissional."
      : "Bom trabalho por evitar pronomes pessoais!",
  };
};

const analyzeQuantification = (bullets: string[]) => {
  const hasNumbers = /\d/.test(bullets.join(""));
  return {
    pass: hasNumbers,
    title: "Inserir quantificação",
    message: hasNumbers
      ? "Bom uso de dados numéricos!"
      : "Tente incluir números para quantificar suas conquistas (ex: aumentou as vendas em 25%).",
  };
};

const analyzeNumberOfBullets = (bullets: string[]) => {
  const pass = bullets.length >= 3 && bullets.length <= 10;
  return {
    pass,
    title: "Quantidade de items",
    message:
      bullets.length < 3
        ? "Adicione mais itens (tente ter pelo menos 3)."
        : bullets.length > 10
          ? "Considere reduzir o número de itens (tente ter no máximo 10)."
          : "Bom número de itens!",
  };
};

const Insights = ({ text }: { text: string }) => {
  const value = text.split("\n");
  const results = [
    analyzePersonalPronouns(value),
    analyzeBuzzwords(value),
    analyzeActiveVoice(value),
    analyzeQuantification(value),
    analyzeNumberOfBullets(value),
  ];

  return (
    <ul>
      {results.map((result, index) => (
        <li key={index} className="flex items-center gap-1 text-xs">
          {result.pass ? (
            <CircleCheckBig size={12} className="stroke-green-500" />
          ) : (
            <CircleX size={12} className="stroke-red-500" />
          )}
          {result.title}
        </li>
      ))}
    </ul>
  );
};

export const Item = ({
  id,
  value,
  onClick,
  onRemove,
  index,
  activeIndex,
  isSubmitting,
}: {
  id: string;
  value: ExperienceSchema & { activeIndex: string };
  onClick: (activeIndex: string) => void;
  onRemove: (activeIndex: string) => void;
  index: number;
  activeIndex: string;
  isSubmitting: boolean;
}) => {
  const isActive = value.activeIndex === activeIndex;
  const form = useFormContext();
  const disabled = !value._id;
  const role =
    (form.watch(`experiences.${index}.role`) as string) ||
    `Experiência ${index + 1}`;
  const company =
    (form.watch(`experiences.${index}.company`) as string) ||
    `Empresa ${index + 1}`;
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <>
      <AlertDialog
        open={openAlert}
        onOpenChange={(open: boolean) => setOpenAlert(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Clicando em confirmar você perde as atualizações que fez até
              agora!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => onClick(value.activeIndex)}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div
        className="group relative"
        style={style}
        ref={setNodeRef}
        {...attributes}
      >
        <div className="group flex w-full items-center gap-1">
          <GripVertical
            className={cn(
              "h-4 w-4 opacity-0 transition-opacity duration-200",
              !disabled && "cursor-grab group-hover:opacity-100",
            )}
            {...listeners}
          />
          <div className="flex flex-1 cursor-pointer items-center justify-between rounded-md border px-2 py-1">
            <div
              onClick={() => {
                if (isActive) return;
                onClick(value.activeIndex);
                // if (isSubmitting && !form.formState.isDirty) {
                //   onClick(value.activeIndex);
                //   return;
                // }

                // if (
                //   form.formState.isDirty &&
                //   !isActive &&
                //   Object.values(form.formState.touchedFields).some((item) => {
                //     return !!item;
                //   })
                // ) {
                //   setOpenAlert(true);
                // } else {
                //   onClick(value.activeIndex);
                // }
              }}
              className="flex-1"
            >
              <p className="text-sm">{role}</p>
              <span className="text-xs">{company}</span>
              {isActive && value.did && <Insights text={value.did} />}
            </div>

            <Popover>
              <PopoverTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" className="h-5 w-5" variant="ghost">
                        <MoreHorizontal />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ações</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </PopoverTrigger>
              <PopoverContent className="w-fit px-3 py-2">
                <div className="flex flex-col gap-1">
                  <Button
                    className="flex items-center justify-start gap-3"
                    variant="ghost"
                    disabled={disabled}
                  >
                    <EyeClosedIcon />
                    <div className="flex items-center">
                      <Label htmlFor="close" className="cursor-pointer">
                        Esconder no currículo
                      </Label>
                      <Switch
                        id="close"
                        disabled={disabled}
                        defaultChecked={!value.appear}
                      />
                    </div>
                  </Button>
                  <Separator />
                  <Button
                    className="flex items-center justify-start gap-3"
                    variant="ghost"
                    onClick={() => onRemove(value.activeIndex)}
                    disabled={disabled}
                  >
                    <Trash className="h-4 w-4" />
                    <Label className="cursor-pointer">Deletar</Label>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};
