import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { userscript } from 'userscript-config';
import { defineConfig } from 'vite';
import monkey, { cdn, util } from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        ...userscript,
        name: {
          '': '原神Wiki辅助工具',
          en: 'op wiki tool',
        },
        namespace: 'https://dev.songe.li',
        icon: 'https://dev.songe.li/favicon.svg',
        description: '原神 Wiki 辅助工具, 1.显示/隐藏已完成成就',
        updateURL:
          'https://cdn.jsdelivr.net/gh/lisonge/op-wiki-plus@main/dist/op-wiki-plus.user.js',
        include: ['https://wiki.biligame.com/ys/*'],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js').concat(
            await util.fn2dataUrl(() => {
              // @ts-ignore
              window.Vue = Vue;
            }),
          ),
          'naive-ui': cdn.jsdelivr('naive', 'dist/index.prod.js'),
          lodash: cdn.jsdelivr('_', 'lodash.min.js'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
