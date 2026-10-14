import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve, extname, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.json':'application/json', '.webmanifest':'application/manifest+json', '.txt':'text/plain' };
const server = http.createServer(async (req, res) => {
  try {
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); return res.end('Method not allowed'); }
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const file = resolve(root, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); return res.end('Forbidden'); }
    if (pathname.startsWith('/dist/') || pathname.startsWith('/.git') || pathname.startsWith('/scripts/') || pathname.startsWith('/tests/')) { res.writeHead(404); return res.end('Not found'); }
    const s = await stat(file);
    if (!s.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const body = await readFile(file);
    res.writeHead(200, {'content-type': `${types[extname(file)] || 'application/octet-stream'}; charset=utf-8`, 'cache-control':'no-cache'});
    if (req.method === 'HEAD') res.end(); else res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(port, '0.0.0.0', () => console.log(`AgriEmpower running at http://localhost:${port}`));
