import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

/**
 * LAYOUT: 회원 전용
 */
export default function MemberOnlyLayout() {
  const session = useSession();
  // 세션 정보가 없는 경우, 로그인 페이지로 리다이렉션
  if (!session) return <Navigate to={"/sign-in"} replace={true} />;

  return <Outlet />;
}
