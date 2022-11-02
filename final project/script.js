var socket = io();



var side = 40;
var weath = "winter"
function setup() {
    createCanvas(20 * side, 20 * side);
}

socket.on("Winter", function (data) {
    weath = data;
})
socket.on("Summer", function (data) {
    weath = data;
})
socket.on("Spring", function (data) {
    weath = data;
})
socket.on("Autumn", function (data) {
    weath = data;
})
var weath = "spring";

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (weath == "spring") {
                    fill("darkgreen");
                }
                else if (weath == "summer") {
                    fill("#79a83b");
                }
                else if (weath == "autumn") {
                    fill("#ff8453");
                }
                else if (weath == "winter") {
                    fill("#ffffff");
                }
             } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("blue");
            } else if (matrix[y][x] == 5) {
                fill("orange");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");

            }
            rect(x * side, y * side, side, side);
        }
    }

}

socket.on('send matrix', nkarel)


function Winter() {
    socket.emit("winter");
}
function Summer() {
    socket.emit("summer");
}
function Spring() {
    socket.emit("spring");
}
function Autumn() {
    socket.emit("autumn");
}
function AddGrass(){
    socket.emit("addGrass");
}
function AddGrassEater(){
    socket.emit("addGrassEater");
}
function KillAll(){
    socket.emit("killAll");
}
function AddPredator(){
    socket.emit("addPredator");
}
function AddHunter(){
    socket.emit("addHunter");
}
function AddVirus(){
    socket.emit("addVirus");
}






