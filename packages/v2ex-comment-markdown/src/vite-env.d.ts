/// <reference types="vite/client" />

/**
 * alias of vite-plugin-monkey/dist/client
 */
declare module '$' {
  export * from 'vite-plugin-monkey/dist/client';
}

declare module 'prettier-plugin-java' {
  import type { Plugin } from 'prettier';
  const parserJava: Plugin;
  export default parserJava;
}
