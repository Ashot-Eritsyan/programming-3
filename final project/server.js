var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
app.use(express.static("."));

app.get('/', function (rec, res) {
    res.redirect('index.html');
});

server.listen(3000, () => {
    console.log("server run");
});




function generator(len, gr, great, pr, ht, vi) {
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


matrix = generator(20, 85, 15, 10, 5, 6)

io.sockets.emit("send matrix", matrix)


grassArr = []
grassEaterArr = []
pred = []
hunt = []
virus = []

Grass = require("./grass")
GrassEater = require("./grasseater")
Hunter = require("./hunter")
Predator = require("./predator")
Virus = require("./virus")


function createObject() {

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
            } else if (matrix[y][x] == 5) {
                let gr = new Virus(x, y)
                virus.push(gr)
            }
        }
    }

    io.sockets.emit('send matrix', matrix)
}


function game() {
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

    io.sockets.emit('send matrix', matrix)
}

setInterval(game, 200);


io.on('connection', () => {
    createObject()
  });



//   var weath;

// function Winter() {
//     weath = "winter";
//     if (matrix[y][x] == 1) {
//         fill("white");
//     }  else if (matrix[y][x] == 2) {
//         fill("light yellow");
//     } else if (matrix[y][x] == 3) {
//         fill("light red");
//     } else if (matrix[y][x] == 4) {
//         fill("light blue");
//     } else if (matrix[y][x] == 5) {
//         fill("light orange");
//     }else if (matrix[y][x] == 0) {
//         fill("#acacac");
//     }
//     io.sockets.emit('Winter', weath);
// }

// function Summer() {
//     weath = "summer";
//     if (matrix[y][x] == 1) {
//         fill("light green");
//     }  else if (matrix[y][x] == 2) {
//         fill("light yellow");
//     } else if (matrix[y][x] == 3) {
//         fill("light red");
//     } else if (matrix[y][x] == 4) {
//         fill("light blue");
//     } else if (matrix[y][x] == 5) {
//         fill("light orange");
//     }else if (matrix[y][x] == 0) {
//         fill("#acacac");
//     }
//     io.sockets.emit('Summer', weath);
// }

// function Spring() {
//     weath = "spring";
//     if (matrix[y][x] == 1) {
//         fill("dark green");
//     }  else if (matrix[y][x] == 2) {
//         fill("dark yellow");
//     } else if (matrix[y][x] == 3) {
//         fill("dark red");
//     } else if (matrix[y][x] == 4) {
//         fill("dark blue");
//     } else if (matrix[y][x] == 5) {
//         fill("dark orange");
//     }else if (matrix[y][x] == 0) {
//         fill("#acacac");
//     }
//     io.sockets.emit('Spring', weath);
// }
// function Autumn() {
//     weath = "autumn";
//     if (matrix[y][x] == 1) {
//         fill("dark orange");
//     }  else if (matrix[y][x] == 2) {
//         fill("yellow");
//     } else if (matrix[y][x] == 3) {
//         fill("red");
//     } else if (matrix[y][x] == 4) {
//         fill("blue");
//     } else if (matrix[y][x] == 5) {
//         fill("orange");
//     }else if (matrix[y][x] == 0) {
//         fill("#acacac");
//     }
//     io.sockets.emit('Autumn', weath);
// }







  var statistics = {};


  setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.hunter = hunt.length;
    statistics.predator = pred.length;
    statistics.virus = virus.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)