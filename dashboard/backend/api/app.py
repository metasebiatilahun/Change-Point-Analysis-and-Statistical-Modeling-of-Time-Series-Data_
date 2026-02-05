from flask import Flask, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load data
df = pd.read_csv('data/BrentOilPrices.csv', parse_dates=['Date'])
events_df = pd.read_csv('data/historical_events.csv', parse_dates=['event_date'])

# Load model results
with open('data/model_results.json', 'r') as f:
    model_results = json.load(f)

@app.route('/')
def index():
    return jsonify({
        "message": "Brent Oil Price Analysis API",
        "endpoints": {
            "/api/prices": "Get historical prices",
            "/api/prices/<start_date>/<end_date>": "Get prices in date range",
            "/api/events": "Get historical events",
            "/api/changepoints": "Get detected change points",
            "/api/impact/<event_id>": "Get impact analysis for specific event"
        }
    })

@app.route('/api/prices')
def get_prices():
    """Return all historical prices"""
    result = df.to_dict(orient='records')
    return jsonify(result)

@app.route('/api/prices/<start_date>/<end_date>')
def get_prices_range(start_date, end_date):
    """Return prices within date range"""
    try:
        start = datetime.strptime(start_date, '%Y-%m-%d')
        end = datetime.strptime(end_date, '%Y-%m-%d')
        filtered = df[(df['Date'] >= start) & (df['Date'] <= end)]
        return jsonify(filtered.to_dict(orient='records'))
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

@app.route('/api/events')
def get_events():
    """Return all historical events"""
    result = events_df.to_dict(orient='records')
    return jsonify(result)

@app.route('/api/changepoints')
def get_changepoints():
    """Return detected change points with model parameters"""
    return jsonify(model_results['change_points'])

@app.route('/api/impact/<event_id>')
def get_impact(event_id):
    """Get impact analysis for specific event"""
    try:
        event = events_df[events_df['event_id'] == int(event_id)].iloc[0]
        
        # Find closest change point (simplified - in reality would use model output)
        event_date = event['event_date']
        
        # For demonstration, return simulated impact
        impact = {
            "event": event.to_dict(),
            "closest_change_point": "2020-04-15",
            "days_difference": 3,
            "price_before": 32.50,
            "price_after": 40.80,
            "absolute_change": 8.30,
            "percent_change": 25.5,
            "confidence_interval": [23.2, 27.8]
        }
        return jsonify(impact)
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@app.route('/api/statistics')
def get_statistics():
    """Return summary statistics"""
    stats = {
        "total_data_points": len(df),
        "date_range": {
            "start": df['Date'].min().strftime('%Y-%m-%d'),
            "end": df['Date'].max().strftime('%Y-%m-%d')
        },
        "price_statistics": {
            "mean": float(df['Price'].mean()),
            "median": float(df['Price'].median()),
            "std": float(df['Price'].std()),
            "min": float(df['Price'].min()),
            "max": float(df['Price'].max())
        },
        "total_events": len(events_df),
        "events_by_type": events_df['event_type'].value_counts().to_dict()
    }
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True, port=5000)