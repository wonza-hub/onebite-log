import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL"; // 피드 목록 | 상세
}) {
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById({ postId, userId: session!.user.id }),
    // 데이터가 어느 페이지에서 사용될지 type에 따라 쿼리를 실행할지 여부 결정
    enabled: type === "FEED" ? false : true,
    staleTime: Infinity,
  });
}
