import { toast } from "react-hot-toast";

export const GlobalToast = (message: string): void => {
  toast.error(message);
};

export const GlobalToastSuccess = (message: string): void => {
  toast.success(message);
};
