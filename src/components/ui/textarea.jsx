import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ id, label, className, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="font-medium text-sm">
        {label}
      </label>
      <textarea
        id={id}
        data-slot="textarea"
        className={cn(
          "border-accent/50 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Textarea };
