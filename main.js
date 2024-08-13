quickdrawdataset=["airplane", "ambulance","ant", "banana", "box", "bat","binoculars"];
random_number=Math.floor((Math.random()* quickdrawdataset.length)+1);
console.log(random_number);
console.log(quickdrawdataset[random_number]);
sketch=quickdrawdataset[random_number];
document.getElementById("sketchname").innerHTML="Draw the sketch : "+sketch;
timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;


function preload() {
    classifier = ml5.imageClassifier("DoodleNet")

}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    //background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw() {
    stroke(0);
    strokeWeight(10);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
check_sketch();
if(drawn_sketch==sketch){
    score++;
    answer_holder="set";
    document.getElementById("score").innerHTML="score : "+ score;
}

}



function update_canvas() {
    background(" rgb(122, 166, 122)");
}

function classifyCanvas() {
    classifier.classify(canvas, gotresults);


}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    drawn_sketch=results[0].label;
    document.getElementById("label").innerHTML = "Label : " + results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence : " + Math.round(results[0].confidence * 100) + "%";
    saythis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(saythis);
}

function clearcanvas() {
    background("rgb(122, 166, 122)");
    console.log("clear");

}


function check_sketch() {
    timer_counter = timer_counter + 1;
    document.getElementById("timer").innerHTML = "timer" + timer_counter
    console.log("timer_counter");
    if (timer_counter >= 400) {
        timer_counter = 0;
        timer_check = "completed";
    }
    if (timer_check == "completed" || answer_holder == "set") {
        timer_check = "";
        answer_holder = "";
        update_canvas();
    }
}

