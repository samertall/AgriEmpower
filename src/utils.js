export function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

export function clampNumber(raw, min, max) {
  const num = Number(raw);
  if (!Number.isFinite(num)) return null;
  if (num < min || num > max) return null;
  return num;
}

export function isISODate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return false;
  const d = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

export function asCSV(rows) {
  return rows.map(row => row.map(value => {
    let clean = String(value ?? '');
    // Neutralize formula injection when exported data is opened in a spreadsheet.
    if (/^[\s]*[=+@-]/.test(clean)) clean = `'${clean}`;
    return `"${clean.replaceAll('"', '""')}"`;
  }).join(',')).join('\r\n') + '\r\n';
}

export function uid() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function formatDate(date, lang = 'en') {
  try { return new Intl.DateTimeFormat(lang === 'rw' ? 'rw-RW' : 'en-GB', { day:'numeric', month:'short', year:'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`)); }
  catch { return date; }
}

export function downloadText(fileName, text, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = fileName; document.body.append(a); a.click(); a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function sumHarvest(records) {
  return records.reduce((total, entry) => total + (Number(entry.kg) || 0), 0);
}

export function getRoute(hash) {
  const candidate = String(hash || '').replace(/^#\/?/, '').split(/[/?]/)[0];
  return ['dashboard','learn','resources','community','impact','support'].includes(candidate) ? candidate : 'dashboard';
}
