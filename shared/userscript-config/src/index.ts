import type { MonkeyUserScript } from 'vite-plugin-monkey';

export const userscript: MonkeyUserScript = {
  namespace: `https://github.com/lisonge`,
  author: `lisonge`,
  homepageURL: `https://github.com/lisonge/userscripts`,
  source: `https://github.com/lisonge/userscripts`,
  license: `MIT`,
};

export const delay = async (n = 0) => {
  await new Promise<void>((res) => {
    setTimeout(res, n);
  });
};
