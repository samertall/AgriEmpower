import { lessons, resources, discussionPrompts, specialties } from './data.js';
import { t, localize } from './i18n.js';
import { read, write, clear as clearStorage, exportSnapshot } from './storage.js';
import { escapeHTML as esc, clampNumber, isISODate, asCSV, uid, formatDate, downloadText, sumHarvest, getRoute } from './utils.js';
import { icon } from './icons.js';

const sections = [
  { id:'dashboard', symbol:'house' }, { id:'learn', symbol:'book-open' },
  { id:'resources', symbol:'library' }, { id:'community', symbol:'users' },
  { id:'impact', symbol:'chart-no-axes-combined' }, { id:'support', symbol:'life-buoy' }
];

const loadedLang = read('lang', 'en');
const state = {
  lang: ['en','rw'].includes(loadedLang) ? loadedLang : 'en',
  completed: ensureArray(read('completed', [])),
  saved: ensureArray(read('saved', [])),
  posts: ensureArray(read('posts', [])),
  records: ensureArray(read('records', [])),
  mentorRequests: ensureArray(read('mentorRequests', [])),
  supportNotes: ensureArray(read('supportNotes', [])),
  route: getRoute(location.hash),
  lessonFilter: 'all', lessonQuery: '', resourceFilter: 'all', resourceQuery: '', savedOnly: false,
  topicFilter: 'all', dialog: null, quizFeedback: {}, quizAnswers: {}, mobileOpen: false,
  speaking: false
};

function ensureArray(value) { return Array.isArray(value) ? value : []; }
function msg(key) { return t(key, state.lang); }
function loc(value) { return localize(value, state.lang); }
function attr(value) { return esc(value); }
function save(key) { write(key, state[key]); }
function href(section) { return `#/${section}`; }
function titleCase(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
function lessonProgress() { return Math.round((state.completed.length / lessons.length) * 100); }
function completedLesson(id) { return state.completed.includes(id); }
function resourceSaved(id) { return state.saved.includes(id); }
function navLink(section, mobile = false) {
  const active = state.route === section.id;
  return `<a class="nav-link ${active ? 'is-active' : ''} ${mobile ? 'mobile-link' : ''}" href="${href(section.id)}" ${active ? 'aria-current="page"' : ''}>
    <span class="nav-icon">${icon(section.symbol, mobile ? 21 : 19)}</span><span>${msg(section.id)}</span>
    ${!mobile && active ? '<span class="nav-active-dot" aria-hidden="true"></span>' : ''}</a>`;
}
function mark(category) { return `<span class="category-dot category-${category}" aria-hidden="true"></span>`; }
function pill(category) { return `<span class="category-pill ${category}">${mark(category)}${msg(category)}</span>`; }
function progressBar(value) { return `<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div>`; }
function buttonLink(section, text, cls = 'btn btn-primary') { return `<a class="${cls}" href="${href(section)}">${esc(text)} ${icon('arrow-right', 17)}</a>`; }
function empty(title, description, symbol = 'sprout') { return `<div class="empty-state"><span class="empty-illustration">${icon(symbol, 30)}</span><h3>${esc(title)}</h3><p>${esc(description)}</p></div>`; }

function renderShell() {
  return `
    <a href="#main-content" class="skip-link">${msg('jumpToContent')}</a>
    <div class="app-shell">
      <aside class="sidebar ${state.mobileOpen ? 'sidebar-open' : ''}" aria-label="${msg('navigation')}">
        <a class="brand" href="#/dashboard" aria-label="AgriEmpower home">
          <span class="brand-emblem">${icon('sprout', 25)}</span>
          <span class="brand-type"><strong>Agri<span>Empower</span></strong><small>GROW. LEARN. THRIVE.</small></span>
        </a>
        <div class="sidebar-main"><div class="nav-section-label">${msg('yourWorkspace')}</div><nav class="side-nav" aria-label="${msg('navigation')}">${sections.map(s => navLink(s)).join('')}</nav></div>
        <div class="sidebar-bottom">
          <div class="sidebar-help-icon">${icon('hand-heart', 24)}</div>
          <strong>${msg('learningTogether')}</strong>
          <p>${msg('permission')}</p>
          <a href="#/support" class="sidebar-bottom-link">${msg('support')} ${icon('arrow-up-right', 15)}</a>
        </div>
        <p class="sidebar-footer">Rwanda ${icon('map-pin', 13)} <span>AgriEmpower MVP</span></p>
      </aside>
      ${state.mobileOpen ? '<button type="button" class="nav-scrim" data-action="close-mobile" aria-label="Close navigation"></button>' : ''}
      <div class="main-column">
        <header class="topbar">
          <div class="topbar-left">
            <button type="button" class="icon-button menu-trigger" aria-label="Open navigation" data-action="toggle-mobile">${icon('menu', 23)}</button>
            <div class="topbar-context"><span class="context-dot"></span><span>${msg('welcome')}</span></div>
          </div>
          <div class="topbar-right">
            <span class="topbar-demo" title="${msg('localDemoText')}">${icon('lock', 14)} <span>${msg('localDemo')}</span></span>
            <div class="language-switch" role="group" aria-label="${msg('language')}">
              <button type="button" data-action="set-language" data-lang="en" class="${state.lang === 'en' ? 'selected' : ''}" aria-pressed="${state.lang === 'en'}">EN</button>
              <button type="button" data-action="set-language" data-lang="rw" class="${state.lang === 'rw' ? 'selected' : ''}" aria-pressed="${state.lang === 'rw'}">RW</button>
            </div>
          </div>
        </header>
        <main id="main-content" tabindex="-1" class="page-content">${renderPage()}</main>
        <footer class="main-footer"><span>${msg('footerTag')}</span><span>${msg('footer')}</span></footer>
      </div>
      <nav class="mobile-bottom-nav" aria-label="${msg('navigation')}">${sections.slice(0, 5).map(s => navLink(s, true)).join('')}</nav>
    </div>
    <div id="toast-region" class="toast-region" role="status" aria-live="polite"></div>
    ${state.dialog ? renderDialog() : ''}`;
}

function pageHeading(title, description, eyebrow, action = '') {
  return `<section class="page-heading"><div><span class="eyebrow"><span class="eyebrow-line"></span>${eyebrow}</span><h1>${title}</h1><p>${description}</p></div>${action}</section>`;
}

function renderDashboard() {
  const next = lessons.find(l => !completedLesson(l.id)) || lessons[0];
  const featured = lessons.filter(l => !completedLesson(l.id)).slice(0,3);
  const cards = (featured.length ? featured : lessons.slice(0,3)).map(renderLessonCard).join('');
  return `<div class="home-page">
    <section class="welcome-strip"><span>${msg('greet')}</span><span class="welcome-separator"></span><span>${msg('breadcrumbHome')}</span></section>
    <section class="hero-banner">
      <div class="hero-copy"><span class="hero-eyebrow">${icon('sparkles', 17)} ${msg('heroEyebrow')}</span>
        <h1>${msg('heroTitle')}</h1><p>${msg('heroDesc')}</p>
        <div class="hero-actions">${buttonLink('learn', msg('startLearning'), 'btn btn-ivory')}${buttonLink('impact', msg('trackImpact'), 'btn btn-glass')}</div>
      </div>
      <div class="hero-art"><img src="./assets/hero-farm.svg" width="600" height="450" alt="Illustrated hills with women growing crops and carrying a harvest basket" decoding="async" /></div>
      <div class="hero-art-decoration decoration-a"></div><div class="hero-art-decoration decoration-b"></div>
    </section>
    <section class="quick-stats" aria-label="${msg('yourProgress')}">
      <div class="stat-card"><span class="stat-symbol stat-sage">${icon('book-open', 23)}</span><div><span class="stat-value">${state.completed.length}<small> / ${lessons.length}</small></span><span class="stat-label">${msg('lessonsDone')}</span></div>${icon('arrow-up-right', 18, 'stat-arrow')}</div>
      <div class="stat-card"><span class="stat-symbol stat-peach">${icon('bookmark', 23)}</span><div><span class="stat-value">${state.saved.length}</span><span class="stat-label">${msg('guidesSaved')}</span></div>${icon('arrow-up-right', 18, 'stat-arrow')}</div>
      <div class="stat-card"><span class="stat-symbol stat-blue">${icon('chart-no-axes-combined', 23)}</span><div><span class="stat-value">${state.records.length}</span><span class="stat-label">${msg('harvestEntries')}</span></div>${icon('arrow-up-right', 18, 'stat-arrow')}</div>
    </section>
    <div class="home-content-grid">
      <div class="home-primary">
        <section class="section-block"><div class="section-head"><div><span class="section-kicker">01 / LEARNING</span><h2>${msg('yourJourney')}</h2><p>${msg('yourJourneyDesc')}</p></div><a href="#/learn" class="text-link">${msg('viewAll')} ${icon('arrow-right', 17)}</a></div>
          <div class="learning-progress-panel"><div><span class="muted-label">${msg('yourProgress')}</span><strong>${lessonProgress()}%</strong></div>${progressBar(lessonProgress())}<span>${state.completed.length} / ${lessons.length} ${msg('lessonsCount')}</span></div>
          <div class="lesson-grid home-lessons">${cards}</div>
        </section>
        <section class="section-block"><div class="section-head"><div><span class="section-kicker">02 / PATHWAYS</span><h2>${msg('learningPaths')}</h2><p>${msg('learningPathsDesc')}</p></div></div>
          <div class="pathways-grid">
            <a href="#/learn" data-nav-filter="farming" class="pathway-card pathway-farming"><span class="pathway-icon">${icon('sprout', 29)}</span><span class="pathway-overline">${msg('farming')}</span><h3>${msg('farmingPath')}</h3><p>${msg('farmingPathDesc')}</p><span class="pathway-link">${msg('startLearning')} ${icon('arrow-right', 17)}</span></a>
            <a href="#/learn" data-nav-filter="nutrition" class="pathway-card pathway-nutrition"><span class="pathway-icon">${icon('heart', 28)}</span><span class="pathway-overline">${msg('nutrition')}</span><h3>${msg('nutritionPath')}</h3><p>${msg('nutritionPathDesc')}</p><span class="pathway-link">${msg('startLearning')} ${icon('arrow-right', 17)}</span></a>
          </div>
        </section>
      </div>
      <aside class="home-side">
        <section class="next-lesson-box"><span class="section-kicker">UP NEXT</span><div class="next-icon">${icon(next.icon, 28)}</div><h3>${loc(next.title)}</h3><p>${loc(next.summary)}</p><div class="next-meta">${icon('clock', 16)} ${next.minutes} ${msg('minutes')} <span class="meta-divider"></span>${msg(next.category)}</div><button class="btn btn-primary btn-block" type="button" data-action="open-lesson" data-id="${next.id}">${completedLesson(next.id) ? msg('startLesson') : msg('continue')} ${icon('arrow-right', 16)}</button></section>
        <section class="field-note-box"><div class="field-note-top"><span class="field-note-sun">${icon('sparkles', 25)}</span><span class="section-kicker">${msg('fieldNote')}</span></div><h3>${msg('fieldNoteTitle')}</h3><p>${msg('fieldNoteDesc')}</p><a class="text-link" href="#/resources">${msg('exploreResources')} ${icon('arrow-right', 16)}</a></section>
        <div class="mini-notice">${icon('info', 18)}<p>${msg('contextNotice')}</p></div>
      </aside>
    </div>
  </div>`;
}

function renderLessonCard(lesson) {
  const done = completedLesson(lesson.id);
  return `<article class="lesson-card" data-category="${lesson.category}">
    <div class="lesson-card-art art-${lesson.color}"><span class="lesson-art-glow"></span><span class="lesson-illustration">${icon(lesson.icon, 39)}</span><span class="lesson-number">${String(lessons.indexOf(lesson) + 1).padStart(2, '0')}</span></div>
    <div class="lesson-card-body"><div class="lesson-card-meta">${pill(lesson.category)}<span>${icon('clock', 14)} ${lesson.minutes} ${msg('minutes')}</span></div>
      <h3>${loc(lesson.title)}</h3><p>${loc(lesson.summary)}</p>
      <button type="button" class="lesson-card-action" data-action="open-lesson" data-id="${lesson.id}">${done ? msg('completed') : msg('startLesson')} ${icon(done ? 'check-circle' : 'arrow-right', 17)}</button>
    </div>
  </article>`;
}

function renderLearn() {
  const q = state.lessonQuery.trim().toLowerCase();
  const filtered = lessons.filter(l => (state.lessonFilter === 'all' || l.category === state.lessonFilter) && `${loc(l.title)} ${loc(l.summary)}`.toLowerCase().includes(q));
  return `<div class="inner-page">${pageHeading(msg('learnPageTitle'), msg('learnPageDesc'), 'YOUR LEARNING HUB')}
    <div class="learning-summary"><div class="learning-summary-icon">${icon('award', 28)}</div><div class="learning-summary-copy"><strong>${msg('yourProgress')}</strong><span>${state.completed.length} ${msg('lessonProgress')}</span></div><div class="learning-summary-progress">${progressBar(lessonProgress())}<span>${lessonProgress()}%</span></div></div>
    <div class="catalog-toolbar"><div class="filter-tabs" role="group" aria-label="Lesson category">${['all','farming','nutrition'].map(cat => `<button type="button" data-action="filter-lessons" data-category="${cat}" class="${state.lessonFilter === cat ? 'active' : ''}" aria-pressed="${state.lessonFilter === cat}">${msg(cat)}</button>`).join('')}</div>
    <label class="search-field">${icon('search', 18)}<span class="sr-only">${msg('searchLessons')}</span><input data-search="lesson" type="search" placeholder="${msg('searchLessons')}" value="${attr(state.lessonQuery)}" maxlength="100"></label></div>
    ${filtered.length ? `<div class="lesson-grid catalog-grid">${filtered.map(renderLessonCard).join('')}</div>` : empty(msg('emptyFilter'), msg('emptyFilterDesc'), 'search')}
    <div class="educational-note">${icon('info', 17)} ${msg('sourceNote')}</div>
  </div>`;
}

function renderResourceCard(resource) {
  const saved = resourceSaved(resource.id);
  const mainAction = resource.type === 'guide'
    ? `<button type="button" class="resource-cta" data-action="open-resource" data-id="${resource.id}">${msg('openGuide')} ${icon('arrow-right', 16)}</button>`
    : resource.type === 'template'
    ? `<button type="button" class="resource-cta" data-action="download-template" data-id="${resource.id}">${msg('download')} ${icon('download', 16)}</button>`
    : `<a class="resource-cta" href="${attr(resource.url)}" target="_blank" rel="noopener noreferrer">${msg('openResource')} ${icon('arrow-up-right', 16)}<span class="sr-only">(${msg('onlineLabel')})</span></a>`;
  return `<article class="resource-card"><div class="resource-card-top"><span class="resource-icon art-${resource.color}">${icon(resource.icon, 27)}</span><button type="button" class="bookmark-button ${saved ? 'is-saved' : ''}" data-action="toggle-save" data-id="${resource.id}" aria-label="${saved ? msg('unsaveResource') : msg('saveResource')}" aria-pressed="${saved}" title="${saved ? msg('saved') : msg('save')}">${icon('bookmark', 19)}</button></div>
    <div class="resource-card-body"><div class="resource-meta"><span>${msg(resource.type)}</span><span class="resource-dot"></span><span>${msg(resource.category)}</span></div><h3>${loc(resource.title)}</h3><p>${loc(resource.description)}</p></div>
    <div class="resource-card-bottom">${mainAction}${resource.publisher ? `<span class="resource-source">${resource.publisher}</span>` : ''}</div></article>`;
}

function renderResources() {
  const q = state.resourceQuery.trim().toLowerCase();
  const filtered = resources.filter(r => (state.resourceFilter === 'all' || state.resourceFilter === r.type) && (!state.savedOnly || resourceSaved(r.id)) && `${loc(r.title)} ${loc(r.description)} ${r.publisher || ''}`.toLowerCase().includes(q));
  return `<div class="inner-page">${pageHeading(msg('resourcesTitle'), msg('resourcesDesc'), 'THE RESOURCE LIBRARY')}
    <div class="resource-feature"><div class="resource-feature-icon">${icon('library', 29)}</div><div><strong>${msg('resourceDisclaimer')}</strong><p>${msg('resourcesHint')}</p></div>${icon('sparkles', 26, 'resource-feature-sparkle')}</div>
    <div class="catalog-toolbar resource-toolbar"><div class="filter-tabs" role="group" aria-label="Resource type">${['all','guide','template','video','external'].map(type => `<button type="button" data-action="filter-resources" data-type="${type}" class="${state.resourceFilter === type ? 'active' : ''}" aria-pressed="${state.resourceFilter === type}">${msg(type)}</button>`).join('')}</div>
      <div class="toolbar-side"><button type="button" class="saved-filter ${state.savedOnly ? 'active' : ''}" data-action="toggle-saved-filter" aria-pressed="${state.savedOnly}">${icon('bookmark', 16)} ${msg('showSaved')}</button>
      <label class="search-field">${icon('search', 18)}<span class="sr-only">${msg('searchResources')}</span><input data-search="resource" type="search" placeholder="${msg('searchResources')}" value="${attr(state.resourceQuery)}" maxlength="100"></label></div></div>
    ${filtered.length ? `<div class="resource-grid">${filtered.map(renderResourceCard).join('')}</div>` : empty(msg('emptyFilter'), msg('emptyFilterDesc'), 'search')}
    <div class="educational-note">${icon('info', 17)} ${msg('sourceNote')}</div>
  </div>`;
}

function renderPost(post) {
  const replies = ensureArray(post.replies);
  return `<article class="post-card"><div class="post-author-row"><div class="avatar-avatar">${esc((post.author || 'F').slice(0,1).toUpperCase())}</div><div class="post-author"><strong>${esc(post.author)}</strong><span>${esc(formatDate(post.date.slice(0,10), state.lang))}</span></div>${pill(['farming','nutrition'].includes(post.topic) ? post.topic : 'farming')}</div>
    <h3>${esc(post.title)}</h3><p class="post-body">${esc(post.body)}</p>
    <div class="post-replies">${icon('message-circle', 17)} ${replies.length} ${msg('reply')}${replies.length === 1 ? '' : 's'}</div>
    ${replies.map(r => `<div class="post-reply"><span class="reply-avatar">${icon('sprout', 15)}</span><div><strong>${msg('yourPosts')}</strong><p>${esc(r.text)}</p></div></div>`).join('')}
    <form class="reply-form" data-form="reply" data-id="${attr(post.id)}"><label class="sr-only" for="reply-${attr(post.id)}">${msg('writeReply')}</label><input id="reply-${attr(post.id)}" name="reply" required maxlength="500" placeholder="${msg('writeReply')}"/><button type="submit" aria-label="${msg('sendReply')}" title="${msg('sendReply')}">${icon('send', 18)}</button></form>
  </article>`;
}

function renderCommunity() {
  const posts = [...state.posts].reverse().filter(post => state.topicFilter === 'all' || post.topic === state.topicFilter);
  const starters = discussionPrompts.filter(s => state.topicFilter === 'all' || s.category === state.topicFilter);
  return `<div class="inner-page">${pageHeading(msg('communityTitle'), msg('communityDesc'), 'COMMUNITY & CONNECTION', `<button type="button" data-action="new-post" class="btn btn-primary heading-action">${icon('plus', 17)} ${msg('startConversation')}</button>`)}
    <div class="privacy-ribbon">${icon('lock', 21)}<div><strong>${msg('localOnly')}</strong><p>${msg('localOnlyDesc')}</p></div></div>
    <div class="section-head"><div><span class="section-kicker">LET'S TALK</span><h2>${msg('conversationPrompts')}</h2></div></div>
    <div class="prompt-grid">${starters.map(s => `<button type="button" class="prompt-card" data-action="prompt-post" data-id="${s.id}"><span class="prompt-icon">${icon(s.icon, 24)}</span><h3>${loc(s.title)}</h3><p>${loc(s.hint)}</p><span class="prompt-link">${msg('sharePrompt')} ${icon('arrow-right', 16)}</span></button>`).join('')}</div>
    <div class="discussion-section"><div class="section-head discussion-header"><div><span class="section-kicker">YOUR VOICE</span><h2>${msg('recentDiscussions')}</h2></div><div class="filter-tabs compact-tabs" role="group" aria-label="Topic">${['all','farming','nutrition'].map(cat => `<button type="button" data-action="filter-posts" data-category="${cat}" class="${state.topicFilter === cat ? 'active' : ''}" aria-pressed="${state.topicFilter === cat}">${msg(cat)}</button>`).join('')}</div></div>
    ${posts.length ? `<div class="post-stack">${posts.map(renderPost).join('')}</div>` : empty(msg('noPosts'), msg('noPostsDesc'), 'message-circle')}
    <div class="educational-note">${icon('shield-check', 17)} ${msg('discussionHint')}</div></div>
  </div>`;
}

function impactChart() {
  if (!state.records.length) return `<div class="chart-empty">${icon('chart-no-axes-combined', 36)}<span>${msg('noChart')}</span></div>`;
  const totals = new Map();
  state.records.forEach(r => totals.set(r.date, (totals.get(r.date) || 0) + Number(r.kg)));
  const points = [...totals].sort((a,b) => a[0].localeCompare(b[0]));
  const W = 760, H = 248, left = 48, right = 24, top = 25, bottom = 48;
  const chartW = W - left - right, chartH = H - top - bottom;
  const max = Math.max(1, ...points.map(p => p[1]));
  const scaleMax = Math.ceil(max * 1.15 * 10) / 10;
  const x = i => left + (points.length === 1 ? chartW / 2 : i * chartW / (points.length - 1));
  const y = v => top + chartH - (v / scaleMax) * chartH;
  const coords = points.map(([date,value], i) => `${x(i).toFixed(2)},${y(value).toFixed(2)}`).join(' ');
  const area = `${left},${top+chartH} ${coords} ${left+chartW},${top+chartH}`;
  const labels = points.filter((p,i) => points.length <= 6 || i % Math.ceil(points.length / 6) === 0 || i === points.length - 1);
  return `<svg viewBox="0 0 ${W} ${H}" class="impact-chart" role="img" aria-label="Harvest quantity by date in kilograms. ${points.map(([d,v]) => `${d}: ${v} kg`).join('; ')}">
    <defs><linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8AB28C" stop-opacity="0.42"/><stop offset="100%" stop-color="#8AB28C" stop-opacity="0.02"/></linearGradient></defs>
    ${[0,1,2,3].map(i => { const val = scaleMax * (i / 3); const cy = y(val); return `<line x1="${left}" x2="${W-right}" y1="${cy}" y2="${cy}" stroke="#e7ebe4" stroke-dasharray="4 5"/><text x="${left-9}" y="${cy+4}" text-anchor="end" font-size="12" fill="#85938b">${Number(val.toFixed(1))}</text>`; }).join('')}
    <polygon points="${area}" fill="url(#area-fill)"/><polyline points="${coords}" fill="none" stroke="#2F7F56" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${points.map(([d,v], i) => `<circle cx="${x(i)}" cy="${y(v)}" r="5.5" fill="#2F7F56" stroke="#fff" stroke-width="2.5"><title>${esc(d)}: ${v} kg</title></circle>`).join('')}
    ${labels.map(([d], i) => { const idx = points.findIndex(p => p[0] === d); const dateLabel = d.slice(5); return `<text x="${x(idx)}" y="${H-16}" font-size="12" fill="#73847a" text-anchor="middle">${esc(dateLabel)}</text>`; }).join('')}
  </svg>`;
}

function renderImpact() {
  const total = sumHarvest(state.records);
  const achieved = [{ key:'firstLesson', done: state.completed.length >= 1, symbol: 'book-open' }, { key:'firstEntry', done: state.records.length >= 1, symbol:'sprout' }, { key:'threeLessons', done: state.completed.length >= 3, symbol:'award' }];
  const records = [...state.records].sort((a,b) => b.date.localeCompare(a.date));
  return `<div class="inner-page">${pageHeading(msg('impactTitle'), msg('impactDesc'), 'YOUR GROWTH, YOUR STORY', `<button type="button" class="btn btn-primary heading-action" data-action="new-record">${icon('plus', 17)} ${msg('addRecord')}</button>`)}
    <div class="privacy-ribbon mint-ribbon">${icon('lock', 21)}<div><strong>${msg('impactPrivate')}</strong><p>${msg('impactPrivateDesc')}</p></div></div>
    <div class="impact-stats"><div class="impact-metric"><div class="impact-metric-icon stat-sage">${icon('wheat', 26)}</div><span>${msg('harvestTotal')}</span><strong>${Intl.NumberFormat('en').format(Number(total.toFixed(2)))} <small>kg</small></strong></div><div class="impact-metric"><div class="impact-metric-icon stat-blue">${icon('calendar-days', 26)}</div><span>${msg('records')}</span><strong>${state.records.length}</strong></div><div class="impact-metric"><div class="impact-metric-icon stat-peach">${icon('award', 26)}</div><span>${msg('lessonsDone')}</span><strong>${state.completed.length} <small>/ ${lessons.length}</small></strong></div></div>
    <section class="chart-card"><div class="section-head"><div><h2>${msg('harvestChart')}</h2><p>kg</p></div>${state.records.length ? `<button class="btn btn-secondary btn-small" type="button" data-action="export-records">${icon('download', 16)} ${msg('exportCSV')}</button>` : ''}</div>${impactChart()}</section>
    <div class="impact-lower-grid"><section class="records-card"><div class="section-head"><div><h2>${msg('recentHarvest')}</h2></div></div>
      ${records.length ? `<div class="record-table-wrap"><table class="record-table"><thead><tr><th>${msg('date')}</th><th>${msg('crop')}</th><th>kg</th><th><span class="sr-only">${msg('action')}</span></th></tr></thead><tbody>${records.map(r => `<tr><td>${esc(formatDate(r.date, state.lang))}</td><td><strong>${esc(r.crop)}</strong></td><td>${esc(r.kg)}</td><td><button class="table-icon-button" type="button" data-action="delete-record" data-id="${attr(r.id)}" aria-label="${msg('deleteRecord')}: ${attr(r.crop)}" title="${msg('deleteRecord')}">${icon('trash-2', 17)}</button></td></tr>`).join('')}</tbody></table></div>` : empty(msg('noRecords'), msg('noRecordsDesc'), 'wheat')}
    </section><section class="milestones-card"><div class="section-head"><div><h2>${msg('yourMilestones')}</h2><p>${msg('milestonesDesc')}</p></div></div>
      <div class="milestone-list">${achieved.map(m => `<div class="milestone-item ${m.done ? 'achieved' : ''}"><span class="milestone-icon">${icon(m.done ? 'check-circle' : m.symbol, 21)}</span><span>${msg(m.key)}</span>${m.done ? icon('check', 16) : '<span class="milestone-empty"></span>'}</div>`).join('')}</div><p class="milestone-note">${msg('yearHint')}</p>
    </section></div>
  </div>`;
}

function renderSupport() {
  const trusted = [
    { name:'RAB', desc: msg('rabDescription'), url:'https://www.rab.gov.rw/', symbol:'sprout' },
    { name:'FAO', desc: msg('faoDescription'), url:'https://www.fao.org/rwanda/', symbol:'wheat' },
    { name:'WHO', desc: msg('whoDescription'), url:'https://www.who.int/health-topics/nutrition', symbol:'heart' }
  ];
  return `<div class="inner-page">${pageHeading(msg('supportTitle'), msg('supportDesc'), 'GUIDANCE & SUPPORT')}
    <section class="support-hero"><div><span class="section-kicker">FIELD SUPPORT</span><h2>${msg('fieldSupport')}</h2><p>${msg('fieldIntro')}</p><button type="button" data-action="new-support" class="btn btn-primary">${icon('message-circle', 17)} ${msg('helpRequest')}</button></div><span class="support-hero-art">${icon('hand-heart', 77)}</span></section>
    <section class="support-section"><div class="section-head"><div><span class="section-kicker">CONNECTIONS</span><h2>${msg('mentorship')}</h2><p>${msg('mentorshipDesc')}</p></div></div><div class="specialty-grid">${specialties.map(s => `<article class="specialty-card"><span class="specialty-icon art-${s.color}">${icon(s.icon, 27)}</span><h3>${loc(s.title)}</h3><p>${loc(s.desc)}</p><button type="button" class="specialty-cta" data-action="new-mentor" data-specialty="${s.id}">${msg('requestMentor')} ${icon('arrow-right', 15)}</button></article>`).join('')}</div></section>
    <section class="support-section"><div class="section-head"><div><span class="section-kicker">PUBLIC RESOURCES</span><h2>${msg('trustedOrganizations')}</h2><p>${msg('notPartners')}</p></div></div><div class="organizations-grid">${trusted.map(o => `<a class="organization-row" href="${attr(o.url)}" target="_blank" rel="noopener noreferrer"><span class="organization-icon">${icon(o.symbol, 23)}</span><span class="organization-detail"><strong>${o.name}</strong><span>${o.desc}</span></span>${icon('arrow-up-right', 19)}</a>`).join('')}</div></section>
    <section class="privacy-panel"><div class="privacy-panel-header"><div class="privacy-icon">${icon('shield-check', 24)}</div><div><h2>${msg('dataPrivacy')}</h2><p>${msg('dataPrivacyDesc')}</p></div></div><div class="privacy-controls"><button type="button" class="btn btn-secondary" data-action="export-all">${icon('download', 16)} ${msg('exportAll')}</button><button type="button" class="btn btn-danger-ghost" data-action="clear-all">${icon('trash-2', 16)} ${msg('clearAll')}</button></div></section>
  </div>`;
}

function renderPage() {
  switch(state.route) {
    case 'learn': return renderLearn();
    case 'resources': return renderResources();
    case 'community': return renderCommunity();
    case 'impact': return renderImpact();
    case 'support': return renderSupport();
    default: return renderDashboard();
  }
}

function dialogFrame(heading, eyebrow, body, footer = '', large = false) {
  return `<div class="dialog-backdrop" data-dialog-backdrop="true"><section class="dialog-window ${large ? 'dialog-large' : ''}" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1">
    <header class="dialog-header"><div><span class="section-kicker">${eyebrow}</span><h2 id="dialog-title">${heading}</h2></div><button class="icon-button dialog-close" type="button" data-action="close-dialog" aria-label="${msg('close')}">${icon('x', 22)}</button></header>
    <div class="dialog-body">${body}</div>${footer ? `<footer class="dialog-footer">${footer}</footer>` : ''}
  </section></div>`;
}

function lessonDialog(id) {
  const l = lessons.find(l => l.id === id); if (!l) return '';
  const feedback = state.quizFeedback[id];
  const selected = state.quizAnswers[id];
  const complete = completedLesson(l.id);
  const next = lessons[(lessons.indexOf(l) + 1) % lessons.length];
  const body = `<div class="dialog-lesson-top">${pill(l.category)}<span>${icon('clock', 16)} ${l.minutes} ${msg('minutes')}</span>${complete ? `<span class="lesson-done-badge">${icon('check-circle', 15)} ${msg('completeTag')}</span>` : ''}</div>
    <p class="lesson-intro">${loc(l.summary)}</p><div class="lesson-goal">${icon('sparkles', 19)}<div><strong>${msg('whatYouWillLearn')}</strong><p>${loc(l.outcome)}</p></div></div>
    <div class="lesson-steps"><h3>${msg('inThisLesson')}</h3>${l.steps.map((step,i) => `<div class="lesson-step"><span class="lesson-step-number">${String(i+1).padStart(2, '0')}</span><div><h4>${loc(step.title)}</h4><p>${loc(step.body)}</p></div></div>`).join('')}</div>
    <form class="quiz" data-form="quiz" data-id="${l.id}"><div class="quiz-header">${icon('circle-help', 21)}<h3>${msg('quickCheck')}</h3></div><p class="quiz-question">${loc(l.quiz.q)}</p><div class="quiz-options">${l.quiz.choices.map((choice,i) => `<label class="quiz-option ${selected === i ? 'selected' : ''}"><input type="radio" name="answer" value="${i}" ${selected === i ? 'checked' : ''} /><span>${loc(choice)}</span></label>`).join('')}</div>
      <div class="quiz-result-row"><button type="submit" class="btn btn-secondary btn-small">${msg('checkAnswer')}</button>${feedback ? `<span class="quiz-feedback ${feedback === 'correct' ? 'right' : 'wrong'}" role="status">${icon(feedback === 'correct' ? 'check-circle' : 'info', 17)} ${msg(feedback)}</span>` : ''}</div>
    </form>`;
  const footer = `<button type="button" class="btn btn-secondary" data-action="speak-lesson" data-id="${l.id}">${icon(state.speaking ? 'volume-x' : 'volume-2', 18)} ${msg(state.speaking ? 'stopReading' : 'listen')}</button>
    <span class="dialog-footer-space"></span>
    ${complete ? `<button type="button" class="btn btn-primary" data-action="open-lesson" data-id="${next.id}">${msg('nextLesson')} ${icon('arrow-right', 16)}</button>` : `<button type="button" class="btn btn-primary" data-action="complete-lesson" data-id="${l.id}">${icon('check', 18)} ${msg('markComplete')}</button>`}`;
  return dialogFrame(loc(l.title), 'THE LEARNING JOURNEY', body, footer, true);
}

function resourceDialog(id) {
  const r = resources.find(r => r.id === id); if (!r || r.type !== 'guide') return '';
  const body = `<p class="dialog-description">${loc(r.description)}</p><div class="guide-illustration art-${r.color}">${icon(r.icon, 46)}</div><p class="guide-intro">${msg('guideIntro')}</p><ol class="guide-checklist">${loc(r.items).map((item,i) => `<li><span>${icon('check', 18)}</span><p>${esc(item)}</p></li>`).join('')}</ol><p class="guide-disclaimer">${msg('resourceDisclaimer')}</p>`;
  const footer = `<button type="button" class="btn btn-secondary" data-action="print-guide">${icon('printer', 17)} ${msg('printGuide')}</button><span class="dialog-footer-space"></span><button type="button" class="btn btn-primary" data-action="toggle-save" data-id="${r.id}">${icon('bookmark', 17)} ${msg(resourceSaved(r.id) ? 'saved' : 'save')}</button>`;
  return dialogFrame(loc(r.title), msg('guide'), body, footer, false);
}

function postDialog() {
  const p = state.dialog.prefill || {};
  const body = `<p class="dialog-description">${msg('localOnlyDesc')}</p><form id="post-form" class="dialog-form" data-form="post">
    <div class="form-field"><label for="post-category">${msg('postTopic')}</label><select id="post-category" name="topic"><option value="farming" ${p.topic === 'farming' ? 'selected' : ''}>${msg('farming')}</option><option value="nutrition" ${p.topic === 'nutrition' ? 'selected' : ''}>${msg('nutrition')}</option></select></div>
    <div class="form-field"><label for="post-title">${msg('postTitle')} *</label><input id="post-title" name="title" required maxlength="120" value="${attr(p.title || '')}" placeholder="${msg('postTitlePlaceholder')}"></div>
    <div class="form-field"><label for="post-body">${msg('postBody')} *</label><textarea id="post-body" name="body" rows="5" minlength="5" maxlength="1000" required placeholder="${msg('postBodyPlaceholder')}"></textarea></div>
    <div class="form-field"><label for="post-author">${msg('yourName')}</label><input id="post-author" name="author" maxlength="40" placeholder="${msg('postNamePlaceholder')}"></div>
    <p class="form-help">${icon('lock', 15)} ${msg('discussionHint')}</p><button type="submit" class="btn btn-primary btn-block">${icon('check', 17)} ${msg('publishLocal')}</button>
  </form>`;
  return dialogFrame(msg('startConversation'), 'LOCAL DISCUSSION', body);
}

function recordDialog() {
  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
  const body = `<p class="dialog-description">${msg('impactPrivateDesc')}</p><form id="record-form" class="dialog-form" data-form="record">
    <div class="form-two-col"><div class="form-field"><label for="record-date">${msg('date')} *</label><input id="record-date" name="date" type="date" required value="${today}"></div><div class="form-field"><label for="record-crop">${msg('crop')} *</label><input id="record-crop" name="crop" required maxlength="60" placeholder="Beans, maize..."></div></div>
    <div class="form-field"><label for="record-kg">${msg('quantity')} *</label><input id="record-kg" name="kg" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" required placeholder="0"></div>
    <div class="form-two-col"><div class="form-field"><label for="record-food">${msg('foodDays')}</label><input id="record-food" name="foodDays" type="number" inputmode="numeric" min="0" max="7" step="1" placeholder="0-7"></div><div class="form-field"><label for="record-veg">${msg('mealDays')}</label><input id="record-veg" name="vegDays" type="number" inputmode="numeric" min="0" max="7" step="1" placeholder="0-7"></div></div>
    <div class="form-field"><label for="record-notes">${msg('notes')}</label><textarea id="record-notes" name="notes" maxlength="500" rows="3"></textarea></div>
    <p class="form-help">${icon('info', 15)} ${msg('yearHint')}</p><button type="submit" class="btn btn-primary btn-block">${icon('check', 17)} ${msg('saveRecord')}</button>
  </form>`;
  return dialogFrame(msg('addRecord'), 'MY FARM JOURNAL', body);
}

function mentorDialog() {
  const chosen = state.dialog.specialty || 'crops';
  const body = `<p class="dialog-description">${msg('mentorshipDesc')} ${msg('localOnlyDesc')}</p><form class="dialog-form" data-form="mentor">
    <div class="form-field"><label for="mentor-topic">${msg('mentorTopic')}</label><select id="mentor-topic" name="topic">${specialties.map(s => `<option value="${s.id}" ${chosen === s.id ? 'selected' : ''}>${loc(s.title)}</option>`).join('')}</select></div>
    <div class="form-field"><label for="mentor-question">${msg('mentorQuestion')} *</label><textarea id="mentor-question" name="question" rows="5" required minlength="5" maxlength="700" placeholder="${msg('mentorQuestionPlaceholder')}"></textarea></div>
    <button type="submit" class="btn btn-primary btn-block">${icon('check', 17)} ${msg('saveInterest')}</button>
  </form>`;
  return dialogFrame(msg('requestMentor'), 'MENTORSHIP', body);
}

function supportDialog() {
  const body = `<p class="dialog-description">${msg('fieldIntro')} ${msg('localOnlyDesc')}</p><form class="dialog-form" data-form="support">
    <div class="form-field"><label for="support-topic">${msg('supportTopic')}</label><select id="support-topic" name="topic"><option value="farming">${msg('farming')}</option><option value="nutrition">${msg('nutrition')}</option></select></div>
    <div class="form-field"><label for="support-question">${msg('supportQuestion')} *</label><textarea id="support-question" name="question" rows="5" required minlength="5" maxlength="700" placeholder="${msg('mentorQuestionPlaceholder')}"></textarea></div>
    <button type="submit" class="btn btn-primary btn-block">${icon('check', 17)} ${msg('saveRequest')}</button>
  </form>`;
  return dialogFrame(msg('helpRequest'), 'LOCAL SUPPORT NOTE', body);
}

function renderDialog() {
  if (!state.dialog) return '';
  switch(state.dialog.type) {
    case 'lesson': return lessonDialog(state.dialog.id);
    case 'resource': return resourceDialog(state.dialog.id);
    case 'post': return postDialog();
    case 'record': return recordDialog();
    case 'mentor': return mentorDialog();
    case 'support': return supportDialog();
    default: return '';
  }
}

function render({ preserveScroll = true } = {}) {
  const y = window.scrollY;
  const app = document.getElementById('app');
  app.innerHTML = renderShell();
  document.documentElement.lang = state.lang === 'rw' ? 'rw' : 'en';
  document.body.classList.toggle('has-dialog', !!state.dialog);
  document.title = `${msg(state.route)} | AgriEmpower`;
  if (preserveScroll) window.scrollTo({top: y, behavior: 'auto'});
  if (state.dialog) document.querySelector('.dialog-close')?.focus({preventScroll: true});
}

let toastTimer;
function toast(message) {
  const region = document.getElementById('toast-region'); if (!region) return;
  region.innerHTML = `<div class="toast">${icon('check-circle', 19)} <span>${esc(message)}</span></div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { if (region.isConnected) region.innerHTML = ''; }, 3800);
}

function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  state.speaking = false;
}
function openDialog(dialog) { stopSpeech(); state.dialog = dialog; render(); }
function closeDialog() { stopSpeech(); state.dialog = null; render(); }
function setLanguage(lang) {
  if (!['en','rw'].includes(lang)) return;
  stopSpeech(); state.lang = lang; write('lang', lang); render();
}
function exportRecords() {
  const headers = ['Date','Crop','Harvest (kg)','Household food days (last 7)','Vegetable meal days (last 7)','Notes'];
  const rows = state.records.map(r => [r.date,r.crop,r.kg,r.foodDays ?? '',r.vegDays ?? '',r.notes || '']);
  downloadText('agriempower-farm-records.csv', asCSV([headers, ...rows]), 'text/csv;charset=utf-8');
}
function updateSearch(kind, input) {
  const value = input.value;
  const key = kind === 'lesson' ? 'lessonQuery' : 'resourceQuery';
  state[key] = value;
  const selection = input.selectionStart;
  render();
  const newInput = document.querySelector(`[data-search="${kind}"]`);
  newInput?.focus({preventScroll: true});
  if (selection != null) { try { newInput.setSelectionRange(selection, selection); } catch {} }
}

// Click delegation allows components to be regenerated without reattaching listeners.
document.addEventListener('click', event => {
  const navFilter = event.target.closest('[data-nav-filter]');
  if (navFilter) { state.lessonFilter = navFilter.dataset.navFilter; state.lessonQuery = ''; }
  const target = event.target.closest('[data-action]');
  if (!target) {
    if (event.target.closest('[data-dialog-backdrop]') && event.target === event.target.closest('[data-dialog-backdrop]')) closeDialog();
    return;
  }
  const action = target.dataset.action;
  const id = target.dataset.id;
  switch(action) {
    case 'toggle-mobile': state.mobileOpen = !state.mobileOpen; render(); break;
    case 'close-mobile': state.mobileOpen = false; render(); break;
    case 'set-language': setLanguage(target.dataset.lang); break;
    case 'open-lesson': if (lessons.some(l => l.id === id)) openDialog({type:'lesson', id}); break;
    case 'complete-lesson':
      if (!completedLesson(id) && lessons.some(l => l.id === id)) { state.completed.push(id); save('completed'); }
      render(); toast(msg('lessonDoneToast')); break;
    case 'close-dialog': closeDialog(); break;
    case 'filter-lessons': state.lessonFilter = target.dataset.category; render(); break;
    case 'filter-resources': state.resourceFilter = target.dataset.type; render(); break;
    case 'toggle-saved-filter': state.savedOnly = !state.savedOnly; render(); break;
    case 'toggle-save': {
      if (!resources.some(r => r.id === id)) break;
      state.saved = resourceSaved(id) ? state.saved.filter(x => x !== id) : [...state.saved, id];
      save('saved'); render(); break;
    }
    case 'open-resource': openDialog({type:'resource', id}); break;
    case 'download-template': {
      const r = resources.find(r => r.id === id && r.type === 'template');
      if (r) downloadText(r.fileName, r.csv, 'text/csv;charset=utf-8');
      break;
    }
    case 'print-guide': window.print(); break;
    case 'new-post': openDialog({type:'post'}); break;
    case 'prompt-post': {
      const s = discussionPrompts.find(p => p.id === id);
      if (s) openDialog({type:'post', prefill:{topic:s.category, title:loc(s.title)}});
      break;
    }
    case 'filter-posts': state.topicFilter = target.dataset.category; render(); break;
    case 'new-record': openDialog({type:'record'}); break;
    case 'delete-record': {
      if (!window.confirm(msg('deleteConfirm'))) break;
      state.records = state.records.filter(r => r.id !== id); save('records'); render(); toast(msg('recordDeleted')); break;
    }
    case 'export-records': exportRecords(); break;
    case 'new-mentor': openDialog({type:'mentor', specialty:target.dataset.specialty}); break;
    case 'new-support': openDialog({type:'support'}); break;
    case 'export-all': downloadText('agriempower-my-data.json', JSON.stringify({ exportedAt:new Date().toISOString(), data:exportSnapshot() }, null, 2), 'application/json;charset=utf-8'); toast(msg('exported')); break;
    case 'clear-all':
      if (!window.confirm(msg('clearConfirm'))) break;
      clearStorage();
      ['completed','saved','posts','records','mentorRequests','supportNotes'].forEach(key => { state[key] = []; });
      write('lang', state.lang); render(); toast(msg('cleared')); break;
    case 'speak-lesson': {
      if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) { toast(msg('audioUnsupported')); break; }
      if (state.speaking) { stopSpeech(); render(); break; }
      const lesson = lessons.find(l => l.id === id); if (!lesson) break;
      const message = [loc(lesson.title), loc(lesson.summary), ...lesson.steps.flatMap(s => [loc(s.title), loc(s.body)])].join('. ');
      const speech = new SpeechSynthesisUtterance(message);
      speech.lang = state.lang === 'rw' ? 'rw-RW' : 'en-US'; speech.rate = 0.86;
      speech.onend = () => { state.speaking = false; if (state.dialog?.type === 'lesson') render(); };
      speech.onerror = () => { state.speaking = false; if (state.dialog?.type === 'lesson') render(); };
      state.speaking = true; window.speechSynthesis.cancel(); window.speechSynthesis.speak(speech); render();
      break;
    }
  }
});

document.addEventListener('change', event => {
  if (event.target.matches('input[name="answer"]')) {
    if (state.dialog?.type === 'lesson') {
      state.quizAnswers[state.dialog.id] = Number(event.target.value);
      state.quizFeedback[state.dialog.id] = null;
      render();
    }
  }
});

document.addEventListener('input', event => {
  const kind = event.target.dataset?.search;
  if (kind === 'lesson' || kind === 'resource') updateSearch(kind, event.target);
});

document.addEventListener('submit', event => {
  const form = event.target.closest('[data-form]'); if (!form) return;
  event.preventDefault();
  const data = new FormData(form);
  const type = form.dataset.form;
  if (type === 'quiz') {
    const lesson = lessons.find(l => l.id === form.dataset.id);
    if (!lesson) return;
    const answer = data.get('answer');
    if (answer === null) { toast(msg('selectAnswer')); return; }
    state.quizAnswers[lesson.id] = Number(answer);
    state.quizFeedback[lesson.id] = Number(answer) === lesson.quiz.answer ? 'correct' : 'incorrect';
    render(); return;
  }
  if (type === 'post') {
    const title = String(data.get('title') || '').trim().slice(0,120);
    const body = String(data.get('body') || '').trim().slice(0,1000);
    if (!title || body.length < 5) { toast(msg('mandatory')); return; }
    state.posts.push({id:uid(), title, body, author:String(data.get('author') || '').trim().slice(0,40) || msg('postNamePlaceholder'), topic:data.get('topic') === 'nutrition' ? 'nutrition' : 'farming', date:new Date().toISOString(), replies:[]});
    save('posts'); closeDialog(); toast(msg('postedLocally')); return;
  }
  if (type === 'reply') {
    const text = String(data.get('reply') || '').trim().slice(0,500);
    if (!text) { toast(msg('mandatory')); return; }
    const post = state.posts.find(p => p.id === form.dataset.id);
    if (!post) return;
    if (!Array.isArray(post.replies)) post.replies = [];
    post.replies.push({id:uid(), text, date:new Date().toISOString()});
    save('posts'); render(); toast(msg('replyLocally')); return;
  }
  if (type === 'record') {
    const date = String(data.get('date') || '');
    const crop = String(data.get('crop') || '').trim().slice(0,60);
    const kg = clampNumber(data.get('kg'), 0, 1000000);
    const food = String(data.get('foodDays') ?? '').trim();
    const veg = String(data.get('vegDays') ?? '').trim();
    const foodDays = food === '' ? null : clampNumber(food, 0,7);
    const vegDays = veg === '' ? null : clampNumber(veg, 0,7);
    if (!isISODate(date)) { toast(msg('dateInvalid')); return; }
    if (!crop) { toast(msg('mandatory')); return; }
    if (kg === null) { toast(msg('quantityInvalid')); return; }
    if ((foodDays !== null && !Number.isInteger(foodDays)) || (vegDays !== null && !Number.isInteger(vegDays)) || (food && foodDays === null) || (veg && vegDays === null)) { toast(msg('rangeInvalid')); return; }
    state.records.push({ id:uid(), date, crop, kg, foodDays, vegDays, notes:String(data.get('notes') || '').trim().slice(0,500) });
    save('records'); closeDialog(); toast(msg('recordSaved')); return;
  }
  if (type === 'mentor' || type === 'support') {
    const question = String(data.get('question') || '').trim().slice(0,700);
    if (question.length < 5) { toast(msg('mandatory')); return; }
    const key = type === 'mentor' ? 'mentorRequests' : 'supportNotes';
    state[key].push({id:uid(),topic:String(data.get('topic') || ''),question,date:new Date().toISOString()});
    save(key); closeDialog(); toast(msg(type === 'mentor' ? 'mentorSaved' : 'supportSaved')); return;
  }
});

window.addEventListener('hashchange', () => {
  if (location.hash === '#main-content') return;
  stopSpeech(); state.dialog = null; state.mobileOpen = false;
  state.route = getRoute(location.hash); render({preserveScroll:false}); window.scrollTo(0, 0);
});
window.addEventListener('keydown', event => {
  if (!state.dialog) return;
  if (event.key === 'Escape') { closeDialog(); return; }
  if (event.key !== 'Tab') return;
  const dialog = document.querySelector('.dialog-window');
  if (!dialog) return;
  const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex=\"0\"]')].filter(el => el.getClientRects().length);
  if (!focusable.length) { event.preventDefault(); dialog.focus(); return; }
  if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
  else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
});

render({preserveScroll:false});
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
