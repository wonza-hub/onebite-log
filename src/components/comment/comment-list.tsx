import CommentItem from "@/components/comment/comment-item";
import { useCommentsData } from "@/hooks/queries/use-comments-data";
import Fallback from "@/components/fallback";
import Loader from "@/components/loader";

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    isPending: isCommentsPending,
    error: fetchCommentsError,
  } = useCommentsData({ postId });

  if (fetchCommentsError) return <Fallback />;
  if (isCommentsPending) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
