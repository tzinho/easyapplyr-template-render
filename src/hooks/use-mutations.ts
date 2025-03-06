import { toast } from "sonner";
import { api } from "~/trpc/react";

export const useMutations = ({
  name,
  modelName,
}: {
  name: string;
  modelName: string;
}) => {
  const mutationToggle = api[name].toogleAppear.useMutation({
    onSuccess: (data, variables) =>
      toast.success(
        `A ${modelName} será ${variables.appear ? "mostrada" : "escondida"} no curriculo`,
      ),
  });

  const mutationCreate = api[name].create.useMutation({
    onSuccess: () =>
      toast.success(`A ${modelName} foi adicionada com sucesso!`),
  });

  const mutationUpdate = api[name].update.useMutation({
    onSuccess: () =>
      toast.success(`A ${modelName} foi atualizada com sucesso!`),
  });

  const mutationDelete = api[name].delete.useMutation({
    onSuccess: () => toast.success(`A ${modelName} foi deletada com sucesso!`),
  });

  const mutationChangeOrder = api[name].changeOrder.useMutation({
    onSuccess: () =>
      toast.success(`A ordem das ${modelName}s alterada com sucesso!`),
  });

  return {
    mutationToggle,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    mutationChangeOrder,
  };
};
