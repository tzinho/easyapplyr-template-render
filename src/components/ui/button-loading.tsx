import { LoaderCircle } from "lucide-react";
import { Button, type ButtonProps } from "./button";
import { cn } from "~/lib/utils";

interface ButtonLoadingProps extends ButtonProps {
  isLoading?: boolean;
}

export const ButtonLoading = ({
  isLoading,
  onClick,
  children,
  className,
  ...props
}: ButtonLoadingProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      data-loading={isLoading}
      className={cn("group relative disabled:opacity-100", className)}
      {...props}
    >
      <span className="group-data-[loading=true]:text-transparent">
        {children}
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle
            className="animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      )}
    </Button>
  );
};
