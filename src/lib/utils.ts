import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { sanitize } from "isomorphic-dompurify";
import { parse } from "marked";
import htmlParser from "html-react-parser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseMarkdown(md: string) {
  return htmlParser(sanitize(parse(md)));
}
