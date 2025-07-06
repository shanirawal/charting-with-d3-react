//selection the selection area div
d3.select("#selection-area").style("background-color","red");

//selection the selection area div and p tag (p1=id)
d3.select("#selection-area").select("#p1").style("background-color","yellow");

//select all p tag and style
d3.select('p').style("background-color","red");

//select all div and color all p tag but one diff p tag color
d3.selectAll('div')
.style("background-color","red")
.select("#p2")
.style("background-color","green");

//select a div and append a p tag with text
d3.select("#append-area")
.append("p")
.text("This text was added from console using d3.js")
.style("background-color","blue");

//select a div and remove first p tag
d3.select("#interactive-area").select(":first-child").remove()

//select div and add elemnts after last child
d3.select("#interactive-area").insert("p",":last-child").text("Insert a p tag")

//d3 joins - INCOMPLTE , NEED TO ADD JOINS

const datajoinarea= d3.select("#data-join-area");

let initiateData = [10,20];

const divs1=datajoinarea.selectAll("div").data(initiateData)

divs1
    .enter()
    .append("div")
    .text((d)=>`Initial ${d}`);



let updatedData = [10,30,40,50];
const divs2=datajoinarea.selectAll("div").data(updatedData);


divs2
    .enter()
    .append("div")
    .text((d)=>`Initial ${d}`)
    .style("background-color","red");
    //result -[10,20,40,50]

// data transitions

const transitionArea = d3.select("#transition-area");

function runTransition(){
    transitionArea.html(""); //clear all html elememts inside selected div

    const mySvg = transitionArea
        .append("svg")
        .attr("width","100%")
        .attr("height","200");

    mySvg
        .selectAll("circle")
        .data([20,40,60,80,100])
        .enter()
        .append("circle")
        .attr("cx",0)
        .attr("cy",(d,i)=> 25 + i  * 20)
        .attr("r",10)
        .style("fill","blue")
        .transition()
        .duration(1500)
        .attr("cx",(d)=> d * 3)
        .attr("cy",(d)=> d * 3);


}

runTransition();