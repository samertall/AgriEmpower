// Isolate storage access so a private-mode or quota error does not crash the app.
const PREFIX = 'agriempower_v1_';
export const keys = ['completed', 'saved', 'posts', 'records', 'mentorRequests', 'supportNotes', 'lang'];
export function read(key, fallback) {
  try {
    const value = localStorage.getItem(PREFIX + key);
    return value === null ? fallback : JSON.parse(value);
  } catch { return fallback; }
}
export function write(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
  catch { return false; }
}
export function clear() {
  try { keys.forEach(key => localStorage.removeItem(PREFIX + key)); return true; }
  catch { return false; }
}
export function exportSnapshot() {
  const result = {};
  keys.forEach(key => { result[key] = read(key, key === 'lang' ? 'en' : []); });
  return result;
}
