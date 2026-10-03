/* One local outline icon set, including content rendered from admin data. */
(function () {
  const paths = {
    bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7z"/>',
    sparkle: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>',
    wand: '<path d="m4 20 12-12 4 4L8 24M14 10l4 4M5 3v4M3 5h4M18 2v4M16 4h4" transform="translate(0 -2)"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.5 1.5 0 0 1 1-2.8h2A4 4 0 0 0 21 10a9 9 0 0 0-9-7Z"/><circle cx="7" cy="10" r=".7"/><circle cx="11" cy="7" r=".7"/><circle cx="16" cy="8" r=".7"/>',
    film: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M7 12h10"/>',
    chart: '<path d="M4 3v17h17M9 15v-4M14 15V7M19 15V4"/>',
    music: '<path d="M9 18V5l11-2v13M9 9l11-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="17" cy="16" rx="3" ry="3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12a20 20 0 0 0 18 0M12 11v4"/>',
    chat: '<path d="M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z"/><path d="M8 9h8M8 13h5"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
    folder: '<path d="M3 7V4h6l3 3h9v13H3Z"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9Z"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4M10 5h4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    bot: '<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M9 12v2M15 12v2M9 17h6M1 11v5M23 11v5"/>',
    settings: '<path d="m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/>'
  };
  const names = {'⚙':'settings','⚡':'bolt','🪄':'wand','🎨':'palette','🎬':'film','🎞':'film','✨':'sparkle','✦':'sparkle','📊':'chart','🎵':'music','✉':'mail','💼':'briefcase','💬':'chat','✅':'check','📍':'pin','🗂':'folder','🖼':'image','⭐':'star','📱':'phone','🎯':'target','🔍':'search','🤖':'bot'};
  const pattern = new RegExp('(' + Object.keys(names).join('|') + ')[\\uFE0E\\uFE0F]?', 'gu');
  function replace(root) {
    if (root.nodeType === 1 && root.closest('script,style,svg,textarea,input,[contenteditable]')) return;
    if (root.nodeType === 1) {
      [root, ...root.querySelectorAll('[alt],[title],[aria-label],[placeholder]')].forEach(element => {
        ['alt','title','aria-label','placeholder'].forEach(name => {
          const value = element.getAttribute(name);
          if (value && value.includes('—')) element.setAttribute(name, value.replaceAll('—', '-'));
        });
      });
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = root.nodeType === 3 ? [root] : [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!node.parentElement || node.parentElement.closest('script,style,svg,textarea,input,[contenteditable]')) return;
      const text = node.nodeValue.replaceAll('—', '-');
      if (text !== node.nodeValue) node.nodeValue = text;
      const matches = [...text.matchAll(pattern)];
      if (!matches.length) return;
      const fragment = document.createDocumentFragment();
      let offset = 0;
      matches.forEach(match => {
        fragment.append(document.createTextNode(text.slice(offset,match.index)));
        const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('viewBox','0 0 24 24');
        svg.setAttribute('class','portfolio-icon');
        svg.setAttribute('aria-hidden','true');
        svg.setAttribute('focusable','false');
        svg.innerHTML = paths[names[match[1]]];
        fragment.append(svg);
        offset = match.index + match[0].length;
      });
      fragment.append(document.createTextNode(text.slice(offset)));
      node.replaceWith(fragment);
    });
  }
  const observer = new MutationObserver(records => {
    observer.disconnect();
    records.forEach(record => record.type === 'characterData' ? replace(record.target) : record.addedNodes.forEach(replace));
    observe();
  });
  function observe() {
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
    observer.observe(document.querySelector('title'),{childList:true,subtree:true,characterData:true});
  }
  replace(document.body);
  replace(document.querySelector('title'));
  observe();
})();
