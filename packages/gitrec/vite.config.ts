import { userscript } from 'userscript-config';
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        ...userscript,
        name: `GitRec`,
        description: `A recommender system for GitHub repositories based on Gorse`,
        icon: `https://gitrec.gorse.io/logo.png`,
        downloadURL: `https://github.com/lisonge/userscripts/raw/main/packages/gitrec/dist/gitrec.user.js`,
        match: ['*://github.com/*'],
        connect: [`gitrec.gorse.io`],
      },
      build: {
        externalGlobals: {
          jquery: cdn.jsdelivr('$', 'dist/jquery.min.js'),
        },
      },
    }),
  ],
});
