import preact from '@preact/preset-vite';
import { userscript } from 'userscript-config';
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    preact(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        ...userscript,
        name: {
          zh: 'npmjs文件查看',
        },
        description: `npmjs-explore/npmjs文件查看`,
        icon: `https://static.npmjs.com/7a7ffabbd910fc60161bc04f2cee4160.png`,
        match: ['https://www.npmjs.com/package/*'],
        include: [/^https:\/\/www.npmjs.com\/package\/.*/],
      },
      build: {
        externalGlobals: {
          preact: cdn.jsdelivr('preact'),
        },
      },
    }),
  ],
});
