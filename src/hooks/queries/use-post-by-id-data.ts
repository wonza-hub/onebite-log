import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById(postId),
    // enabled: false,
    // enabled를 무조건 false로 설정하면 쿼리가 실행되지 않음
    // type에 따라 쿼리를 실행할 수 있도록 설정
    enabled: type === "FEED" ? false : true,
  });
}
