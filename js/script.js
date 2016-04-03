
// var dataset = [
// [0.00,    0.34,    0.04,    0.15,    0.40,    0.00,    0.00],
// [0.00,    0.00,    0.32,    0.22,    0.08,    0.38,    0.65],
// [0.55,    0.27,    0.29,    0.05,    0.21,    0.27,    0.35],
// [0.45,    0.05,    0.32,    0.41,    0.00,    0.00,    0.00],
// [0.00,    0.34,    0.03,    0.17,    0.30,    0.35,    0.00]
// ];

// var dataset = [] ;

d3.text("data/row.csv", function(datasetText) {
  var dataset = d3.csv.parseRows(datasetText);


// d3.csv("data/alldata.csv", function(data){
//   // dataset = data.map(function(d){return[+d["value1"],+d["value2"]];});
//   //
//   dataset = data;
// });

var K         = 100;
var x_padding = 250;
var y_padding = 150;

var vizSVG = d3.select("#viz")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 1500);



vizSVG.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .selectAll("circle")
    .data( function(d,i,j) { return d; } )
    .enter()
    .append("circle")
    .style("stroke", "4e5d3c")
    .style("stroke-width", 2)
    .style("fill", "9caf84")
    .attr("r", function(d,i,j) { return K*d; } )
    .attr("cx", function(d,i,j) { return x_padding*(i+1); })
    .attr("cy", function(d,i,j) { return y_padding*(j+1); })
    .on("mouseover", function(){d3.select(this).style("stroke", "black");})
    .on("mouseout", function(){d3.select(this).style("stroke", "4e5d3c");})

  });
