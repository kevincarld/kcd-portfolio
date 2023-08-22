import { atom } from "jotai";

type Theme = "light" | "dark";

const themeAtom = atom<Theme>("light");
const toggleThemeAtom = atom(null, (get, set) => {
  const newTheme = get(themeAtom) === "light" ? "dark" : "light";
  set(themeAtom, newTheme);
  if (localStorage) {
    localStorage.setItem("kcd-theme", newTheme);
  }
});

export { themeAtom, toggleThemeAtom };
