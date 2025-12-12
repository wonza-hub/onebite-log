import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchPosts } from "@/api/post";
import { useSession } from "@/store/session";

const PAGE_SIZE = 5;
export function useInfinitePostsData() {
  const queryClient = useQueryClient();
  const session = useSession();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const posts = await fetchPosts({ from, to, userId: session!.user.id });
      // 각 게시물에 대한 캐시 정규화를 수행
      // 이후 피드에 나타난 목록은 캐시된 데이터를 사용하도록 설정
      posts.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });

      return posts.map((post) => post.id);
    },
    initialPageParam: 0,
    // 새로운 페이지를 불러와야 할 때 호출
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    staleTime: Infinity,
  });
}
