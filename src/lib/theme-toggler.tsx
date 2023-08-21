"use client";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/lib/atoms";

export default function ThemeToggler({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeMode = useAtomValue(themeAtom);
  return (
    <html className={themeMode} lang="en">
      {children}
    </html>
  );
}
