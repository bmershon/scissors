<!DOCTYPE html>
<meta charset="utf-8">
<style>

path {
  stroke-linecap: butt;
}

.triangle {
  pointer-events: none;
  stroke: #000;
  fill: none;
}

.figure {
  pointer-events: none;
  stroke-width: 2px;
  fill-opacity: 0.5;
  stroke: #000;
}

.handle {
  cursor: move;
  pointer-events: all;
  stroke-width: 2px;
  fill-opacity: 0.5;
  stroke: #000;
  fill: #ff9933;
}

.handle:hover {
  fill-opacity: 1;
}

</style>
<svg width="960" height="500">
</svg>
<script src="../node_modules/d3-polygon/build/d3-polygon.js"></script>
<script src="../build/partials.js"></script>
<script src="https://d3js.org/d3.v3.min.js"></script>
<script>

var a = [100, 200], b = [600, 300], c = [300, 400],
    A0, A1, data, polygons;

data = [a, b, c];
polygons = partials.triangle2Rectangle(data);

var drag = d3.behavior.drag()
    .origin(function(d) { return {x: d[0], y: d[1]}; })
    .on("dragstart", dragstarted)
    .on("drag", dragged);

var color = d3.scale.category10();

var svg = d3.select("svg").append("g");

var line = d3.svg.line()
            .x(function(d) { return d[0]; })
            .y(function(d) { return d[1]; })
            .interpolate("linear-closed");

var triangle = svg.append("path")
                  .attr("class", "triangle")
                  .datum(data)
                  .attr("d", line);

var handle = svg.selectAll(".handle")
                .data(data);
              
handle.enter()
      .append("circle")
      .attr("class", "handle")
      .attr("r", 10)
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; })

handle.call(drag);

update();

function update() {
  d3.selectAll(".shape").remove();

  polygons = partials.triangle2Rectangle(data);

  var figure = svg.append("g").attr("class", "")
    .selectAll("g")
      .data(polygons)
    .enter().append("g").attr("class", "shape")
      .attr("transform", transform);

  path = figure.append("path")
      .style("fill", function(d, i) { return color(i); })
      .attr("class", "figure")
      .attr("d", line);

  polygons = partials.triangle2Rectangle(data);
  
  triangle
      .attr("d", line);

  handle
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; });
}

function dragstarted(d) {
  this.parentNode.appendChild(this);
}

function dragged(d) {
  d[0] = d3.event.x;
  d[1] = d3.event.y;
  update();
}

function transform(d) {
  var t = d.transform, pivot, rotation, translation;

  rotation = (t.hasOwnProperty("rotate")) ? t.rotate : 0;
  translation = (t.hasOwnProperty("translate")) ? t.translate : [0, 0];
  pivot = (t.hasOwnProperty("pivot")) ? t.pivot : null;

  return translate(translation) + rotate(rotation, pivot);
}

function rotate(angle, pivot) {
  return (pivot != null)
          ? "rotate(" + angle + "," + pivot + ")"
          : "rotate(" + angle + ")";
}

function translate(delta) {
  return "translate(" + delta[0] + "," + delta[1] + ")";
}

</script>