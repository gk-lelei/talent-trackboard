
import { toast } from "sonner";

export const toastService = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
  info: (message: string) => {
    toast.info(message);
  },
  warning: (message: string) => {
    toast.warning(message);
  }
};

export default toastService;
