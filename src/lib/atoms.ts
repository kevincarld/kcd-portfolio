import { atom } from "jotai";

const themeAtom = atom<"light" | "dark">("light");
const toggleThemeAtom = atom(null, (get, set) => {
  set(themeAtom, get(themeAtom) === "light" ? "dark" : "light");
});

export { themeAtom, toggleThemeAtom };
