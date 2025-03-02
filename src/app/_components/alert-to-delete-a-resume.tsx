"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";
import { useToast } from "~/hooks/use-toast";
import { type Resume } from "~/stores/resume-store";
import { api } from "~/trpc/react";

interface DeleteResumeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeTemplate: Resume | null;
}

export const AlertToDeleteAResume = ({
  open,
  onOpenChange,
  resumeTemplate,
}: DeleteResumeProps) => {
  const { toast } = useToast();

  const utils = api.useUtils();
  const deleteItemMutation = api.resumes.delete.useMutation({
    onSuccess: () => {
      toast({ title: "Currículo deletado com sucesso!" });
      void utils.resumes.list.invalidate();
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Excluindo o currículo você perde todo o histórico de edições, tire
            um tempo pra pensar sobre as implicações disso. Caso tenha certeza
            clique em confirmar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteItemMutation.mutate(resumeTemplate!.id);
            }}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
