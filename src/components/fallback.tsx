import { TriangleAlert } from "lucide-react";

/**
 * COMPONENT: 폴백
 */
export default function Fallback() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
      <TriangleAlert />
      <div>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
    </div>
  );
}
