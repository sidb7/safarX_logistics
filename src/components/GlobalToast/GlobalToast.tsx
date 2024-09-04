import { toast } from "react-hot-toast";

export const GlobalToast = (message: string): void => {
  if (message === "Order in processing") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

export const GlobalToastSuccess = (message: string): void => {
  toast.success(message);
};
