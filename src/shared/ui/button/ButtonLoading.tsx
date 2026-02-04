import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/classNames";
import { Button, type ButtonProps } from "./Button";

interface ButtonLoadingProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export const ButtonLoading = React.forwardRef<
  HTMLButtonElement,
  ButtonLoadingProps
>(
  (
    { isLoading, loadingText, children, className, disabled, ...props },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn("relative", className)}
        {...props}
      >
        <span>{children}</span>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-md">
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText && <span className="ml-2 text-sm">{loadingText}</span>}
          </div>
        )}
      </Button>
    );
  },
);

ButtonLoading.displayName = "ButtonLoading";
