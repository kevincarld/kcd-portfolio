"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { FiSun, FiMoon } from "react-icons/fi";
import { useSetAtom, useAtomValue } from "jotai";
import { themeAtom, toggleThemeAtom } from "@/lib/atoms";

const Switch = () => {
  const themeMode = useAtomValue(themeAtom);
  const toggleTheme = useSetAtom(toggleThemeAtom);

  return (
    <SwitchPrimitives.Root
      className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 dark:data-[state=checked]:bg-slate-600 dark:data-[state=unchecked]:bg-slate-800"
      onCheckedChange={toggleTheme}
      aria-label="toggle light or dark mode"
    >
      <SwitchPrimitives.Thumb className="pointer-events-none flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-slate-950">
        {themeMode === "light" ? (
          <FiMoon className="text-slate-950 h-4 w-4 dark:text-slate-50" />
        ) : (
          <FiSun className="text-slate-950 h-4 w-4 dark:text-slate-50" />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
};
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
