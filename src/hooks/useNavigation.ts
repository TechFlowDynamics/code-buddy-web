// hooks/useNavigate.ts
"use client";

import { useRouter } from "next/navigation";

// hooks/useNavigate.ts

// hooks/useNavigate.ts

// hooks/useNavigate.ts

// hooks/useNavigate.ts

const useNavigate = () => {
  const router = useRouter();

  const navigate = (url: string) => {
    router.push(url);
  };

  return navigate;
};

export default useNavigate;
