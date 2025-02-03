"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { type Resume } from "~/types/template";

interface DeleteResumeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resume: Resume | null;
}

export const DeleteResume = ({
  open,
  onOpenChange,
  resume,
}: DeleteResumeProps) => {
  const { toast } = useToast();

  const utils = api.useUtils();
  const deleteItemMutation = api.resumes.delete.useMutation({
    onSuccess: () => {
      toast({ title: "Curriculum deletado com sucesso!" });
      void utils.resumes.list.invalidate();
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Excluindo o curriculum você perde todo o histórico de edições, tire
            um tempo pra pensar sobre as implicações disso. Caso tenha certeza
            clique em confirmar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteItemMutation.mutate(resume!.id);
            }}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
