import {
  IconAlertHexagonFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          default: "!flex !gap-4 font-base",
          title: "!font-bold font-base",
          description: "!font-medium font-base capitalize",
        },
      }}
      icons={{
        success: <IconCircleCheckFilled />,
        error: <IconAlertHexagonFilled />,
      }}
      richColors
      {...props}
    />
  );
};

export { Toaster };
