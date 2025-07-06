// chart config
const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

let data = [
    {name:'Apples' , value: 45},
    {name:'Banana' , value: 50},
    {name:'Mango' , value: 25},
    {name:'Orange' , value: 15},
    {name:'Grapes' , value: 45},
]


const svg =d3.select("#bar-chart")
    .attr("width",800)
    .attr("height",500);

const chartGroup = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

const xScale = d3.scaleBand().range([0,width]).padding(0.1);
const yScale = d3.scaleLinear().range([height,0]);

const xAxisGroup =chartGroup.append("g").attr("transform",`translate(0,${height})`).attr("class","x-axis");
const yAxisGroup =chartGroup.append("g").attr("class","y-axis");;

function updateChart(newData){
    data = newData;
    xScale.domain(data.map((d)=> d.name));
    yScale.domain([0,d3.max(data,(d)=>d.value)]);

    xAxisGroup.call(d3.axisBottom(xScale));
    yAxisGroup.call(d3.axisLeft(yScale));

    const bars = chartGroup.selectAll(".bar").data(data,(d)=>d.name);

    bars
        .enter()
        .append("rect")
        .attr("class","bar")
        .attr("x",(d)=>xScale(d.name))
        .attr("y",height)
        .attr("width",xScale.bandwidth())
        .attr("height",0)
        .attr("fill","#12bfa2")
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x",(d)=>xScale(d.name))
        .attr("y",(d)=>yScale(d.value))
        .attr("width",xScale.bandwidth())
        .attr("height",(d)=>height-yScale(d.value));

    bars.exit()
    .transition()
    .duration(500)
    .attr("y",height)
    .attr("height",0)
    .remove();
}

//Button handlers
d3.select("#add-data").on("click",()=>{
    const fruits = ["kiwis","straberris","Blueberry","Cherries","plums"]
    const available =fruits.find((f)=> !data.some((d)=>d.name === f));
    if(available){
        updateChart([
            ...data,
            {name : available , value :Math.floor(Math.random()*40)+10 },
        ])
    }else{
        window.alert("No fruits available to add");
    }
});

d3.select("#remove-data").on("click",()=>{
    if(data.length>1){
        updateChart(data.slice(0,-1));
    }
});

d3.select("#sort-data").on("click",()=>{
    const sorted =[...data].sort((a,b)=> b.value -a.value);
    updateChart(sorted);
});

d3.select("#update-data").on("click",()=>{
    data.map((d)=>({
        ...d, value: Math.floor(Math.random()*50)
    }))
});

updateChart(data);
