import * as D from "https://github.com/giluis/tocko/raw/main/index.ts"
import Matrix from "./src/matrix.ts"

console.log(D);


const m1 = Matrix.load([

    [1,2,3,4],
    [5,6,7,8],
    [9,0,1,2],
])

const m2 = Matrix.load([
    [1],
    [5],
    [9],
    [9],
])

Matrix.mult(m1,m2).print();
export default Matrix
