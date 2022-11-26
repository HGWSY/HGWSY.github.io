const TeXLogoPatternH1 =
/((?:e|pdf|Xe|Lua|p|up|Ap)*(?:La)*TeX[3e]*|(?:\(La\)|Bib|C|LuaHB|Mac|MiK)TeX|ConTeXt|2e)/g;
const TeXLogoPattern = new RegExp(`\\\$\\\\+${TeXLogoPatternH1.source}\\\$`, 'g');
updatePunctLogo();
function updatePunctLogo() {
const span = (className, e) => `<span class="${className}">${e}</span>`;
const TEX   = `T${span('e', 'e')}X`;
const LA    = `L${span('a', 'a')}`;
const LATEX = LA + TEX;
const E_    = `${span('epsilon', '&epsilon;')}${span('rkern', '-')}`;
const TWO_E = `2${span('two-e-epsilon', '&epsilon;')}`;
const LOGO  = {
  'TeX':      TEX,
  'LaTeX':    LATEX,
  'LaTeXe':   `${LATEX}&thinsp;${TWO_E}`,
  'LaTeX3':   `${LATEX}3`,
  '(La)TeX':  `${span('rkern', '(')}${LA}${span('rparen-kern', ')')}${TEX}`,
  'ConTeXt':  `Co${span('rkern', 'n')}&shy;${TEX}t`,
  'eTeX':     `${E_}${TEX}`,
  'pdfTeX':   `pdf&shy;${TEX}`,
  'pdfLaTeX': `pdf&shy;${LATEX}`,
  'XeTeX':    `X&#x2060;${span('xe-e xe-e-kern', 'e')}&#x2060;${TEX}`,
  'XeLaTeX':  `X&#x2060;${span('xe-e', 'e')}${LATEX}`,
  'LuaTeX':   `Lu${span('rkern', 'a')}&shy;${TEX}`,
  'LuaHBTeX': `LuaHB&shy;${TEX}`,
  'LuaLaTeX': `Lua&shy;${LATEX}`,
  'pTeX':     `${span('rkern', 'p')}${TEX}`,
  'pLaTeX':   `p${LATEX}`,
  'upTeX':    `u${span('rkern', 'p')}&shy;${TEX}`,
  'upLaTeX':  `up&shy;${LATEX}`,
  'ApTeX':    `A${span('rkern', 'p')}&shy;${TEX}`,
  'BibTeX':   `B${span('bib-ib rkern', 'ib')}${TEX}`,
  'CTeX':     `C${TEX}`,
  'MacTeX':   `Ma${span('rkern', 'c')}&shy;${TEX}`,
  'MiKTeX':   `MiK&shy;${TEX}`,
  '2e':       TWO_E,
};
const replacePunct = (str) =>
  str .replace(/(——|……)/g, span('zh-punct', '$1'))
      .replace(/([）』」》〉】])([，、：；。！？（『「《〈【])/g,
          span('zh-punct-kern', '$1') + '$2')
      .replace(/([，、：；。！？])([（『「《〈【])/g,
          span('zh-punct-kern', '$1') + '$2')
      .replace(/([，、：；。！？）』」》〉】])(<sup)/g,
          span('zh-punct-kern', '$1') + '$2')
      .replace(/([，、：；。！？）』」》〉】])(<a href=".+">[（『「《〈【])/g,
          span('zh-punct-kern', '$1') + '$2')
      .replace(/^([（『「《〈【])/g,
          span('zh-punct-bound', '$1'))
      .replace(/(\^<\/a><\/span><a href=".+">|<li>)([（『「《〈【])/g,
          '$1' + span('zh-punct-bound', '$2'))
      // No-break thin space
      // `\<space>` -> `\u2060\u2009\u2060`
      // U+2060: Word joiner, U+2009: Thin space
      .replace(/\\ /g, '\u2060\u2009\u2060');
const replaceLogo = (str) =>
  str.replace(TeXLogoPattern, (_, name) => span('tex-logo', LOGO[name]));
const replaceLogoH1 = (str) =>
  str.replace(TeXLogoPatternH1, (_, name) => span('tex-logo', LOGO[name]));
document.querySelectorAll('h2, h3, h4, p, li, figcaption, td, th').forEach((e) =>
  e.innerHTML = replacePunct(replaceLogo(e.innerHTML)));
document.querySelectorAll('h1, .post-navigation').forEach((e) =>
  e.innerHTML = replacePunct(replaceLogoH1(e.innerHTML)));
}
