var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io') (server);



var fs = require('fs');
app.use(express.static("."));

app.get('/', function(rec, res){
    res.redirect('index.html');
});

server.listen(3000, () => {
    console.log("server run");
});




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


matrix = generateMatrix(20,85,15,10,5,6)

io.sockets.emit("send matrix", matrix)


grassArr = []
grassEaterArr = []
pred = []
hunt = []
virus = []