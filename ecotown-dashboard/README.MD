
# 🧬 EcoTown Biomarker Dashboard

A modern, responsive clinical health report analyzer that allows users to upload **CSV or PDF** health data and visualize **biomarker trends over time** with clinical range comparison.

---

## 📌 Project Purpose

EcoTown Health Dashboard empowers individuals to understand their **health trends** using lab data. It auto-extracts biomarker values and displays them with clinical significance in a colorful, responsive dashboard.

---

## 🧩 Features

✅ Upload PDF and CSV reports  
✅ Auto-loads sample data for demo mode  
✅ Beautiful line charts using Chart.js  
✅ Clinical range comparison with color-coded badges  
✅ Icons for each biomarker  
✅ Export as PNG, PDF, or CSV  
✅ View all biomarkers or select individually  
✅ Fully responsive layout for mobile, tablet, and desktop  

---

## 💡 Technologies Used

| Layer        | Tools/Technologies                      |
|--------------|------------------------------------------|
| **Frontend** | HTML5, CSS3, Bootstrap 5, JavaScript     |
| **Charts**   | Chart.js                                 |
| **Parsing**  | PapaParse.js (CSV), pdf.js (PDF)         |
| **Export**   | html2canvas, jsPDF                       |
| **Icons**    | Emojis (inline)                          |
| **Responsive** | Flexbox, media queries                 |
| **Version Control** | Git & GitHub                      |
| **Deployment** | Vercel                                 |

---

## 🛠️ Folder Structure

```
ecotown-dashboard/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── data/
│       └── sample_data.csv
└── README.md
```

---

## 🧪 Setup Instructions (VSCode)

```bash
# 1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/biomarker_dashboard.git
cd biomarker_dashboard

# 2. Open in VSCode
code .

# 3. Start live preview (use Live Server Extension)
# Right-click index.html and choose "Open with Live Server"

# 4. To deploy on GitHub:
git init
git remote add origin https://github.com/YOUR_USERNAME/biomarker_dashboard.git
git add .
git commit -m "Initial commit with biomarker dashboard"
git push -u origin main
```

---

## 🚀 Vercel Deployment

1. Visit [vercel.com](https://vercel.com) and sign in.
2. Click **New Project** → Import GitHub Repo.
3. Choose this repo → Set output directory to `.`.
4. Click **Deploy**.

Your dashboard will be live at: `https://your-project-name.vercel.app`

---

## 📂 Sample CSV Format

```csv
date,name,total_cholesterol,ldl,hdl,triglycerides,creatinine,vitamin_d,vitamin_b12,hba1c
2024-01-10,John Doe,180,110,50,145,1.0,30,460,5.4
2024-02-10,John Doe,185,115,48,135,1.0,28,380,5.6
```

---

## 📈 Clinical Reference Ranges

- **Total Cholesterol:** 125–200 mg/dL  
- **LDL:** 0–130 mg/dL  
- **HDL:** 40–60 mg/dL  
- **Triglycerides:** 0–150 mg/dL  
- **Creatinine:** 0.6–1.3 mg/dL  
- **Vitamin D:** 30–100 ng/mL  
- **Vitamin B12:** 200–900 pg/mL  
- **HbA1c:** 4.0–5.6%  

---

## 👨‍⚕️ Author & Acknowledgments

Built by Yallappagouda Patil 💙  
Inspiration: EcoTown Hackathon | Guided by Shreyas Sir  

---

_Last updated: 2025-06-20_
