var K         = 100;
var xPadding = 250;
var yPadding = 150;

var vizSVG = d3.select("#viz")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 1500);

var div = d3.select("body")    
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

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

var data;
d3.json("https://gist.githubusercontent.com/adham/399326fa80d6e63510b5fbabcf5239fc/raw/f9c7b36ee70ad776041f5f41ac4eea73bf959265/data.json", function(error, json) {
    if (error) return console.warn(error);
    dataset = json;

    vizSVG.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .style("stroke", "4e5d3c")
    .style("stroke-width", 2)
    .style("fill", "9caf84")
    .attr("r", function(d) { return K*d.r; } )
    .attr("cx", function(d) { return xPadding*(d.topic_id); })
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
            .style("top", (d3.event.pageY - 28) + "px")
        d3.select(this).style("stroke", "black");})
    .on("mouseout", function(){d3.select(this).style("stroke", "4e5d3c");})

});