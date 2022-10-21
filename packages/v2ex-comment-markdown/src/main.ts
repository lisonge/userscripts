import markdownit from 'markdown-it';
import './style.scss';

import { format } from './format';
import { highlight } from './highlight';

const markdownItInstance = markdownit({
  highlight(str, lang) {
    lang = lang.toLowerCase();
    str = format(str, lang);
    return highlight(str, lang);
  },
  breaks: true,
});

(() => {
  const blankReg = /[\n\r]+/g;
  Array.from(
    document.querySelectorAll<HTMLElement>('div.reply_content')
  ).forEach((div) => {
    const mdText = div.innerText;
    if (
      mdText.includes('https://gist.github.com/') &&
      mdText.includes('显示 Gist 代码')
    ) {
      return;
    }
    const article = document.createElement('article');
    article.classList.add('markdown-body');
    article.innerHTML = markdownItInstance.render(mdText);
    if (
      article.innerText.replace(blankReg, '') == mdText.replace(blankReg, '')
    ) {
      // 渲染后无变化不执行替换
      return;
    }
    article.style.width = '100%';
    div.innerHTML = '';
    div.classList.add('v2ex-comment-markdown');
    div.appendChild(article);
  });
})();
