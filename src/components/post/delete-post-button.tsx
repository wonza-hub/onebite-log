import { useOpenAlertModal } from "@/store/alert-modal";
import { Button } from "../ui/button";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function DeletePostButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();
  const navigate = useNavigate();

  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onError: (error) => {
      toast.error("포스트 삭제에 실패했습니다.", {
        position: "top-center",
      });
    },
    onSuccess: () => {
      // 사용자를 초기 페이지로 리다이렉션 시키고, 토스트 메시지 표시
      const pathname = window.location.pathname;
      if (pathname.includes("/post/")) {
        navigate("/", { replace: true });
      }
      toast.success("포스트 삭제에 성공했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleDeletePost = () => {
    openAlertModal({
      title: "포스트 삭제",
      description:
        "삭제된 포스트는 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?",
      onPositive: () => {
        deletePost(id);
      },
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      disabled={isDeletePostPending}
      onClick={handleDeletePost}
    >
      삭제
    </Button>
  );
}
