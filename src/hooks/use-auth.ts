import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

export const useSelectorUser = () => {
  return useSelector((state: RootState) => state.user.user);
};
