/* Local design preview, using the portfolio's existing data and project dialogs. */
(function () {
  const home = document.getElementById('page-home');
  const style = document.querySelector('link[href="karts-preview.css"]');
  document.head.append(style);
  const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const section = document.createElement('div');
  section.className = 'kd-home';
  home.append(section);
  const descriptions = {
    'autonakorfu-001': 'Korfu zaczyna się na długo przed podróżą. Dla AutoNaKorfu tworzę komunikację skierowaną do polskich turystów planujących pobyt na wyspie. Poradniki sezonowe, infografiki i treści o podróżowaniu łączą praktyczną wiedzę z ofertą wypożyczalni. Celem jest budowanie rozpoznawalności marki i ułatwienie klientom zaplanowania wyjazdu.',
    'smclegal-001': 'W komunikacji kancelarii prawnej najważniejsze są zrozumiały język i zaufanie. Dla SMC Legal przygotowuję treści oraz grafiki dotyczące oddłużania i restrukturyzacji. Materiały edukacyjne porządkują trudne zagadnienia, a komunikacja i kampanie leadowe zachęcają osoby potrzebujące wsparcia do kontaktu z kancelarią.',
    'comodivo-001': 'Dobre wnętrze zaczyna się od inspiracji. Dla Comodivo prowadzę komunikację w social mediach, łącząc prezentację mebli z treściami sprzedażowymi. Grafiki produktowe i publikacje promocyjne eksponują estetykę kolekcji oraz pomagają odbiorcom odnaleźć produkty pasujące do ich przestrzeni.',
    'lissy-001': 'Meble pokazane w kontekście, nie tylko w katalogu. Dla Lissy tworzę treści i grafiki do social mediów, które prezentują kolekcje, ich detale oraz możliwości aranżacyjne. Publikacje produktowe i promocyjne łączą inspirację wnętrzarską z czytelną informacją o ofercie marki.',
    'wallflow-001': 'Technologia, której możliwości najlepiej pokazać. Dla Wallflow przygotowuję komunikację dotyczącą drukarek ściennych UV i druku wielkoformatowego. Grafiki produktowe oraz treści edukacyjne wyjaśniają zastosowania druku i przedstawiają ofertę w sposób przystępny dla potencjalnych klientów.',
    'til-001': 'Podatki i księgowość bez zbędnego komplikowania. Dla Biura Rachunkowego TIL tworzę edukacyjne treści i grafiki o VAT, rozliczeniach oraz obowiązkach przedsiębiorców. Komunikacja ma przybliżać odbiorcom zagadnienia księgowe i budować zaufanie do wiedzy zespołu.',
    'azzuro-001': 'Od parametrów technicznych do przyjemności z jazdy. Dla Azzuro Bikes tworzę treści i grafiki prezentujące rowery elektryczne, modele e-MTB oraz rowery miejskie. Publikacje produktowe i materiały sprzedażowe pokazują wyposażenie, charakter i zastosowanie poszczególnych modeli.',
    'sufit-001': 'Sufit jako element całego wnętrza. Dla marki Samodzielny Sufit przygotowuję grafiki i treści prezentujące sufity napinane oraz rozwiązania z oświetleniem LED. Komunikacja łączy inspiracje aranżacyjne z edukacją produktową, pomagając odbiorcom poznać możliwości oferowanych rozwiązań.',
    'oxylion-001': 'Technologia bliżej codziennych potrzeb. Dla Oxylion prowadzę social media i tworzę komunikację nastawioną na budowanie zasięgów oraz rozpoznawalności marki. Treści i grafiki łączą ofertę operatora z przystępną edukacją o internecie i telewizji. Widoczna poniżej karuzela o IPTV to przykład publikacji przygotowanej w ramach szerszej współpracy.'
  };
  const coverIds = new Set(['autonakorfu-001', 'smclegal-001', 'comodivo-001', 'wallflow-001', 'lissy-001', 'til-001', 'azzuro-001', 'sufit-001', 'oxylion-001', 'profotoria-001', 'handlersi-001', 'radek-buslowicz-001', 'ekierownik-001', 'intervue-001']);
  const normalizeOriginal = normalizeProjects;
  normalizeProjects = projects => normalizeOriginal(projects).map(project => ({
    ...project, desc: descriptions[project.id] || project.desc,
    cover: coverIds.has(project.id) ? `assets/covers/${project.id}.webp` : project.images?.[0]
  }));
  const coverScopes = {
    'autonakorfu-001': 'Social media, karuzele i rolki dla wypożyczalni.',
    'smclegal-001': 'Social media, kampanie leadowe i wideo z postacią AI.',
    'comodivo-001': 'Prowadzenie social mediów i kreacje produktowe.',
    'wallflow-001': 'Social media, rolki i kreacje wideo do Meta Ads.',
    'lissy-001': 'Content do social mediów i grafiki promocyjne.',
    'til-001': 'Treści edukacyjne i grafiki do social mediów.',
    'azzuro-001': 'Content produktowy i kreacje reklamowe rowerów.',
    'sufit-001': 'Grafiki produktowe i treści edukacyjne o wnętrzach.',
    'oxylion-001': 'Prowadzenie social mediów i komunikacja oferty.',
    'profotoria-001': 'Działania marketingowe, social media i kampanie Meta Ads.',
    'handlersi-001': 'Social media, karuzele produktowe i produkcja rolek.',
    'radek-buslowicz-001': 'Social media, content i grafiki sprzedażowe.',
    'ekierownik-001': 'Działania marketingowe, social media i materiały wideo.',
    'intervue-001': 'Marketing, social media, współpraca z twórcami i zarządzanie projektem.'
  };
  function coverContents(p) {
    const name = p.id === 'sufit-001' ? 'Samodzielny Sufit' : p.id === 'radek-buslowicz-001' ? 'Radek Buslowicz' : p.client || p.title;
    const alt = p.id === 'til-001' ? 'Ilustracja fotograficzna AI na podstawie materiałów Biura Rachunkowego TIL' : name;
    const scope = coverScopes[p.id] || (p.tags || []).slice(0, 3).join(' · ') || p.category;
    const responsive = p.cover ? ` srcset="${escape(p.cover.replace('.webp', '-480.webp'))} 480w, ${escape(p.cover.replace('.webp', '-800.webp'))} 800w, ${escape(p.cover)} 1600w" sizes="(max-width: 700px) 94vw, (max-width: 1400px) 46vw, 640px"` : '';
    return `<img src="${escape(p.cover || p.images?.[0])}"${responsive} alt="${escape(alt)}" width="1600" height="1000" loading="lazy" decoding="async"><div class="kd-cover-copy"><h3>${escape(name)}</h3><p class="kd-cover-scope">${escape(scope)}</p></div><span class="kd-cover-arrow" aria-hidden="true">↗</span>`;
  }
  // Covers are separate assets: the original project galleries remain untouched.
  buildProjectCard = p => `<button type="button" class="project-card kd-cover-card fade-in" onclick="openProjectDetail('${escape(p.__key)}')" aria-label="Zobacz projekt ${escape(p.client || p.title)}">${coverContents(p)}</button>`;
  // Campaign outcomes require client reports; gallery counts are directly verifiable.
  getProjectStats = project => {
    if (project.reportedResults?.length) return project.reportedResults;
    if (project.galleryLayout === 'carousel' || project.videoOnly) return [];
    const count = (project.images || []).filter(Boolean).length;
    return count ? [{ number: String(count), label: 'materiałów w tej galerii' }] : [];
  };
  function serviceVisual(index) {
    const boards = [null,
      ['PLAN KAMPANII', 'Od celu do optymalizacji.', ['Cel i odbiorcy', 'Kreacja i komunikat', 'Testy reklam', 'Analiza i kolejne decyzje']],
      ['VIDEO & MOTION', 'Ruch z konkretnym celem.', ['Pomysł', 'Montaż', 'Dźwięk', 'Gotowy materiał']],
      ['PROCES PRACY', 'AI wspiera. Człowiek decyduje.', ['Brief i materiały', 'Wsparcie AI', 'Selekcja i redakcja', 'Kontrola jakości']]
    ];
    const board = boards[index];
    return `<div class="kd-process-board"><span class="kd-board-label">${board[0]}</span><h4>${board[1]}</h4><ol>${board[2].map((step,i)=>`<li><span>0${i+1}</span><strong>${step}</strong></li>`).join('')}</ol>${index === 2 ? '<a href="https://www.behance.net/gallery/247470919/Rolki" target="_blank" rel="noopener noreferrer">Obejrzyj rzeczywiste realizacje ↗</a>' : '<p>Schemat pracy, nie raport wyników.</p>'}</div>`;
  }
  function render(projects) {
    const ps = normalizeProjects(projects).filter(p => p.images && p.images.length);
    if (!ps.length) return;
    const pic = (i, j = 0) => escape(ps[i % ps.length].images[j % ps[i % ps.length].images.length]);
    const image = (i, j = 0) => `<img src="${pic(i,j)}" alt="${escape(ps[i % ps.length].title)}" loading="lazy">`;
    const services = [
      ['Social media & content', ['Prowadzenie profili marek','Grafiki, karuzele i copywriting','Spójna komunikacja i harmonogram'],0,2],
      ['Kampanie reklamowe', ['Meta Ads i Google Ads','Strategia, testy i optymalizacja','Raportowanie i analiza wyników'],4,3],
      ['Video & motion design', ['Rolki i materiały reklamowe','Montaż, animacje i postprodukcja','Content dopasowany do platformy'],1,5],
      ['AI & automatyzacje', ['Szybsza produkcja treści','Wsparcie analizy i researchu','Narzędzia dopasowane do procesu'],6,7]
    ];
    section.innerHTML = `
      <section class="kd-hero kd-width">
        <span class="kd-label">SZ YMON POPIOŁEK · MARKETING & DESIGN</span>
        <h1>Zwiększam <span>sprzedaż.</span><br>Buduję silniejsze <span>marki.</span></h1>
        <p>Łączę strategię, design i marketing. Tworzę komunikację, kampanie i treści, które pomagają markom przyciągać uwagę i rozwijać biznes.</p>
        <div class="kd-buttons"><button onclick="showPage('kontakt')">Porozmawiajmy o projekcie</button><button class="kd-outline" onclick="showPage('realizacje')">Zobacz realizacje</button></div>
        <p class="kd-proof">40+ projektów · 150+ kampanii · 1,5 mln zł obsłużonego budżetu</p>
        <div class="kd-clients">${ps.slice(0,6).map(p=>`<span>${escape(p.client || p.title.split('—')[0])}</span>`).join('')}</div>
        <button class="kd-showreel" onclick="showPage('realizacje')" aria-label="Otwórz portfolio"><span class="kd-reel-caption">WYBRANE REALIZACJE / 2026</span><strong>Pomysły.<br>Obrazy.<br><em>Efekty.</em></strong><div class="kd-reel-images">${image(0)}${image(2)}${image(4)}</div><span class="kd-reel-link">Odkryj portfolio ↗</span></button>
      </section>
      <section class="kd-dark">
        <div class="kd-intro kd-width"><span class="kd-label">KREATYWNOŚĆ SPOTYKA STRATEGIĘ</span><h2>Twój marketing.<br><span>Jeden zaangażowany partner.</span></h2><p>Od pierwszego pomysłu po gotową kampanię. Pomagam markom połączyć dobry design, wartościowy content i skuteczną reklamę w spójną całość.</p><button onclick="showPage('omnie')">Poznaj mnie</button></div>
        <div class="kd-feature kd-width"><div>${image(2)}${image(3)}</div><a href="https://www.behance.net/gallery/247470919/Rolki" target="_blank" rel="noopener"><span>VIDEO & REELS</span><h3>Historie, które<br>zatrzymują uwagę.</h3><span class="kd-play">↗</span><span>Zobacz rolki na Behance</span></a></div>
        <div class="kd-services kd-width"><span class="kd-label">W CZYM MOGĘ POMÓC</span><h2>Moje <span>usługi.</span></h2>${services.map((s,i)=>`<article class="kd-service kd-tone-${i}"><div class="kd-service-copy"><span class="kd-label">0${i+1} / SPECJALIZACJA</span><h3>${s[0]}</h3><ul>${s[1].map(x=>`<li>${x}</li>`).join('')}</ul><button onclick="showPage('uslugi')">Poznaj ofertę ↗</button></div>${i ? serviceVisual(i) : `<div class="kd-service-images">${image(s[2])}${image(s[3],1)}</div>`}</article>`).join('')}</div>
      </section>
      <section class="kd-work kd-width"><div class="kd-section-heading"><h2>Wybrane <span>projekty.</span></h2><button class="kd-outline" onclick="showPage('realizacje')">Wszystkie realizacje ↗</button></div><div class="kd-project-rail">${ps.map(p=>`<button class="kd-project kd-cover-card" data-key="${escape(p.__key)}">${coverContents(p)}</button>`).join('')}</div><div class="kd-rail-controls"><button data-scroll="-1" aria-label="Poprzednie projekty">←</button><span>Przewijaj i poznaj moje realizacje</span><button data-scroll="1" aria-label="Następne projekty">→</button></div></section>
      <section class="kd-numbers kd-width"><h2>Dobry design przyciąga.<br><span>Przemyślany marketing rozwija.</span></h2><div><article><strong>40+</strong><span>Zrealizowanych projektów</span></article><article><strong>150+</strong><span>Uruchomionych kampanii</span></article><article><strong>1,5 mln</strong><span>Zł obsłużonego budżetu</span></article></div></section>
      <section class="kd-faq kd-width"><span class="kd-label">FAQ</span><h2>Warto <span>wiedzieć.</span></h2>${[
        ['Jak zaczynamy współpracę?','Zaczynamy od rozmowy o Twojej marce, potrzebach i celu. Następnie ustalamy zakres, harmonogram i budżet działań.'],
        ['Czy mogę zamówić pojedynczą realizację?','Tak. Możemy porozmawiać o pojedynczym projekcie graficznym, rolce, kampanii lub stałej obsłudze marketingowej.'],
        ['Ile kosztuje współpraca?','Wycena zależy od zakresu, liczby materiałów i czasu potrzebnego na realizację. Opisz swój projekt, a przygotuję dopasowaną propozycję.'],
        ['Jak będę widzieć postępy?','Na początku ustalamy etapy i oczekiwane rezultaty. W trakcie współpracy omawiamy materiały, wyniki oraz kolejne działania.']
      ].map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</section>
      <section class="kd-final"><span class="kd-label">POROZMAWIAJMY O TWOJEJ MARCE</span><h2>Zróbmy razem<br><span>coś dobrego.</span></h2><button onclick="showPage('kontakt')">Zacznijmy współpracę ↗</button></section>`;
    section.querySelector('.kd-label').textContent = 'SZYMON POPIOŁEK · MARKETING & DESIGN';
    section.querySelectorAll('[data-key]').forEach(el=>el.addEventListener('click',()=>openProjectDetail(el.dataset.key)));
    section.querySelectorAll('[data-scroll]').forEach(el=>el.addEventListener('click',()=>section.querySelector('.kd-project-rail').scrollBy({left:Number(el.dataset.scroll)*section.querySelector('.kd-project-rail').clientWidth*.75,behavior:'smooth'})));
  }
  renderHomePreview = function(projects) { render(projects); };
  if (allProjects.length) render(allProjects);
  const projectPage = document.createElement('main');
  projectPage.id = 'page-case';
  projectPage.className = 'page kd-case';
  home.after(projectPage);
  const baseShowPage = showPage;
  const baseTitle = document.title;
  let returnPage = 'realizacje';
  let returnScroll = 0;

  function displayCase(key) {
    const p = projectLookup.get(key);
    if (!p) return false;
    const stats = getProjectStats(p);
    const images = p.videoOnly ? [] : (p.images || []).filter(src => /^(https?:|data:image\/|[^:]+$)/i.test(src));
    const next = allProjects[(allProjects.findIndex(item => item.__key === key) + 1) % allProjects.length];
    projectPage.innerHTML = `<div class="kd-case-inner">
      <a class="kd-case-back" href="#${returnPage}" data-return>← Wróć do realizacji</a>
      <h1 tabindex="-1">${escape(p.title)}</h1>
      <section class="kd-case-intro"><div class="kd-case-label">01 <span>O projekcie</span></div>
        ${p.desc ? `<p class="kd-case-lead">${escape(p.desc)}</p>` : ''}
        <dl class="kd-case-meta"><div><dt>Klient</dt><dd>${escape(p.client || p.title)}</dd></div><div><dt>Specjalizacja</dt><dd>${escape(p.category || 'Projekt kreatywny')}</dd></div>${p.tags && p.tags.length ? `<div><dt>Zakres współpracy</dt><dd>${p.tags.map(escape).join(' · ')}</dd></div>` : ''}</dl>
      </section>
      ${images.length ? `<section class="kd-case-gallery" aria-label="Galeria realizacji">${images.map((src,i)=>`<figure><button type="button" data-photo="${i}" aria-label="Powiększ zdjęcie ${i+1}"><img src="${escape(src)}" alt="${escape(p.title)} — materiał ${i+1}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></button><figcaption><span>${escape(p.client || p.title)}</span><span>${String(i+1).padStart(2,'0')} / ${String(images.length).padStart(2,'0')}</span></figcaption></figure>`).join('')}</section>` : ''}
      ${stats.length ? `<section class="kd-case-results"><div class="kd-case-label">02 <span>${p.reportedResults?.length ? 'Wyniki działań' : 'Prezentowane materiały'}</span></div><h2>${p.reportedResults?.length ? 'Efekty w liczbach.' : 'W tej galerii.'}</h2><div class="kd-case-stat-grid">${stats.map(s=>`<article><strong>${escape(s.number)}</strong><p>${escape(s.label)}</p></article>`).join('')}</div></section>` : ''}
      ${p.reel ? `<section class="kd-case-reel" aria-label="Rolka dla Profotorii"><div><span class="kd-label">VIDEO / SOCIAL MEDIA</span><h2>Marka w ruchu.</h2><p>Wybrana rolka przygotowana dla Profotorii jako część działań w social mediach.</p></div><figure><video controls playsinline preload="metadata" aria-label="Odtwórz rolkę Profotoria"><source src="${escape(p.reel)}" type="video/mp4">Twoja przeglądarka nie obsługuje tego filmu.</video><figcaption>Profotoria / Rolka do social mediów</figcaption></figure></section>` : ''}
      ${p.reels?.length ? `<section class="kd-reels-section"><span class="kd-label">WYBRANE ROLKI</span><h2>Materiały wideo.</h2><div class="kd-reels-grid">${p.reels.map((src,i)=>`<figure><video controls playsinline preload="none" aria-label="${escape(p.client)} - rolka ${i+1}"><source src="${escape(src)}" type="video/mp4"></video><figcaption>${escape(p.client)} / ${String(i+1).padStart(2,'0')}</figcaption></figure>`).join('')}</div></section>` : ''}
      ${p.aiVideo ? `<section class="kd-case-reel" aria-label="Postać AI dla marki"><div><span class="kd-label">VIDEO / POSTAĆ AI</span><h2>Postać stworzona<br>dla marki.</h2><p>Materiał wideo dla ${escape(p.client)} z postacią <strong>wykreowaną przy użyciu AI na potrzeby marki</strong>. To wirtualna postać przygotowana do komunikacji firmy, a nie nagranie rzeczywistego przedstawiciela kancelarii.</p></div><figure><video controls playsinline preload="none" poster="${escape(p.aiVideoPoster)}" aria-label="Odtwórz film SMC Legal z postacią AI"><source src="${escape(p.aiVideo)}" type="video/mp4"></video><figcaption>SMC Legal / Postać wykreowana przy użyciu AI</figcaption></figure></section>` : ''}
      ${p.featuredVideo ? `<section class="kd-case-reel" aria-label="Wybrany materiał wideo"><div><span class="kd-label">VIDEO / SOCIAL MEDIA</span><h2>Marka w ruchu.</h2><p>Wybrany materiał wideo dla ${escape(p.client)}, przygotowany w ramach <strong>działań marketingowych i prowadzenia social mediów</strong>.</p></div><figure><video controls playsinline preload="none" poster="${escape(p.videoPoster)}" aria-label="Odtwórz film ${escape(p.client)}"><source src="${escape(p.featuredVideo)}" type="video/mp4"></video><figcaption>${escape(p.client)} / Materiał do social mediów</figcaption></figure></section>` : ''}
      ${p.adVideo ? `<section class="kd-case-reel" aria-label="Kreacja reklamowa Meta Ads"><div><span class="kd-label">KREACJA REKLAMOWA / META ADS</span><h2>Wideo z myślą<br>o reklamie.</h2><p>${escape(p.adDescription)}</p></div><figure><video controls playsinline preload="none" poster="${escape(p.adPoster)}" aria-label="Odtwórz kreację reklamową ${escape(p.client)}"><source src="${escape(p.adVideo)}" type="video/mp4"></video><figcaption>${escape(p.client)} / Kreacja wideo do Meta Ads</figcaption></figure></section>` : ''}
      <section class="kd-case-contact"><span>POROZMAWIAJMY O TWOIM PROJEKCIE</span><h2>Twoja marka.<br>Kolejna dobra historia.</h2><button onclick="showPage('kontakt')">Zacznijmy współpracę ↗</button></section>
      ${next && next.__key !== key ? `<a class="kd-case-next" href="#projekt/${encodeURIComponent(next.__key)}"><span>Następna realizacja</span><strong>${escape(next.title)} <span>↗</span></strong></a>` : ''}
    </div>`;
    projectPage.querySelector('[data-return]').addEventListener('click', e => {
      e.preventDefault();
      projectPage.querySelectorAll('video').forEach(video => video.pause());
      history.pushState(null, '', '#' + returnPage);
      baseShowPage(returnPage);
      document.title = baseTitle;
      window.scrollTo(0, returnScroll);
    });
    projectPage.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => openLightbox(images[Number(button.dataset.photo)])));
    projectPage.querySelectorAll('[data-photo]').forEach(button => {
      const caption = p.imageCaptions?.[images[Number(button.dataset.photo)]];
      if (!caption) return;
      button.querySelector('img').alt = (p.client || p.title) + ' - ' + caption;
      button.closest('figure').querySelector('figcaption span').textContent = caption;
    });
    if (p.id === 'smclegal-001' && p.reportedResults?.length) {
      const campaignImage = projectPage.querySelector('img[src="assets/smclegal/nakaz-zaplaty.webp"]');
      const results = projectPage.querySelector('.kd-case-results');
      if (campaignImage && results) {
        const campaign = document.createElement('section');
        campaign.className = 'kd-campaign';
        campaign.setAttribute('aria-label', 'Kampania reklamowa SMC Legal');
        results.before(campaign);
        campaign.append(campaignImage.closest('figure'));
        const copy = document.createElement('div');
        copy.className = 'kd-campaign-copy';
        copy.innerHTML = `<span class="kd-label">KAMPANIA REKLAMOWA / SMC LEGAL</span><h2>Od komunikatu<br>do kontaktu.</h2><p>Kampania reklamowa skierowana do osób, które otrzymały nakaz zapłaty. Kreacja przedstawiała problem i zachęcała do przesłania dokumentu do analizy, z celem <strong>pozyskania leadów dla kancelarii</strong>.</p>`;
        campaign.append(copy);
        copy.append(results);
        results.querySelector('.kd-case-label').remove();
        results.querySelector('h2').textContent = 'Wyniki kampanii';
      }
    }
    projectPage.querySelectorAll('.kd-reels-grid video').forEach((video, i) => {
      if (p.reelPosters?.[i]) video.poster = p.reelPosters[i];
      if (p.id === 'handlersi-001') video.poster = 'assets/handlersi/poster-' + (i + 1) + '.jpg';
    });
    if (p.reels?.length === 2) projectPage.querySelector('.kd-reels-grid').classList.add('kd-reels-pair');
    projectPage.querySelectorAll('video').forEach(video => video.addEventListener('play', () => {
      projectPage.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
    }));
    const hasMainCarousel = p.galleryLayout === 'carousel' && images.length;
    const carousels = [...(hasMainCarousel ? [{title:p.carouselTitle, images}] : []), ...(p.additionalCarousels || [])];
    if (carousels.length) {
      let previousGallery = projectPage.querySelector('.kd-case-gallery');
      if (!hasMainCarousel) {
        const carouselSlot = document.createElement('section');
        previousGallery.before(carouselSlot);
        previousGallery = carouselSlot;
      }
      if (carousels.length > 1) {
        const collection = document.createElement('section');
        collection.className = 'kd-post-collection';
        collection.innerHTML = `<header><span class="kd-label">SOCIAL MEDIA / WYBRANE PUBLIKACJE</span><h2>${escape(p.collectionTitle || 'Samochody w detalu.')}</h2><p>Wybrane posty karuzelowe. Przewijaj każdy niezależnie lub kliknij zdjęcie, aby zobaczyć je z bliska.</p></header><div class="kd-post-grid"></div>`;
        previousGallery.before(collection);
        collection.querySelector('.kd-post-grid').append(previousGallery);
      }
      carousels.forEach((carousel, index) => {
      const images = carousel.images || [];
      if (!images.length) return;
      const gallery = index === 0 ? previousGallery : document.createElement('section');
      if (index > 0) previousGallery.after(gallery);
      previousGallery = gallery;
      gallery.className = 'kd-story';
      gallery.setAttribute('aria-label', carousel.title || 'Karuzela ' + p.client);
      gallery.innerHTML = `<div class="kd-story-heading"><span>WYBRANE MATERIAŁY</span><p>${escape(carousel.title || 'Przykład karuzeli z szerszej współpracy.')}</p></div>
        <div class="kd-story-track" tabindex="0" aria-label="Slajdy karuzeli. Użyj strzałek lub przesuń palcem.">${images.map((src,i)=>`<button class="kd-story-slide" data-slide="${i}" aria-label="Powiększ slajd ${i+1}"><img src="${escape(src)}" alt="${escape(p.client)} - slajd ${i+1} z ${images.length}" ${i ? 'loading="lazy"' : ''}></button>`).join('')}</div>
        <div class="kd-story-controls"><button data-step="-1" aria-label="Poprzedni slajd">←</button><span aria-live="polite" data-counter>01 / ${String(images.length).padStart(2,'0')}</span><button data-step="1" aria-label="Następny slajd">→</button></div>
        <div class="kd-story-thumbs">${images.map((src,i)=>`<button data-thumb="${i}" aria-label="Przejdź do slajdu ${i+1}" aria-current="${i===0?'true':'false'}"><img src="${escape(src)}" alt="" loading="lazy"></button>`).join('')}</div>`;
      const track = gallery.querySelector('.kd-story-track');
      const slides = [...track.children];
      let current = 0;
      const go = index => {
        const next = Math.max(0, Math.min(slides.length - 1, index));
        track.scrollTo({left: slides[next].offsetLeft - slides[0].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
      };
      const update = () => {
        current = slides.reduce((best, slide, i) => Math.abs(slide.offsetLeft-slides[0].offsetLeft-track.scrollLeft) < Math.abs(slides[best].offsetLeft-slides[0].offsetLeft-track.scrollLeft) ? i : best, 0);
        gallery.querySelector('[data-counter]').textContent = String(current+1).padStart(2,'0') + ' / ' + String(images.length).padStart(2,'0');
        gallery.querySelector('[data-step="-1"]').disabled = current === 0;
        gallery.querySelector('[data-step="1"]').disabled = current === slides.length-1;
        gallery.querySelectorAll('[data-thumb]').forEach((button,i)=>button.setAttribute('aria-current', String(i===current)));
      };
      track.addEventListener('scroll', update, {passive:true});
      track.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); go(current + (e.key === 'ArrowRight' ? 1 : -1)); } });
      gallery.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>go(current+Number(button.dataset.step))));
      gallery.querySelectorAll('[data-thumb]').forEach(button=>button.addEventListener('click',()=>go(Number(button.dataset.thumb))));
      slides.forEach((button,i)=>button.addEventListener('click',()=>openLightbox(images[i])));
      update();
      });
    }
    closeProjectDetail();
    baseShowPage('case');
    document.title = p.title + ' | Szymon Popiołek';
    projectPage.querySelector('h1').focus({preventScroll:true});
    window.scrollTo({top:0,behavior:'instant'});
    return true;
  }
  openProjectDetail = function(key) {
    if (!projectLookup.has(key)) return;
    if (!projectPage.classList.contains('active')) {
      returnPage = document.querySelector('.page.active')?.id.replace('page-','') || 'realizacje';
      returnScroll = window.scrollY;
      history.replaceState(null, '', '#' + returnPage);
    }
    history.pushState(null, '', '#projekt/' + encodeURIComponent(key));
    displayCase(key);
  };
  showPage = function(id) {
    projectPage.querySelectorAll('video').forEach(video => video.pause());
    if (location.hash.startsWith('#projekt/')) history.pushState(null, '', '#' + id);
    document.title = baseTitle;
    baseShowPage(id);
  };
  function route() {
    projectPage.querySelectorAll('video').forEach(video => video.pause());
    if (location.hash.startsWith('#projekt/')) {
      let key;
      try { key = decodeURIComponent(location.hash.slice(9)); } catch (_) { return; }
      displayCase(key);
    } else {
      const id = location.hash.slice(1);
      if (document.getElementById('page-' + id)) {
        baseShowPage(id);
        document.title = baseTitle;
        if (id === returnPage) window.scrollTo(0, returnScroll);
      }
    }
  }
  window.addEventListener('hashchange', route);
  const baseRenderProjects = renderProjects;
  renderProjects = function(projects) { baseRenderProjects(projects); route(); };
  route();
})();
