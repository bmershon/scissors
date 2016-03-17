"use strict";
var tape = require("tape"),
    cut = require("../build/d3-equidecompose.js");

require("./inDelta.js"); // add functionality to test suite

tape("test right angle", function(test) {
  let a = [0, 0], b = [1, 0], c = [0, 1];
  test.inDelta(cut.angle(a, b, c), Math.PI/2);
  test.end();
});

tape("test 45 degree angle", function(test) {
  let a = [0, 0], b = [1, 1], c = [0, 1];
  test.inDelta(cut.angle(a, b, c), Math.PI/4);
  test.end();
});

tape("test 135 degree angle", function(test) {
  let a = [0, 0], b = [1, -1], c = [0, 1];
  test.inDelta(cut.angle(a, b, c), 3*Math.PI/4);
  test.end();
});

tape("test 180 degree angle", function(test) {
  let a = [0, 0], b = [-1, 0], c = [1, 0];
  test.inDelta(cut.angle(a, b, c), Math.PI);
  test.end();
});