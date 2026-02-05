import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Filters = ({ dateRange, onDateChange, onReset }) => {
  const [startDate, setStartDate] = useState(new Date(dateRange.start));
  const [endDate, setEndDate] = useState(new Date(dateRange.end));

  const handleApply = () => {
    onDateChange({
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    });
  };

  return (
    <div className="filters-panel">
      <h3>Filters</h3>
      
      <div className="filter-group">
        <label>Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="filter-group">
        <label>End Date</label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="filter-group">
        <label>Price Range ($)</label>
        <div className="range-inputs">
          <input type="number" placeholder="Min" />
          <span>to</span>
          <input type="number" placeholder="Max" />
        </div>
      </div>

      <div className="filter-buttons">
        <button className="btn-apply" onClick={handleApply}>
          Apply Filters
        </button>
        <button className="btn-reset" onClick={onReset}>
          Reset All
        </button>
      </div>
    </div>
  );
};

export default Filters;