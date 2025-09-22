import CredentialBlocks from "@/components/CredBlocks/CredentialBlocks";
import Cred from "../cred.json";
import { useAuth } from "@/components/AuthContext";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  return <CredentialBlocks credentials={Cred} />;
}