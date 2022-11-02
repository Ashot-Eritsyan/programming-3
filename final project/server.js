var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3001, () => {
    console.log('connected');
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
var weath = "winter";

var weath;

function Winter() {
    weath = "winter";
    io.sockets.emit('Winter', weath);
}

function Summer() {
    weath = "summer";
    io.sockets.emit('Summer', weath);
}

function Spring() {
    weath = "spring";
    io.sockets.emit('Spring', weath);
}
function Autumn() {
    weath = "autumn";
    io.sockets.emit('Autumn', weath);
}


function Kill() {
    grassArr = []
    grassEaterArr = []
    pred = []
    hunt = []
    virus = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function AddGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var gr = new Grass(x, y);
            grassArr.push(gr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function AddGrassEater() {
    let count = 0;
    for (var i = 0; i < 50; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (count < 7) {
            if (i < 30) {
                if (matrix[y][x] == 0) {
                    count++;
                    matrix[y][x] = 2;
                    var grEater = new GrassEater(x, y);
                    grassEaterArr.push(grEater);
                }

            } else if (i >= 30) {
                if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                    count++;
                    matrix[y][x] = 2;
                    var grEater = new GrassEater(x, y);
                    grassEaterArr.push(grEater);
                }
            }
        }


    }

    io.sockets.emit("send matrix", matrix);
}
function AddPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            var pr = new Predator(x, y);
            pred.push(pr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function AddHunter() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            var ht = new Hunter(x, y);
            hunt.push(ht);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function AddVirus() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            var vr = new Virus(x, y);
            virus.push(vr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}


io.on('connection', function (socket) {
    createObject();
    socket.on("spring", Spring);
    socket.on("summer", Summer);
    socket.on("autumn", Autumn);
    socket.on("winter", Winter);
    socket.on("addGrass", AddGrass);
    socket.on("addGrassEater", AddGrassEater);
    socket.on("killAll", Kill);
    socket.on("addPredator", AddPredator);
    socket.on("addHunter", AddHunter);
    socket.on("addVirus", AddVirus);
  
})



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