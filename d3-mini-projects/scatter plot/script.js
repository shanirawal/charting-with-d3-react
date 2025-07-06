const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

function generateScatterData(count = 100) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const category = Math.floor(Math.random() * 3);
    let x, y;
    if (category === 0) {
      x = Math.random() * 60 + 20;
      y = x * 0.6 + Math.random() * 20 + 10;
    } else if (category === 1) {
      x = Math.random() * 60 + 20;
      y = 100 - x * 0.6 + Math.random() * 15;
    } else {
      x = Math.random() * 80 + 10;
      y = Math.random() * 80 + 10;
    }
    data.push({ id: i, x, y, category });
  }
  return data;
}

let data = generateScatterData();

const svg = d3.select("#scatter-plot")
  .attr("width", 800)
  .attr("height", 500);

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.x))
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.y))
  .range([height, 0]);

const colorScale = d3.scaleOrdinal()
  .domain([0, 1, 2])
  .range(["steelblue", "orange", "green"]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

chartGroup.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(xAxis);

chartGroup.append("g")
  .call(yAxis);

chartGroup.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.x))
  .attr("cy", d => yScale(d.y))
  .attr("r", 5)
  .attr("fill", d => colorScale(d.category));

//  Add axis labels
chartGroup.append("text")
  .attr("x", width / 2)
  .attr("y", height + 40)
  .attr("text-anchor", "middle")
  .text("X Axis");

chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", -35)
  .attr("text-anchor", "middle")
  .text("Y Axis");

// Add legend
const legend = chartGroup.selectAll(".legend")
  .data(colorScale.domain())
  .enter()
  .append("g")
  .attr("class", "legend")
  .attr("transform", (d, i) => `translate(0,${i * 20})`);

legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", colorScale);

legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(d => `Category ${d}`);
