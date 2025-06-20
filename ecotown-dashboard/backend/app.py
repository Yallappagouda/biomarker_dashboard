from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import io
import csv

app = Flask(__name__)
CORS(app)

@app.route('/extract', methods=['POST'])
def extract_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    pdf_file = request.files['file']
    if not pdf_file.filename.endswith('.pdf'):
        return jsonify({'error': 'Invalid file type'}), 400

    text_lines = []
    try:
        with pdfplumber.open(pdf_file.stream) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    text_lines.extend(text.split('\n'))

        # Custom biomarker parsing logic
        biomarkers = {
            'total_cholesterol': '',
            'ldl': '', 'hdl': '',
            'triglycerides': '', 'creatinine': '',
            'vitamin_d': '', 'vitamin_b12': '',
            'hba1c': '', 'name': '', 'date': ''
        }

        for line in text_lines:
            line_lower = line.lower()
            for key in biomarkers:
                if key.replace('_', ' ') in line_lower:
                    parts = line.split()
                    value = next((p for p in parts if p.replace('.', '', 1).isdigit()), '')
                    if value:
                        biomarkers[key] = value

        biomarkers['date'] = '2025-06-20'  # Hardcoded or extract from PDF
        biomarkers['name'] = 'Patient A'   # You can enhance this extraction

        # Convert to CSV
        csv_buffer = io.StringIO()
        writer = csv.DictWriter(csv_buffer, fieldnames=biomarkers.keys())
        writer.writeheader()
        writer.writerow(biomarkers)

        return jsonify({'data': csv_buffer.getvalue()})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
