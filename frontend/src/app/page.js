"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function HeroPage() {
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "blue");
    document.documentElement.classList.add(theme);
  }, [theme]);

  async function RegisterAction() {
    if (isSignedIn) {
      router.push("/portal");
    } else {
      router.push("/sign-in?redirect_url=/portal");
    }
  }

  return (
    <div className="flex gap-2 mt-4">

      <Button variant="outline" className="cursor-pointer" onClick={ () => {RegisterAction()}}>Register</Button>
      <button
        className="px-3 py-1 rounded bg-primary text-background"
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className="px-3 py-1 rounded bg-primary text-background"
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
      <button
        className="px-3 py-1 rounded bg-primary text-background"
        onClick={() => setTheme("blue")}
      >
        Blue
      </button>

      <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary">Theme Switching</h1>
        <p className="mt-2">This text changes when you switch themes.</p>
      </div>
    </div>
  );
}
