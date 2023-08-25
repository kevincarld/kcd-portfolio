import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { sanitize as serverSanitize } from "isomorphic-dompurify";
import { sanitize } from "dompurify";

import { parse } from "marked";
import htmlParser from "html-react-parser";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseMarkdown(md: string | undefined | null) {
  if (!md) return "";
  let sanitized = null;

  if (typeof window === "undefined") {
    sanitized = serverSanitize(parse(md));
  } else {
    sanitized = sanitize(parse(md), { USE_PROFILES: { html: true } });
  }
  return htmlParser(sanitized);
}

export function slugifier(str: string | undefined | null) {
  if (!str) return "";
  const withoutUnderscores = str.replace(/_/g, " ");
  return slugify(withoutUnderscores, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "en", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
}
