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