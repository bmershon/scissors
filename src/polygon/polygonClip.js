// // Version 0.0.0. Copyright 2017 Mike Bostock.

// // The input subject polygon is clipped to the given clip polygon.
// export default function(subject, clip) {
//   var input,
//       closed = polygonClosed(subject),
//       i = -1,
//       n = clip.length - polygonClosed(clip),
//       j,
//       m,
//       a = clip[n - 1],
//       b,
//       c,
//       d;

//   while (++i < n) {
//     input = subject.slice();
//     subject.length = 0;
//     b = clip[i];
//     c = input[(m = input.length - closed) - 1];
//     j = -1;
//     while (++j < m) {
//       d = input[j];
//       if (polygonInside(d, a, b)) {
//         if (!polygonInside(c, a, b)) {
//           subject.push(polygonIntersect(c, d, a, b));
//         }
//         subject.push(d);
//       } else if (polygonInside(c, a, b)) {
//         subject.push(polygonIntersect(c, d, a, b));
//       }
//       c = d;
//     }
//     if (closed) subject.push(subject[0]);
//     a = b;
//   }

//   // Subject polygon's original transform history.
//   transforms = subject.transforms.slice(0);
    
//   // Append reversed (and undone) transfer history of clip polygon.
//   clipped.target = clip.transforms.slice(0);
//   undone = clip.transforms.slice(0).reverse(0).map(undo);
//   transforms = transforms.concat(undone);
//   clipped.transforms = transforms;

//   return subject;
// };

// // function polygonInside(p, a, b) {
//   return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
// }

// // Intersect two infinite lines cd and ab.
// function polygonIntersect(c, d, a, b) {
//   var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3,
//       y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3,
//       ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
//   return [x1 + ua * x21, y1 + ua * y21];
// }

// // Returns true if the polygon is closed.
// function polygonClosed(coordinates) {
//   var a = coordinates[0],
//       b = coordinates[coordinates.length - 1];
//   return !(a[0] - b[0] || a[1] - b[1]);
// }