import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
import { userscript } from 'userscript-config';
import fs from 'node:fs/promises';
import type PrettierPkgR from 'prettier/package.json';

const prettierPkg: typeof PrettierPkgR = JSON.parse(
  (await fs.readFile('../../node_modules/prettier/package.json')).toString(
    'utf-8',
  ),
);
const pkgBaseUrl = 'https://unpkg.com/pkg-cdn/dist/';

const prettierCdn = (pkg: string) => {
  return [
    `prettierPlugins.${pkg}`,
    `https://cdn.jsdelivr.net/npm/prettier@${prettierPkg.version}/parser-${pkg}.js`,
  ] as [string, string];
};

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        ...userscript,
        icon: 'https://vitejs.dev/logo.svg',
        name: 'v2ex评论markdown支持',
        description: 'v2ex评论markdown支持;代码语法高亮;代码自动格式化',
        namespace: 'https://github.com/lisonge',
        match: ['https://v2ex.com/t/*', 'https://www.v2ex.com/t/*'],
      },
      build: {
        externalGlobals: {
          'markdown-it': cdn.jsdelivr('markdownit', 'dist/markdown-it.min.js'),
          'highlight.js': [
            'hljs',
            (version) => {
              return `https://unpkg.com/@highlightjs/cdn-assets@${version}/highlight.min.js`;
            },
          ],
          prettier: cdn.jsdelivr('prettier', 'standalone.js'),
          'prettier/parser-babel': prettierCdn('babel'),
          'prettier/parser-yaml': prettierCdn('yaml'),
          'prettier/parser-postcss': prettierCdn('postcss'),
          'prettier/parser-html': prettierCdn('html'),
          'prettier-plugin-java': [
            'PrettierPluginJava',
            (version) => {
              return `${pkgBaseUrl}prettier-plugin-java/v${version}.umd.js`;
            },
          ],
        },
      },
    }),
  ],
});
