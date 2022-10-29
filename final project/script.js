var socket = io();



var side = 40;
var weath = "winter"
function setup() {
    createCanvas(20 * side, 20 * side);



}

socket.on("weather", function (data) {
    weath = data;
})

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
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
            } else if (weath == "spring") {
                if (matrix[y][x] == 1) {
                    fill("dark green");
                } else if (matrix[y][x] == 2) {
                    fill("dark yellow");
                } else if (matrix[y][x] == 3) {
                    fill("dark red");
                } else if (matrix[y][x] == 4) {
                    fill("dark blue");
                } else if (matrix[y][x] == 5) {
                    fill("dark orange");
                } else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
            }
            else if (weath == "summer") {
                if (matrix[y][x] == 1) {
                    fill("light green");
                } else if (matrix[y][x] == 2) {
                    fill("light yellow");
                } else if (matrix[y][x] == 3) {
                    fill("light red");
                } else if (matrix[y][x] == 4) {
                    fill("light blue");
                } else if (matrix[y][x] == 5) {
                    fill("light orange");
                } else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
            }
            else if (weath == "autumn") {
                if (matrix[y][x] == 1) {
                    fill("dark orange");
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
            }
            else if (weath == "winter") {
                if (matrix[y][x] == 1) {
                    fill("white");
                } else if (matrix[y][x] == 2) {
                    fill("light yellow");
                } else if (matrix[y][x] == 3) {
                    fill("light red");
                } else if (matrix[y][x] == 4) {
                    fill("light blue");
                } else if (matrix[y][x] == 5) {
                    fill("light orange");
                } else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
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






