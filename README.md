
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



Here's a **complete and updated `README.md`** for your GitHub repository [`biomarker_dashboard`](https://github.com/Yallappagouda/biomarker_dashboard), including:

* 🎯 Project overview
* 💡 Key features
* 🛠️ Tech stack
* 📁 Project structure
* 🚀 Deployment steps for both **frontend (Vercel)** and **backend (Render)**
* 🧪 Sample data
* 📌 Future improvements

---

### ✅ `README.md` (Place in root folder)

```markdown
# 🧬 EcoTown Biomarker Dashboard

An interactive and responsive web dashboard that allows users to upload health reports (CSV or PDF), extract biomarker data, visualize trends over time, and compare them with clinical reference ranges.

---

## 🎯 Purpose

This project helps users monitor key health biomarkers over time using visual graphs and status indicators. Built for clinical clarity and user-friendliness, it's ideal for tracking lipid profiles, vitamin levels, and diabetic indicators.

---

## 💡 Key Features

- 📤 Upload CSV or PDF lab reports  
- 📊 Visualize biomarker trends via interactive charts (Chart.js)  
- ⚕️ Compare values with clinical reference ranges  
- ✅ Status indicators: Normal, High, or Low  
- 📱 Fully responsive & mobile-friendly UI  
- 🧪 Includes sample data auto-load for demo  
- 📥 Export visualizations as PNG, PDF, or CSV  
- 🐍 Flask backend for PDF parsing (using `pdfplumber`)

---

## 🧩 Tech Stack

| Category      | Technology Used                                 |
|---------------|--------------------------------------------------|
| Frontend      | HTML5, CSS3, Bootstrap 5, JavaScript, Chart.js   |
| Backend       | Python, Flask, pdfplumber                        |
| Data Parsing  | `PapaParse` (CSV), `pdfplumber` (PDF)            |
| Deployment    | Vercel (Frontend), Render (Backend)              |
| Version Control | Git & GitHub                                   |

---

## 📁 Project Structure

```

biomarker\_dashboard/
├── index.html                  # Frontend UI
├── style.css                   # Dashboard styles
├── script.js                   # Frontend JS logic
├── assets/
│   └── data/
│       └── sample\_data.csv     # Default sample data
├── backend/
│   └── app.py                  # Flask backend for PDF parsing
├── README.md                   # Documentation

````

---

## 📦 Requirements

### Backend (Python)
- Flask
- Flask-CORS
- pdfplumber
- gunicorn

Install dependencies:

```bash
cd backend
pip install -r requirements.txt
````

> Create `requirements.txt`:

```txt
flask
flask-cors
pdfplumber
gunicorn
```

---

## 🚀 Deployment Instructions

### 1️⃣ Frontend on Vercel

1. Go to [https://vercel.com](https://vercel.com) and log in.
2. Create a **new project** and import your **GitHub repo**.
3. In the Vercel dashboard:

   * **Framework Preset:** Other
   * **Output Directory:** `.` (root)
   * **Build Command:** *(leave blank)*
4. Deploy the project.
5. You’ll get a live link like:
   `https://ecotown-frontend.vercel.app/`

> ✅ Ensure the frontend fetches the correct backend URL:
> In `script.js`, update:

```js
const apiEndpoint = 'https://your-backend-service.onrender.com/upload';
```

---

### 2️⃣ Backend on Render

1. Visit [https://render.com](https://render.com)
2. Sign in → Create a **new Web Service**
3. Connect your GitHub repo
4. Set options:

```
Runtime: Python 3.10+
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
Root Directory: backend
```

5. Set up `Flask-CORS` to allow requests from your frontend domain.

> Your API will be available at:

```
https://your-backend-service.onrender.com/upload
```

---

## 🧪 Sample Report Flow

* If no file is uploaded, the dashboard auto-loads the CSV from:

```
assets/data/sample_data.csv
```

* Sample fields:

```csv
name,date,total_cholesterol,ldl,hdl,triglycerides,creatinine,vitamin_d,vitamin_b12,hba1c
John Doe,2024-05-01,175,115,48,120,0.8,35,380,5.6
```

---

## 🧾 API (Backend `/upload`)

* **POST /upload**

  * Accepts: `multipart/form-data`
  * Supported files: `.csv`, `.pdf`
  * Returns: JSON with biomarker values

---

## 📌 Future Enhancements

* User authentication (login/logout)
* Doctor portal to view multiple patient reports
* Health recommendations based on values
* PDF to CSV historic data merge
* Better error handling and analytics

---

## 👨‍💻 Developed By

**Yallappagouda Patil**
Department of ISE, Malnad College of Engineering
GitHub: [@Yallappagouda](https://github.com/Yallappagouda)

---

## 📬 Feedback

If you have suggestions or find bugs, feel free to open an issue or reach out on LinkedIn/GitHub.
Thank you for visiting this project!

```

---

Would you like me to directly generate this `README.md` file for you to upload to your repo?
```
