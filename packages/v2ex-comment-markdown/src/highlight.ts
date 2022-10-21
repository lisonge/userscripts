import hljs from 'highlight.js';

export const highlight = (str: string, lang: string) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(str, { language: lang }).value;
    } catch (__) {}
  }
  return str;
};
