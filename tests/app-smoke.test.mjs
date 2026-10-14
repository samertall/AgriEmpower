import test from 'node:test';
import assert from 'node:assert/strict';

const store = new Map();
const root = { innerHTML: '' };
const events = {};
const windowEvents = {};
globalThis.localStorage = {
  getItem(k) { return store.has(k) ? store.get(k) : null; },
  setItem(k,v) { store.set(k, String(v)); },
  removeItem(k) { store.delete(k); }
};
globalThis.location = { hash:'' };
globalThis.document = {
  documentElement: { lang:'en' },
  body: { classList: { toggle() {} } },
  getElementById(id) { return id === 'app' ? root : null; },
  querySelector() { return { focus() {} }; },
  addEventListener(type, fn) { events[type] = fn; }
};
globalThis.window = {
  scrollY:0, scrollTo() {}, confirm() { return true; },
  addEventListener(type, fn) { windowEvents[type] = fn; }
};
globalThis.FormData = class {
  constructor(form) { this.data = form.values; }
  get(key) { return this.data[key] ?? null; }
};

await import('../src/app.js');
function click(action, props = {}) {
  const target = { dataset: {action, ...props }, closest(selector) { return selector === '[data-action]' ? this : null; } };
  events.click({ target });
}
function go(hash) { location.hash = hash; windowEvents.hashchange(); }
function submit(type, values, id = '') {
  const form = { dataset:{form:type,id}, values };
  events.submit({target:{closest() { return form; }}, preventDefault() {}});
}

test('renders initial dashboard without a browser framework', () => {
  assert.match(root.innerHTML, /hero-banner/);
  assert.match(root.innerHTML, /Grow better food/);
  assert.match(root.innerHTML, /dashboard/);
});
test('navigates to lessons and locally completes one', () => {
  go('#/learn');
  assert.match(root.innerHTML, /Learn at your own pace/);
  assert.equal((root.innerHTML.match(/class="lesson-card"/g) || []).length, 8);
  click('open-lesson', {id:'soil'});
  assert.match(root.innerHTML, /Look closely at your soil/);
  click('complete-lesson', {id:'soil'});
  assert.deepEqual(JSON.parse(store.get('agriempower_v1_completed')), ['soil']);
  click('close-dialog');
});
test('saves and bookmarks resources', () => {
  go('#/resources');
  assert.match(root.innerHTML, /Farm budget template/);
  click('toggle-save', {id:'soil-guide'});
  assert.deepEqual(JSON.parse(store.get('agriempower_v1_saved')), ['soil-guide']);
});
test('posts are local and user-entered HTML is escaped', () => {
  go('#/community');
  click('new-post');
  submit('post', {title:'Tips for beans',body:'What about <script>alert(1)</script>?', author:'Farmer', topic:'farming'});
  assert.match(root.innerHTML, /&lt;script&gt;/);
  assert.doesNotMatch(root.innerHTML, /<script>alert/);
  assert.equal(JSON.parse(store.get('agriempower_v1_posts')).length, 1);
});
test('impact form stores and displays validated harvest', () => {
  go('#/impact');
  click('new-record');
  submit('record', {date:'2026-10-14',crop:'Beans',kg:'12.5',foodDays:'5',vegDays:'4',notes:'Harvest note'});
  assert.equal(JSON.parse(store.get('agriempower_v1_records'))[0].kg, 12.5);
  assert.match(root.innerHTML, /12.5/);
  assert.match(root.innerHTML, /impact-chart/);
});
test('switches user interface and lesson text to Kinyarwanda', () => {
  go('#/learn');
  click('set-language', {lang:'rw'});
  assert.match(root.innerHTML, /Iga ku muvuduko wawe/);
  assert.match(root.innerHTML, /Tangirira ku butaka bwiza/);
});
