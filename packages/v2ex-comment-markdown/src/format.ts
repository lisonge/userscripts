import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import parserHtml from 'prettier/parser-html';
import parserPostcss from 'prettier/parser-postcss';
import parserYaml from 'prettier/parser-yaml';
import parserJava from 'prettier-plugin-java';
import type { BuiltInParserName, Plugin } from 'prettier';

// console.log(prettier.getSupportInfo().languages);

const plugins: Plugin[] = [
  parserBabel,
  parserYaml,
  parserHtml,
  parserPostcss,
  parserJava,
];

const lang2parser: Record<string, BuiltInParserName> = {
  js: 'babel',
  jsx: 'babel',
  ts: 'babel-ts',
  tsx: 'babel-ts',
  json: 'json',
  json5: 'json5',
  html: 'html',
  vue: 'vue',
  scss: 'scss',
  css: 'css',
  less: 'less',
};
Object.assign(lang2parser, {
  java: 'java',
});

export const format = (code: string, lang: string) => {
  if (lang2parser[lang]) {
    try {
      return prettier.format(code, {
        parser: lang2parser[lang],
        plugins,
      });
    } catch {}
  }
  return code;
};
