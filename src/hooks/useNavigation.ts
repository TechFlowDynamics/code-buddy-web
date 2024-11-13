"use client";

import { useRouter } from "next/navigation";


const useNavigate = () => {
  const router = useRouter();

  const navigate = (url: string) => {
    router.push(url);
  };

  return navigate;
};

export default useNavigate;
