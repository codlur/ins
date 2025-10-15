"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the post creation page by default
    router.replace("/app/create/post");
  }, [router]);

  return null;
}
