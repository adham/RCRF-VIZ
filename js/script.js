function processLinks(d){
  var linkStr = "";

  for (var i=0 in d.links){
    linkStr = linkStr + "<a href=" + d.links[i].link + ">" + d.links[i].description + "</a>";
    if (i < d.links.length-1){
      linkStr = linkStr + "<br/>";
    }
  }
return linkStr;
}

var W = ["#D3AB4B", "#4BABD3", "#7B68EE", "#FFC0CB", "#FFF0F5", "#000000","#FFEBCD","#8A2BE2","#A52A2A","#DEB887","#5F9EA0","#7FFF00","#D2691E","#FF7F50","#6495ED", "#0000CD"];

var K        = 10;
var xPadding = 25;
var yPadding = 25;
var xOffset  = 100; 

var vizSVG = d3.select("#viz")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500)


var div = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


var data;
d3.json("https://gist.githubusercontent.com/adham/399326fa80d6e63510b5fbabcf5239fc/raw/45e860241b805a6a3b221da0fe238563c127b5d1/data.json", function(error, json) {
  if (error) return console.warn(error);
  dataset = json;

  vizSVG.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .style("fill", function(d) { return W[d.year]; })
    .attr("r", function(d) { return K*d.r; } )
    .attr("cx", function(d) { return xPadding*(d.topic_id)+xOffset; })
    .attr("cy", function(d) { return yPadding*(d.year); })
    .on("mouseover", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      div.transition()
        .duration(200)
        .style("opacity", 0.9);
      div.html(processLinks(d))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");})
});