import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PriceChart = ({ data, changePoints, selectedEvent }) => {
  const chartRef = useRef();
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };
  const width = 1000 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  useEffect(() => {
    if (!data.length) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse dates
    const parseDate = d3.timeParse('%Y-%m-%d');
    data.forEach(d => {
      d.Date = parseDate(d.Date);
      d.Price = +d.Price;
    });

    // Scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.Date))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Price) * 1.1])
      .range([height, 0]);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat('')
      );

    // Line generator
    const line = d3.line()
      .x(d => xScale(d.Date))
      .y(d => yScale(d.Price))
      .curve(d3.curveMonotoneX);

    // Draw price line
    svg.append('path')
      .datum(data)
      .attr('class', 'price-line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#3498db')
      .attr('stroke-width', 2);

    // Add change point markers
    changePoints.forEach(cp => {
      const cpDate = parseDate(cp.date);
      svg.append('line')
        .attr('class', 'change-point-line')
        .attr('x1', xScale(cpDate))
        .attr('x2', xScale(cpDate))
        .attr('y1', 0)
        .attr('y2', height)
        .attr('stroke', '#e74c3c')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');

      // Add change point label
      svg.append('text')
        .attr('class', 'change-point-label')
        .attr('x', xScale(cpDate))
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .text(`Change Point`)
        .style('font-size', '12px')
        .style('fill', '#e74c3c');
    });

    // Highlight selected event
    if (selectedEvent) {
      const eventDate = parseDate(selectedEvent.event_date);
      svg.append('circle')
        .attr('class', 'event-marker')
        .attr('cx', xScale(eventDate))
        .attr('cy', yScale(data.find(d => 
          d.Date.getTime() === eventDate.getTime())?.Price || 0))
        .attr('r', 6)
        .attr('fill', '#2ecc71')
        .attr('stroke', '#27ae60')
        .attr('stroke-width', 2);
    }

    // Add labels
    svg.append('text')
      .attr('transform', `translate(${width/2},${height + margin.top + 20})`)
      .style('text-anchor', 'middle')
      .text('Date');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Price (USD per Barrel)');

  }, [data, changePoints, selectedEvent, width, height, margin]);

  return (
    <div className="price-chart">
      <h2>Brent Oil Price Timeline</h2>
      <div ref={chartRef}></div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{backgroundColor: '#3498db'}}></span>
          <span>Oil Price</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{backgroundColor: '#e74c3c'}}></span>
          <span>Change Point</span>
        </div>
        {selectedEvent && (
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: '#2ecc71'}}></span>
            <span>Selected Event: {selectedEvent.event_name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChart;