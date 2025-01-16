import { useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import debounce from "debounce";
import useDeepCompareEffect from "use-deep-compare-effect";

export const AutoSave = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void> | void;
}) => {
  const methods = useFormContext();

  const debouncedSave = useCallback(
    () =>
      debounce(() => {
        console.log("Saving");
        void methods.handleSubmit(onSubmit)();
      }, 1000),
    [methods, onSubmit],
  );

  const watchedData = useWatch({
    control: methods.control,
    defaultValue: defaultValues,
  });

  useDeepCompareEffect(() => {
    console.log("Triggered");
    if (methods.formState.isDirty && methods.formState.) {
      console.log("Saving isDirty");
      debouncedSave();
    }
  }, [watchedData]);

  return <div>AutoSave</div>;
};
