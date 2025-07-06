//chart config

const margin = {top: 20 ,right: 30 ,bottom: 50,left: 50};
const width = 800 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

let data = [];

const startDate = new Date("2025-01-01");

//generate initial data
function generateInitialData(){
    data=[];
    for(let i=0;i<10;i++){
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i * 7);

        const values ={
            date:date,
            value : Math.random() * 80 +20 + Math.sin(i * 0.5)*10, 
        };
        data.push(values);
    }
}

generateInitialData();

//create svgs and chart group

const svg = d3
    .select("#line-chart")
    .attr("width" , 800)
    .attr("height" , 500);

const chartGroup = svg.append("g").attr(`transform`,`translate(${margin.left} , ${margin.top})`);

//create scales
const xScale = d3.scaleTime().range((0,width));

const yScale =d3.scaleLinear().range([height , 0]);

const line = d3.line().x((d)=> xScale(d.date)).y((d)=> yScale(d.values)).curve(d3.curveMonotoneX);

const xAxis= d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d/%m"));
const yAxis = d3.axisLeft(yScale);

const xAxisGroup = chartGroup.append("g").attr("class","axis x-axis").attr("transform",`translate(0 ,${height})`);


const yAxisGroup = chartGroup.append("g").attr("class","axis y-axis");

//abel x axis
chartGroup
.append("text")
.attr("class" ,"axis-label")
.attr("x",width/2)
.attr("y",height+50)
.style("text-align","center")
.text("Date");

//label y axis

chartGroup
.append("text")
.attr("class" ,"axis-label")
.attr("transform" , "rotate(-90)")
.attr("x",-height/2)
.attr("y",height+50)
.style("text-align","center")
.text("Value");

