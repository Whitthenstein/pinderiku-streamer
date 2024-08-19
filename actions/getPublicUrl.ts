import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getPublicUrl = (bucket: string, path: string): string => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const {
    data: { publicUrl }
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
};

export default getPublicUrl;
