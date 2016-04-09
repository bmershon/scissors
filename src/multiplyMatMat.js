import {default as row} from "./row";
import {default as column} from "./column";
import {default as dot} from "./dot";

export default function(A, B) {
  if(A[0].length != B.length){
    throw new Error("invalid dimensions");
    return null;
  }
  var res = [[]];
  for(let i = 0; i < A.length; i++){
    for(let j = 0; j < B[0].length; j++){
      res[i][j] = dot(row(A, i), column(B, j));
    }
  }
  return res;
}