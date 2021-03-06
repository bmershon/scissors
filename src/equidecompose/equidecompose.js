import decomposition from "./decomposition";
import triangulate from "../polygon/triangulate.js";

export function equidecompose(source, subject) {
  var sourceTriangles = orient(triangulate(source)),
      subjectTriangles = orient(triangulate(subject));
  
  return decomposition(sourceTriangles, subjectTriangles);  
}

// In-place reversal of clockwise winding produced by earcut.
function orient(triangles) {
  return triangles.map(function(d) { return d.reverse(); });
}