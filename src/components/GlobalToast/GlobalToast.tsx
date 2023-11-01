import { toast } from "react-toastify";

export const GlobalToast = (message: string): void => {
  toast(message);
};
