import { render } from 'preact';
import { App } from './App';
import { getPackageMeta } from './util';

(() => {
  const { name } = getPackageMeta();
  const box = document.querySelector<HTMLElement>(
    `span[title="${name}"]`
  )?.parentElement;
  if (!box) {
    console.warn('npmjs-explore inject failed');
    return;
  }
  const container = document.createElement('div');
  box.appendChild(container);
  render(<App />, container);
})();
