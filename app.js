// Aadhaar Harm Database — Frontend
const API = 'aadhaar_harm_cases.json';

let cases = [];
let filtered = [];

async function loadData() {
  try {
    const res = await fetch(API);
    cases = await res.json();
    filtered = [...cases];
    populateFilters();
    updateStats();
    renderTable();
  } catch (err) {
    console.error('Failed to load data:', err);
  }
}

function populateFilters() {
  const sections = [...new Set(cases.map(c => c.section).filter(Boolean))].sort();
  const types = [...new Set(cases.map(c => c.case_type).filter(Boolean))].sort();

  const sectionSel = document.getElementById('section-filter');
  const typeSel = document.getElementById('type-filter');

  sections.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = `Section ${s}`;
    sectionSel.appendChild(opt);
  });

  types.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    typeSel.appendChild(opt);
  });
}

function updateStats() {
  document.getElementById('total-cases').textContent = cases.length;
  document.getElementById('total-sections').textContent = [...new Set(cases.map(c => c.section))].length;
  const years = cases.map(c => parseInt(c.year)).filter(y => !isNaN(y));
  document.getElementById('latest-year').textContent = years.length ? Math.max(...years) : '—';
}

function renderTable() {
  const tbody = document.getElementById('cases-body');
  tbody.innerHTML = '';

  filtered.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(c.id)}</strong></td>
      <td>${escapeHtml(c.case_type || '')}</td>
      <td>${escapeHtml(c.name || '')}</td>
      <td>${escapeHtml(c.gender || '')}</td>
      <td>${escapeHtml(c.age || '')}</td>
      <td>${escapeHtml(c.location || '')}</td>
      <td>${escapeHtml(c.year || '')}</td>
      <td>${escapeHtml(c.details || '')}</td>
      <td>${escapeHtml(c.outcome || '')}</td>
      <td>${escapeHtml(c.source || '')}</td>
    `;
    tbody.appendChild(tr);
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}

function applyFilters() {
  const search = document.getElementById('search').value.toLowerCase();
  const section = document.getElementById('section-filter').value;
  const type = document.getElementById('type-filter').value;

  filtered = cases.filter(c => {
    if (search) {
      const haystack = (c.name + c.details + c.outcome + c.location + c.source).toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (section && c.section !== section) return false;
    if (type && c.case_type !== type) return false;
    return true;
  });

  updateStatsCount(filtered.length);
  renderTable();
}

function updateStatsCount(count) {
  document.getElementById('total-cases').textContent = count;
}

// Event listeners
document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('section-filter').addEventListener('change', applyFilters);
document.getElementById('type-filter').addEventListener('change', applyFilters);

// Initial load
loadData();
