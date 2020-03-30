
var noOfSquares = 9;
var imgPath = "../static/images/god.jpg";
var image = document.getElementById('imgSource');
image.setAttribute("src", imgPath);

var canvas;
var ctx;
var imageSquareData = [];
var removedSquare = 0;
var isMouseDown = false;
var squareWidth = 0;
var squareHeight = 0;
// each array should have oringal place, new place, and data

// Listeners

$("#puzzleCanvas").bind("mousemove", function (e) {
    //    isMouseDown ?  console.log(e) : "";
});

$("#puzzleCanvas").on("click", function (e) {
    removeSquare(parseInt(e.originalEvent.x), e.originalEvent.y);
    isMouseDown = true;
    $("#puzzleCanvas").off("click");
    $("#puzzleCanvas").bind("mousedown", function (e) {
        console.log(e);
        //check its valid square ie. its next to a black square

    });
});

function removeSquare(removeX, removeY) {
    squareWidth = canvas.width / Math.sqrt(noOfSquares);
    squareHeight = canvas.height / Math.sqrt(noOfSquares);
    for (var x = 0; x < canvas.width ; x += canvas.width / Math.sqrt(noOfSquares)) {
        for (var y = 0; y < canvas.width ; y += canvas.width / Math.sqrt(noOfSquares)) {
        
            if (removeX>x && removeX<x+squareWidth){
                if (removeY>y && removeY<y+squareWidth){
                        console.log("remove");
                        // var data = ctx.getImageData(x, y, x+squareWidth, y+squareWidth);
                        var ddata = ctx.getImageData(0, 0, canvas.width, canvas.height);

    
                        console.log(ddata.length);
                        for (var i = 0; i < ddata.length; i+= 4) {
                            data[i] =  255; // Invert Red
                            data[i+1] =  255; // Invert Green
                            data[i+2] = 255; // Invert Blue
                          }
                        // ctx.putImageData(data, x, y);
                        ctx.putImageData(ddata, 0, 0);
                        console.log("remove");
                } 
            }
        }
    }
}

function init() {
    $("#puzzleCanvas").off("mousedown");
    canvas = document.getElementById('puzzleCanvas');
    ctx = canvas.getContext('2d');
    drawImage(image);
    drawLines();

}

function drawImage(image) {
    // Set the canvas the same width and height of the image
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.putImageData(imageData, 0, 0);
}



function drawLines() {
    for (var x = 0; x < canvas.width + 1; x += canvas.width / Math.sqrt(noOfSquares)) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (var y = 0; y < canvas.height + 1; y += canvas.height / Math.sqrt(noOfSquares)) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}


// split image into sectiosn relative to

// draw lines to denote squares

// Ask to remove - default bottom right


// THis should be loaded when the image is loaded into the img tag
window.addEventListener('load', init);