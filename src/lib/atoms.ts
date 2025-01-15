import { atom } from "jotai";

type Theme = "light" | "dark";
type ViewAs = "techy" | "layman";

const themeAtom = atom<Theme>("light");
const toggleThemeAtom = atom(null, (get, set) => {
  const newTheme = get(themeAtom) === "light" ? "dark" : "light";
  set(themeAtom, newTheme);
  if (localStorage) {
    localStorage.setItem("kcd-theme", newTheme);
  }
});

const viewAsAtom = atom<ViewAs>("techy");
const updateViewAsAtom = atom(null, (get, set, val: ViewAs) => {
  set(viewAsAtom, val);
  if (localStorage) {
    localStorage.setItem("kcd-viewas", val);
  }
});


export { themeAtom, toggleThemeAtom, viewAsAtom, updateViewAsAtom };
