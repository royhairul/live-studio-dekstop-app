import * as React from "react";

import { cn } from "@/lib/utils";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Input = React.forwardRef(
  ({ className, id, type, label, icon, ...props }, ref) => {
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        <label htmlFor={id} className="text-sm font-medium text-secondary">
          {label}
        </label>
        <div className="relative w-full ">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            data-slot="input"
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              icon && "px-10",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
              "border-[1.5px] border-secondary/20",
              className
            )}
            {...props}
          />
          {isPassword && (
            <Button
              className="bg-transparent hover:bg-transparent absolute right-3 top-1/2 -translate-y-1/2 text-black"
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

export { Input };
