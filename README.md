# Change-Point-Analysis-and-Statistical-Modeling-of-Time-Series-Data_

# Brent Oil Price Analysis Dashboard - Setup Guide

## Prerequisites
- Python 3.8+
- Node.js 14+
- Git

## Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend

   ## Create virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install dependencies:
pip install -r requirements.txt

## Run Flask server:

python app.py

Frontend Setup
Navigate to frontend directory:
cd frontend
Install dependencies:
## npm install

# Run React development server:
npm start

API Endpoints
GET /api/prices - All historical prices

GET /api/events - All historical events

GET /api/changepoints - Detected change points

GET /api/statistics - Summary statistics

Features
Interactive price timeline with D3.js

Event filtering and highlighting

Change point visualization

Responsive design for all devices


---

## **📅 SUBMISSION CHECKLISTS**

### **Interim Submission (Feb 08, 8:00 PM UTC):**
- [ ] GitHub repository link shared
- [ ] Task 1 deliverables completed:
  - [ ] Analysis workflow document (1-2 pages)
  - [ ] Historical events dataset (CSV, 15+ events)
  - [ ] Assumptions and limitations documented
- [ ] Initial EDA findings included
- [ ] Repository includes README with setup instructions

### **Final Submission (Feb 10, 8:00 PM UTC):**
- [ ] Complete GitHub repository with all code
- [ ] Final report (Medium-style blog post or PDF) containing:
  - [ ] Executive summary
  - [ ] Complete methodology
  - [ ] Key findings with visualizations
  - [ ] Quantified impact statements
  - [ ] Dashboard screenshots
  - [ ] Limitations and future work
- [ ] Working Flask backend with API endpoints
- [ ] React frontend with interactive visualizations
- [ ] All code properly documented
- [ ] README files with setup instructions

---

## **🔧 TECHNICAL IMPLEMENTATION NOTES**

### **For Change Point Model:**
1. **Convergence Checking**: Always check R-hat values and trace plots
2. **Multiple Chains**: Run at least 4 chains for reliable inference
3. **Prior Sensitivity**: Test different priors to ensure robustness
4. **Model Comparison**: Consider WAIC or LOO for model selection

### **For Dashboard:**
1. **CORS Configuration**: Ensure Flask CORS is properly configured
2. **Error Handling**: Implement comprehensive error handling
3. **Performance**: Use pagination for large datasets
4. **Testing**: Write unit tests for critical components

### **Best Practices:**
1. **Version Control**: Commit frequently with descriptive messages
2. **Documentation**: Document all functions and components
3. **Code Organization**: Follow modular design principles
4. **User Experience**: Prioritize intuitive interface design
