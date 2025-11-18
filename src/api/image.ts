import { BUCKET_NAME } from "@/lib/constants";
import supabase from "@/lib/supabase";

/**
 * API: 업로드된 단건 이미지에 대해 파일과 파일 경로를 스토리지에 저장
 * @param file 파일
 * @param filePath 파일명
 * @returns 외부 접근 가능 public url
 */
export async function uploadImage({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) throw error;

  // 이미지에 접근 가능한 주소 추출 후 반환
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
}
