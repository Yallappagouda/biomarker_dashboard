let biomarkerData = [];
let selectedBiomarker = '';
let chart;

const biomarkerRanges = {
  total_cholesterol: { min: 125, max: 200, unit: "mg/dL" },
  ldl: { min: 0, max: 130, unit: "mg/dL" },
  hdl: { min: 40, max: 60, unit: "mg/dL" },
  triglycerides: { min: 0, max: 150, unit: "mg/dL" },
  creatinine: { min: 0.6, max: 1.3, unit: "mg/dL" },
  vitamin_d: { min: 30, max: 100, unit: "ng/mL" },
  vitamin_b12: { min: 200, max: 900, unit: "pg/mL" },
  hba1c: { min: 4.0, max: 5.6, unit: "%" }
};

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', handleFileUpload);

  loadSampleData();

  document.getElementById('showAllBtn').addEventListener('click', () => {
    drawAllBiomarkers();
    updateClinicalRanges(); // Show full reference
  });
});

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const csv = e.target.result;
    parseCSV(csv);
  };
  reader.readAsText(file);
}

function loadSampleData() {
  fetch('assets/data/sample_data.csv')
    .then(res => res.text())
    .then(parseCSV)
    .catch(err => alert("⚠ Failed to load sample data: " + err));
}

function parseCSV(csv) {
  const parsed = Papa.parse(csv, { header: true });
  biomarkerData = parsed.data.filter(row => row.date);

  if (!selectedBiomarker && biomarkerData.length > 0) {
    selectedBiomarker = Object.keys(biomarkerData[0]).find(k => k !== 'date' && k !== 'name');
  }

  updateTabs();
  updateChart();
  updateInsightCards();
  updateClinicalRanges();
}

function updateTabs() {
  const tabs = document.getElementById('biomarkerTabs');
  tabs.innerHTML = '';

  const keys = Object.keys(biomarkerData[0]).filter(k => k !== 'date' && k !== 'name');

  keys.forEach(key => {
    const btn = document.createElement('button');
    btn.textContent = key.toUpperCase();
    btn.className = `btn btn-sm ${selectedBiomarker === key ? 'btn-primary' : 'btn-outline-primary'}`;
    btn.dataset.key = key;
    btn.onclick = () => {
      selectedBiomarker = key;
      updateChart();
      updateInsightCards();
      updateClinicalRanges(key);
    };
    tabs.appendChild(btn);
  });
}

function getStatus(key, value) {
  const range = biomarkerRanges[key];
  if (!range || isNaN(value)) return '⚠ Unknown';

  if (value < range.min) return '⬇ Low';
  if (value > range.max) return '⬆ High';
  return '✅ Normal';
}

function updateInsightCards() {
  const grid = document.getElementById('insightGrid');
  if (!grid) return;

  const latest = biomarkerData[biomarkerData.length - 1];
  grid.innerHTML = '';

  Object.keys(latest).forEach(key => {
    if (key === 'date' || key === 'name') return;
    const val = parseFloat(latest[key]);
    const status = getStatus(key, val);
    const unit = biomarkerRanges[key]?.unit || '';

    const div = document.createElement('div');
    div.className = 'insight-card';
    div.innerHTML = `
      <h6>${key.toUpperCase()}</h6>
      <p><strong>${val} ${unit}</strong></p>
      <span class="badge ${status.includes('Normal') ? 'bg-success' : status.includes('High') ? 'bg-danger' : 'bg-warning'}">${status}</span>
    `;
    grid.appendChild(div);
  });
}

function updateChart() {
  if (!biomarkerData || biomarkerData.length === 0) return;

  const ctx = document.getElementById('mainChart').getContext('2d');
  const labels = biomarkerData.map(row => row.date);
  const values = biomarkerData.map(row => parseFloat(row[selectedBiomarker]));

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: selectedBiomarker.toUpperCase(),
        data: values,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: '#4fc3f7',
        tension: 0.1,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: `${selectedBiomarker.toUpperCase()} Levels Over Time`
        }
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });

  const latest = biomarkerData[biomarkerData.length - 1];
  const patientName = latest.name || 'Unknown';
  const latestDate = latest.date;

  document.getElementById('chartTitle').innerHTML =
    `🧑‍⚕️ <strong>${patientName}</strong> &nbsp;&nbsp;&nbsp; 📅 Latest Report Date: ${latestDate}`;
}

function drawAllBiomarkers() {
  const ctx = document.getElementById('mainChart').getContext('2d');
  const labels = biomarkerData.map(row => row.date);
  const biomarkerKeys = Object.keys(biomarkerData[0]).filter(k => k !== 'date' && k !== 'name');

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: biomarkerKeys.map(key => ({
        label: key.toUpperCase(),
        data: biomarkerData.map(row => parseFloat(row[key])),
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.3,
        pointRadius: 3
      }))
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: '📈 All Biomarkers Comparison'
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  const latest = biomarkerData[biomarkerData.length - 1];
  document.getElementById('chartTitle').innerHTML =
    `🧑‍⚕️ <strong>${latest.name}</strong> &nbsp;&nbsp;&nbsp; 📅 Latest Report Date: ${latest.date}`;
}

function updateClinicalRanges(focusKey = null) {
  const target = document.getElementById('clinicalRanges');
  if (!target) return;
  target.innerHTML = '';

  const keys = focusKey ? [focusKey] : Object.keys(biomarkerRanges);
  keys.forEach(key => {
    const r = biomarkerRanges[key];
    const label = key.replace('_', ' ').toUpperCase();
    target.innerHTML += `<div><strong>${label}:</strong> ${r.min}–${r.max} ${r.unit}</div>`;
  });
}

function exportCSV() {
  if (!biomarkerData.length) return;
  const csv = Papa.unparse(biomarkerData);
  downloadFile(csv, 'biomarkers.csv', 'text/csv');
}

function exportPNG() {
  html2canvas(document.querySelector('#mainChart')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

function exportPDF() {
  html2canvas(document.querySelector('#mainChart')).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new window.jspdf.jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 120);
    pdf.save('biomarkers.pdf');
  });
}

function downloadFile(data, filename, type) {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 155) + 100;
  const g = Math.floor(Math.random() * 155) + 100;
  const b = Math.floor(Math.random() * 155) + 100;
  return `rgba(${r}, ${g}, ${b}, 0.7)`;
}
