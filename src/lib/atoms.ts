import { atom } from "jotai";

// TODO: Update initial value to check local storage
const themeAtom = atom<"light" | "dark">("light");
const toggleThemeAtom = atom(null, (get, set) => {
  set(themeAtom, get(themeAtom) === "light" ? "dark" : "light");
});

export { themeAtom, toggleThemeAtom };
