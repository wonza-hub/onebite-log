import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

/**
 * LAYOUT: 게스트 전용
 */
export default function GuestOnlyLayout() {
  const session = useSession();
  // 인증이 완료되어 세션이 이미 존재할 경우, 인증된 사용자만 접근 가능한 페이지로 리다이렉션
  if (session) return <Navigate to={"/"} replace={true} />;

  return <Outlet />;
}
