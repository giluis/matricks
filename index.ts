import * as D from './deps/testDeps.ts'
import {matrix} from './src/matrix.ts'

console.log(D)

let m1 = matrix([
	[1, 2, 3],
	[1, 2, 3],
	[1, 2, 3],
])

let m2 = matrix([
	[1, 2, 3],
	[1, 2, 3],
	[1, 2, 3],
])

console.log( m1.mult(m2).mult(m2).mult(m2).mult(m2).mult(m2).mult(m2).mult(m2).mult(m2) )

