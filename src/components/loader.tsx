import { LoaderCircleIcon } from "lucide-react";

/**
 * COMPONENT: 로딩 인디케이터
 */
export default function Loader() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-5">
      <LoaderCircleIcon className="animate-spin" />
      <div className="text-sm">데이터를 불러오는 중입니다.</div>
    </div>
  );
}
