// Aadhaar Harm Database — Frontend
const API = 'aadhaar_harm_cases.json';

const SECTION_LABELS = {
  'A': 'A — Starvation Deaths',
  'B': 'B — Pension Issues',
  'C': 'C — NREGA Wage Issues',
  'D': 'D — Other Welfare Exclusions',
  'E': 'E — Citizenship & ID Exclusion',
  'F': 'F — School Enrollment & Midday Meals',
  'G': 'G — Bedridden/Sick/Disabled Exclusion',
  'H': 'H — Pension Life Certificate Failures',
  'I': 'I — Aggregate & Systemic Exclusions'
};

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
    opt.textContent = SECTION_LABELS[s] || `Section ${s}`;
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
  const uniqueSections = [...new Set(cases.map(c => c.section).filter(Boolean))];
  document.getElementById('total-sections').textContent = uniqueSections.length;
  const years = cases.map(c => parseInt(c.year)).filter(y => !isNaN(y));
  document.getElementById('latest-year').textContent = years.length ? Math.max(...years) : '—';
}

function renderTable() {
  const tbody = document.getElementById('cases-body');
  tbody.innerHTML = '';

  filtered.forEach(c => {
    const tr = document.createElement('tr');

    const addCell = (content, isHtml = false, title = '') => {
      const td = document.createElement('td');
      if (title) td.title = title;
      if (isHtml) {
        td.innerHTML = content;
      } else {
        td.textContent = content;
      }
      tr.appendChild(td);
    };

    // ID cell: show full section label as tooltip
    const sectionLabel = SECTION_LABELS[c.section] || `Section ${c.section}`;
    addCell(`<strong>${c.id}</strong>`, true, sectionLabel);

    addCell(c.case_type || '');
    addCell(c.name || '');
    addCell(c.gender || '');
    addCell(c.age || '');
    addCell(c.location || '');
    addCell(c.year || '');
    addCell(c.details || '');
    addCell(c.outcome || '');
    addCell(c.source || '', true); // Source may contain HTML links

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
