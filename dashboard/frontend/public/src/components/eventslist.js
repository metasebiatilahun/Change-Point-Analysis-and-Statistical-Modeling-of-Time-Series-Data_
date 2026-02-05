import React from 'react';

const EventList = ({ events, selectedEvent, onEventSelect }) => {
  const eventTypes = ['All', 'Political', 'Economic', 'OPEC', 'Conflict', 'Natural'];
  const [filterType, setFilterType] = React.useState('All');

  const filteredEvents = filterType === 'All' 
    ? events 
    : events.filter(event => event.event_type === filterType);

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'increase': return '#e74c3c';
      case 'decrease': return '#3498db';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="event-list">
      <h3>Historical Events</h3>
      
      <div className="filter-controls">
        <label>Filter by type:</label>
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
        >
          {eventTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="events-container">
        {filteredEvents.map(event => (
          <div 
            key={event.event_id}
            className={`event-card ${selectedEvent?.event_id === event.event_id ? 'selected' : ''}`}
            onClick={() => onEventSelect(event)}
          >
            <div className="event-header">
              <span className="event-date">
                {new Date(event.event_date).toLocaleDateString()}
              </span>
              <span 
                className="event-impact-badge"
                style={{ backgroundColor: getImpactColor(event.expected_impact) }}
              >
                {event.expected_impact}
              </span>
            </div>
            <div className="event-name">{event.event_name}</div>
            <div className="event-type">{event.event_type}</div>
            <div className="event-description">{event.description}</div>
            
            {selectedEvent?.event_id === event.event_id && (
              <div className="event-actions">
                <button className="btn-analyze">Analyze Impact</button>
                <button className="btn-compare">Compare with Similar Events</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;