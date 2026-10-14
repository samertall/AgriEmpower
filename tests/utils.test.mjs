import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeHTML, clampNumber, isISODate, asCSV, getRoute, sumHarvest } from '../src/utils.js';
import { lessons, resources } from '../src/data.js';
import { t, localize } from '../src/i18n.js';

test('escapes user-generated HTML before rendering', () => {
  assert.equal(escapeHTML('<img src="x" onerror=\'x\'>&'), '&lt;img src=&quot;x&quot; onerror=&#39;x&#39;&gt;&amp;');
});
test('validates dates and numeric ranges', () => {
  assert.equal(isISODate('2026-02-29'), false);
  assert.equal(isISODate('2024-02-29'), true);
  assert.equal(isISODate('2026-03-03'), true);
  assert.equal(clampNumber('-1',0,7), null);
  assert.equal(clampNumber('8',0,7), null);
  assert.equal(clampNumber('6',0,7), 6);
});
test('neutralizes CSV formulas and quotes values', () => {
  assert.equal(asCSV([['name','amount'],['=HYPERLINK("x")','50']]), '"name","amount"\r\n"\'=HYPERLINK(""x"")","50"\r\n');
});
test('maps direct and unknown routes safely', () => {
  assert.equal(getRoute('#/community'), 'community');
  assert.equal(getRoute('#/learn?cat=nutrition'), 'learn');
  assert.equal(getRoute('#/does-not-exist'), 'dashboard');
});
test('totals only numeric harvest values', () => {
  assert.equal(sumHarvest([{kg:10},{kg:'5.5'},{kg:0}]), 15.5);
});
test('starter curriculum has translated unique lessons and a quiz', () => {
  assert.equal(lessons.length, 8);
  assert.equal(new Set(lessons.map(x=>x.id)).size, lessons.length);
  lessons.forEach(l => {
    assert.ok(l.title.en && l.title.rw && l.steps.length >= 3);
    assert.ok(l.quiz.choices.length >= 2);
    assert.ok(l.quiz.answer < l.quiz.choices.length);
    assert.ok(localize(l.title,'rw'));
  });
});
test('templates and external links are provided', () => {
  assert.ok(resources.some(x => x.type === 'template'));
  assert.ok(resources.some(x => x.type === 'guide'));
  assert.ok(resources.some(x => x.type === 'external' && x.url.startsWith('https://')));
});
test('translations fall back to English', () => {
  assert.equal(t('dashboard','rw'), 'Ahabanza');
  assert.equal(t('heroTitle','zz'), t('heroTitle','en'));
});
