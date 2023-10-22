// pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, []);

  return null; // This page is empty since it's only for redirection.
};

export default Index;
