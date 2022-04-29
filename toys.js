toys = "";
objects = [];
status = "";

function preload() {
toys = loadImage("IMG-4927.jpg");
}

function setup() {
canvas = createCanvas(300,300);
canvas.center();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

    function draw() {
        image(toys, 0, 0, 300, 300);
        if(status != "") {
            objectDetector.detect(toys, gotResult);
            for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("object_no"). innerHTML = objects.length + " out of 3 objects detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(toys, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}