import type { TPost } from "@/types";
import { Button } from "../ui/button";
import { useOpenEditPostModal } from "@/store/post-editor-modal";

/**
 * COMPONENT: 포스트 수정 시도 버튼
 */
export default function EditPostButton(props: TPost) {
  const { id, content, image_urls } = props;

  const openEditPostModal = useOpenEditPostModal();

  const handleButtonClick = () => {
    openEditPostModal({
      postId: id,
      content,
      imageUrls: image_urls,
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleButtonClick}
    >
      수정
    </Button>
  );
}
