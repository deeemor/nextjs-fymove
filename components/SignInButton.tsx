"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ToggleLeft as Google } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: true
      });
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      variant="outline"
      className="w-full bg-white hover:bg-gray-50 text-gray-700"
    >
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          <Google className="w-5 h-5 mr-2" />
          <span>Google</span>
        </>
      )}
    </Button>
  );
}