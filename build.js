// Leest alle markdown-verslagen uit content/reports en zet ze om naar reports.json
// Dit script draait automatisch bij elke Netlify build (zie netlify.toml).
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const reportsDir = path.join(__dirname, 'content', 'reports');
const outFile = path.join(__dirname, 'reports.json');

let reports = [];

if (fs.existsSync(reportsDir)) {
  const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.md'));
  reports = files.map(f => {
    const raw = fs.readFileSync(path.join(reportsDir, f), 'utf8');
    const { data, content } = matter(raw);
    const gallery = (data.gallery || [])
      .map(g => (typeof g === 'string' ? g : g && g.image))
      .filter(Boolean);
    return {
      id: f.replace(/\.md$/, ''),
      title: data.title || '',
      race: data.race || '',
      date: data.date ? new Date(data.date).toISOString().slice(0, 10) : '',
      location: data.location || '',
      stats: data.stats || '',
      cover: data.cover || '',
      gallery,
      story: (content || '').trim(),
    };
  });
}

reports.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

fs.writeFileSync(outFile, JSON.stringify(reports, null, 2));
console.log(`Gegenereerd: ${reports.length} verslag(en) -> reports.json`);
