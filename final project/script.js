function generateMatrix(len, gr, great, pr,ht,vi) {
    let matrix = []
    for (let i = 0; i < len; i++) {
        matrix.push([])
        for (let j = 0; j < len; j++) {
            matrix[i].push(0)
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * len)
        let y = Math.floor(Math.random() * len)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1

        }
    }
    for (let i = 0; i < great; i++) {
        let x = Math.floor(Math.random() * len)
        let y = Math.floor(Math.random() * len)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2

        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * len)
        let y = Math.floor(Math.random() * len)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3

        }
    }
    for (let i = 0; i < ht; i++) {
        let x = Math.floor(Math.random() * len)
        let y = Math.floor(Math.random() * len)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4

        }
    }
    for (let i = 0; i < vi; i++) {
        let x = Math.floor(Math.random() * len)
        let y = Math.floor(Math.random() * len)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5

        }
    }
    return matrix
}


var side = 40;
let grassArr = []
let grassEaterArr = []
let pred = []
let hunt = []
let virus = []
let matrix = generateMatrix(20,85,15,10,5,6)



function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                pred.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new Hunter(x, y)
                hunt.push(gr)
            }else if (matrix[y][x] == 5) {
                let gr = new Virus(x, y)
                virus.push(gr)
            }
        }
    }

}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            }else if (matrix[y][x] == 4) {
                fill("blue");
            }else if (matrix[y][x] == 5) {
                fill("orange");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }

    for (let i = 0; i < pred.length; i++) {
        pred[i].eat()
    }
    for (let i = 0; i < hunt.length; i++) {
        hunt[i].eat()
    }
    for (let i = 0; i < virus.length; i++) {
        virus[i].mul()
    }
}