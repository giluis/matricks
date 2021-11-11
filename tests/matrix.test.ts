import Matrix,{matrix }  from "../src/matrix.ts";
import Test from "../deps.ts";

const {test,suite,assert,fail,assertEquals,assertArrayEquals}  = Test;


suite("Test add",()=>{
	test("Square add",()=>{
        const square = matrix([
            [1, 1, 1],
            [2, 2, 2],
            [3, 3, 3],
        ])
        const square1 = matrix([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ])
        const expected = matrix([
            [2, 2, 2],
            [3, 3, 3],
            [4, 4, 4]
        ])
        assertEquals(expected, square.add(square1));
	})

	test("Rectangular matrices",()=>{

		const rect = matrix([
			[0, 0],
			[1, 1],
			[1, 2]
		])


		const rect1 = matrix([
			[1, 1],
			[1, 1],
			[1, 1]
		])

		const expected = matrix([
			[1, 1],
			[2, 2],
			[2, 3]
		])
		assertEquals(expected, rect.add(rect1));
	});

	test("Add matrices of different dimensions",()=>{
		// 3 x 3
		const square = matrix([
			[1, 1, 1],
			[2, 2, 2],
			[3, 3, 3],
		])
		// 3 x 2
		const rect = matrix([
			[1, 1],
			[1, 1],
			[1, 1]
		])
		try {
			square.add(rect);
			fail("Adding matrices of different sizes should result in an error");
		} catch (ignored) { }
	})
});


suite("Test multScalar",()=> {
	test("Valid input square matrix",()=>{
        // 3 x 3
		const matrixA = matrix([
			[2, 2, 2],
			[2, 2, 2],
			[2, 2, 2],
		])

		const scalar = 3;
		const result = matrixA.multScalar(scalar);
        // 3 x 3
		const expected = matrix([
			[6, 6, 6],
			[6, 6, 6],
			[6, 6, 6],
		])
		assertEquals(expected, result);

    })
    test("Valid input vector",()=>{

        const matrixB = matrix([
            [3, 3, 3],
        ])

        const expected = Matrix.fromArray([1, 1, 1]);
        const result = matrixB.multScalar(1/3);
        assertEquals(expected,result);
    })
        // 3 X 1

})



suite("Test hadamard",()=>  {
	test("Valid inputs",()=>{
		const matrixA = matrix([
			[2, 2, 2],
			[2, 2, 2],
			[2, 2, 2],
		])

		const matrixB = matrix([
			[3, 3, 3],
			[3, 3, 3],
			[3, 3, 3],
		])

		const result = matrixA.hadamard(matrixB);
		const expected = matrix([
			[6, 6, 6],
			[6, 6, 6],
			[6, 6, 6],
		])

		assertEquals(expected, result);
	})

	test("Invalid inputs",()=>{

		const matrixA = matrix([
			[2, 2, 2],
			[2, 2, 2],
			[2, 2, 2],
		])
		let matrixC: Matrix;
		try {
			matrixC = matrix([
				[1, 2],
				[1, 2],
				[1, 2],

			])// different number of columns
			matrixA.hadamard(matrixC);
			fail("Matrices with different number of columns were passed as arguments, yet no exception was thrown");
		} catch (ignore) { };

		const matrixB = matrix([
			[2, 2],
			[2, 2],
			[2, 2],
		])
		try {
			matrixC = matrix([
				[1, 2, 3],
				[1, 2, 3],
			])// different number of rows
			matrixB.hadamard(matrixC);
			fail("Matrices with different number of columns were passed as arguments, yet no exception was thrown");
		} catch (ignore) { };
	})

	test("With one dimensional matricies",()=>{
		let vec1: Matrix;
		let vec2: Matrix;

		vec1 = matrix([1, 2, 3]);
		vec2 = matrix([4, 2, 3]);
		const result = vec1.hadamard(vec2);
		const expected = matrix([4, 4, 9]);


		assertEquals(expected, result);

		try {
			vec1 = matrix([1, 2, 3]);
			vec2 = matrix([4, 3]);
			vec1.hadamard(vec2);
			fail("Vectors of different sizes were passed as arguments, yet no exception was thrown");
		} catch (ignored) { };

	})
})





suite("Test load", () => {
	test("Valid inputs",()=>{
		const expected = new Matrix(2, 3);
		expected.setData([
			[1, 2, 3],
			[2, 3, 4],
		])

		const result = Matrix.load([
			[1, 2, 3],
			[2, 3, 4],
		])
		assertEquals(expected, result);
	})
})

suite("test map",()=>  {
	test("valid inputs",()=>{
		const fn = (v: number) => v + 1;
		const m = matrix([
            [1,1,1],
            [1,1,1],
            [1,1,1],
        ])
		const expected = matrix([
            [2,2,2],
            [2,2,2],
            [2,2,2],
		])
		const result = m.map(fn);
		assertEquals(expected, result);
	})
})

suite("test Mult",()=>  {
	test("valid inputs",()=>{
		//2 x 3;
		const m1 = matrix([
			[1, 2, 3],
			[1, 1, 1],
		])

		//3 x 3;
		const m2 = matrix([
			[1, 1, 1],
			[1, 0, 1],
			[3, 1, 1],
		])

		const result =  m1.mult(m2);

		//2 x 3;
		const expected = matrix([
			[12, 4, 6],
			[5, 2, 3]
		]);


		assertEquals(expected, result);
	})
	test("valid inputs 2",()=>{
		//2 x 4;
		const m1 = matrix([
			[-2, 3, 1, 7],
			[1, 4, 0, -1]
		])

		//4 x 3;
		const m2 = matrix([
			[-1, 1, 2],
			[2, 3, -2],
			[1, -1, 1],
			[3, 1, 0]
		])

		//2 x 3;
		const expected = matrix([
			[30, 13, -9],
			[4, 12, -6]
		]);

		const result = m1.mult(m2);

		assertEquals(expected, result);
	})

	test("square and vector",()=>{

		//3 x 3;
		const m1 = matrix([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);

		//3 x 1;
		const m2 = matrix([
			[3],
			[2],
			[1],
		])

		//3 x 1;
		const expected = matrix([
			[10],
			[28],
			[46]
		])

		const result =  m1.mult(m2);
		assertEquals(expected, result);
	})

	test("Invalid inputs",()=>{
		// 3 x 3;
		const m1 = matrix([
			[1,2,3],
			[1,2,3],
			[1,2,3],
		])

		//2 x 3;
		const m2 = matrix([
			[1,2,3],
			[1,2,3],
		])

		try {
			m1.mult(m2);
			fail("Should have thrown exception: cannot mulitply 3x3 and 2x3")
		}catch(ignored){}

	})
})



suite("Test toArray", () =>  {
	test("With two dimensional array",()=>{
		//2 x 3;
		const expected = matrix([
			[1, 2, 3],
			[4, 5, 6],
		])

		const result = matrix(expected.toArray());
		assertEquals(expected, result)
	})

	test("With horizontal one dimensional array",()=>{
		//1 x 4
        const m = matrix([
            [1, 2, 3, 4]
        ])

        const expected = [[1, 2, 3, 4]];

        const result = m.toArray();
        assertArrayEquals(expected, result);

	})
	test("With 1x1 array",()=>{
		//1 x 1;
        const m = matrix([
            [2]
        ]);

        const expected = [2];
        const result = m.toArray();
		console.log(m,expected,result);
        assertArrayEquals(expected, result);
	})

	test("With 5x1 matrix (a vertical array)",()=>{
		//5 x 1;
        const m = matrix([1,2,3,4,5]);
        const expected = [1,2,3,4,5];
        const result = m.toArray();
        assertArrayEquals(expected, result);
	})
})
suite("Test transpose",()=>  {
	test("valid inputs",()=>{
		//3 x 2
		const  m =matrix([
			[1, 2],
			[2, 3],
			[3, 1],
		])

		//2 x 3
		const expected =matrix([
			[1, 2, 3],
			[2, 3, 1]
		])
		const result = m.transpose();
		assertEquals(expected, result);
	})

	test("with array",()=>{
		const m = matrix([1, 2, 3, 4]);
		//4 x 1
		const expected =matrix([ [1, 2, 3, 4] ])
		const result = m.transpose();
		assertEquals(expected, result);


	})
})

suite("Test from Array",()=>{

    test("valid inputs",() => {
        const expected = new Matrix(4, 1);
        expected.setData([
            [1], [2], [3], [4] //this is what a 4x1 looks like as a matrix
		]);

        const result = Matrix.fromArray([1, 2, 3, 4]);
        assertEquals(expected, result);
    })
})


suite("Test clone",()=>{
    test("valid inpus",() => {
		//2 x 4
        const m1 =matrix([
            [1, 0, 3, 1],
            [1, 0, 1, 9],
        ]);
        const result = m1.clone();
        assertEquals(result, m1);
    })
})

suite("Test Sub",()=>{
    test("valid inputs",()=>  {
		//2 x 3
        const m1 = matrix([
            [1, 0, 0],
            [1, 0, 1],
        ]);

		//2 x 3
        const m2 = matrix([
            [1, 1, 1],
            [0, 0, 0],
        ]);

		//2 x 3
        const expected = matrix([
            [0, -1, -1],
            [1, 0, 1]
        ]);

        const result = m1.sub(m2);
		console.log(result);;
        assertEquals(expected, result);
	})

	test("invalid inputs",()=>{
		//2 x 5
        const invalidMatrix = matrix([
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]
        ]);

		//2 x 3
		const m1 = matrix([
            [1, 0, 0],
            [1, 0, 1],
        ])

        try {
            invalidMatrix.sub(m1);
			fail("Different sized matrices were subbed, yet no exception was thrown")
        } catch (err) {
            return;
        }
	})
})

suite("Test Equals",()=>{
    test("Same matrix",()=>  {

		// 2 x 3
        const m =matrix([
            [1, 0, 0],
            [1, 0, 1],
        ]);

		// 2 x 3
        const equal =matrix([
            [1, 0, 0],
            [1, 0, 1],
        ]);

		// 4 x 2
        const diffNumRows = matrix([
			[1,2],
			[1,2],
			[1,2],
			[1,2],
		])

		// 2 x 5
        const diffNumCols = matrix([
			[1,2,3,5,4],
			[1,2,3,5,4],
		])

		// 2 x 3
        const differentMatrix =matrix([
            [1, 1, 1],
            [1, 0, 1]
        ])

        assert(!m.equals(diffNumCols), "Matrices with different numcols cannot be equal")
        assert(!m.equals(diffNumRows), "Matrices with different numrows cannot be equal");
        assert(!m.equals(differentMatrix), "Matrices with same numcols and numrow, but with different values cannot be equal");

        assert(m.equals(equal), "Equal matrices should be equal");
    })
})
