import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { HeaderMain } from "./header-main";
import { HeaderTop } from "./header-top";
import AutoBreadcrumb from "@/components/_common/breadcrumbs";

export function Header() {
  const user = useSelector((state: RootState) => state.user!.user);

  return (
    <>
      {/* <div className="bg-primary">
        <HeaderTop />
      </div> */}
      <div className="sticky top-0 z-10 w-full shadow-md">
        <HeaderMain user={user} />
      </div>
    </>
  );
}
