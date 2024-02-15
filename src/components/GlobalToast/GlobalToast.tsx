import { toast } from "react-hot-toast";

export const GlobalToast = (message: string): void => {
  toast.error(message);
};
