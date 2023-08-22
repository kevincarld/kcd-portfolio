"use client";
import { useAtom } from "jotai";
import { themeAtom } from "@/lib/atoms";
import { useEffect } from "react";

export default function ThemeToggler({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = useAtom(themeAtom);

  useEffect(() => {
    if (window !== undefined) {
      const theme = localStorage.getItem("kcd-theme");
      if (theme === "dark") {
        setThemeMode("dark");
      } else {
        setThemeMode("light");
      }
    }
  }, []);

  return (
    <html className={themeMode} lang="en">
      {children}
    </html>
  );
}
