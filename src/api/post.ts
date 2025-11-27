import supabase from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PostEntity } from "@/types";

export async function fetchPosts({ from, to }: { from: number; to: number }) {
  // 포스트, 프로필 테이블을 조인
  const { data, error } = await supabase
    .from("post")
    // 프로필 테이블에서 author_id와 일치하는 모든 행을 author라는 이름으로 조회
    .select("*, author: profile!author_id (*)")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
}

export async function fetchPostById(postId: number) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*)")
    .eq("id", postId)
    .single();

  if (error) throw error;
  return data;
}

export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  // 새로운 포스트 생성
  const post = await createPost(content);
  if (images.length === 0) return post;

  // 이미지도 첨부한 경우 처리
  try {
    // 이미지 업로드 후 반환값으로 public url 얻음
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExt = image.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${userId}/${post.id}/${fileName}`;

        return uploadImage({
          file: image,
          filePath,
        });
      }),
    );

    // 포스트 테이블 갱신
    const updatedPost = await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });

    return updatedPost;
  } catch (error) {
    // 이미지 업로드 중 에러 발생 시 해당 포스트 삭제 처리
    await deletePost(post.id);
    throw error;
  }
}

export async function togglePostLike({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  const { data, error } = await supabase.rpc("toggle_post_like", {
    p_post_id: postId,
    p_user_id: userId,
  });

  if (error) throw error;
  return data;
}
