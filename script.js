var bob = null;
var zIndex = 1;

onkeydown = kd;
onclick = md;
onmousedown = mouseDown;
onmouseup = mouseUp;
ondragstart = dragStart;

let divs = document.querySelectorAll(".divEl");


for(let i = 0; i < divs.length; i++){
    initEl(divs[i]);
}

function initEl(el){

    if(el.id == "red"){
        el.style.left = "100px";
        el.style.top = "100px";
    }else if(el.id == "green"){
        el.style.left = "150px";
        el.style.top = "150px";
    }else if(el.id == "blue"){
        el.style.left = "200px";
        el.style.top = "200px";
    }

}

function kd(e){
    if(e.keyCode == 82 || e.target.id == "red"){
        makeBorder(red, green, blue);
        makeActive(red);
        bob.style.zIndex = zIndex++;
    }else if(e.keyCode == 71 || e.target.id == "green"){
        makeBorder(green, red, blue);
        makeActive(green);
        bob.style.zIndex = zIndex++;
    }else if(e.keyCode == 66 || e.target.id == "blue"){
        makeBorder(blue, green, red);
        makeActive(blue);
        bob.style.zIndex = zIndex++;
    }else if(e.keyCode == 37){
        moveLeft(55);
    }else if(e.keyCode == 38){
        moveUp(55);
    }else if(e.keyCode == 39){
        moveRight(55);
    }else if(e.keyCode == 40){
        moveDown(55);
    }else if(e.keyCode == 67){
        //circle
        bob.classList.add("circle");
    }else if(e.keyCode == 83){
        //square
        bob.classList.remove("circle");
    }else if(e.keyCode == 72){
        //home
       var redEl = document.getElementById("red");
       redEl.style.left = "100px";
       redEl.style.top = "100px";

       var greenEl = document.getElementById("green");
       greenEl.style.left = "150px";
       greenEl.style.top = "150px";

       var blueEl = document.getElementById("blue");
       blueEl.style.left = "200px";
       blueEl.style.top = "200px";

    }

    concatCoordinates();
}

function md(e){
    
    if(e.target == "[object HTMLHtmlElement]" || e.target == "[object HTMLBodyElement]" ){
        bob.style.left = e.pageX - 25 + "px";
        bob.style.top = e.pageY - 25 + "px";
        concatCoordinates();
    }
  
}

let offsetX;
let offsetY;

function mouseDown(event) {

    kd(event);

    bob.style.position = 'absolute';

    bob.style.transition = "none";

    offsetX = event.pageX - parseInt(bob.style.left);
    offsetY = event.pageY - parseInt(bob.style.top);
  
    document.addEventListener('mousemove', onMouseMove);
  
  };

    function onMouseMove(event) {
    bob.style.left = event.pageX - offsetX + 'px';
    bob.style.top = event.pageY - offsetY + 'px';
    concatCoordinates();
    }

  function mouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    bob.style.transition = '';
    bob.style.transition.left = "1s";
    bob.style.transition.top = "1s";

    // bob.style.borderWidth = "0";  КОГАТО РАЗКОМЕНТИРАМЕ ИМАМЕ ФУНКЦИОНАЛНОСТА, ЧЕ НЯМАМЕ
    // bob = null;                   АКТИВЕН ЕЛЕМЕНТ СЛЕД DRAG AND DROP
  };
  
function dragStart() {
    return false;
  };

//controling the div functions
function moveLeft(moveValue){
    const newLeft = parseInt(bob.style.left) - moveValue;
    bob.style.left = newLeft + "px";
    }
    
    function moveRight(moveValue){
    const newLeft= parseInt(bob.style.left) + moveValue;
    bob.style.left = newLeft + "px";
    }
    
    function moveUp(moveValue){ 
    const newTop = parseInt(bob.style.top) - moveValue;
    bob.style.top = newTop + "px";
    }
    
    function moveDown(moveValue){ 
        const newTop =  parseInt(bob.style.top) + parseInt(moveValue, 10);
        bob.style.top = newTop + "px";
    }


    //concats the coordinates for the form input field
    function concatCoordinates(){
  
        let leftValue = bob.style.left;
        let topValue = bob.style.top;
        document.getElementById("coordinates").value = `X: ${leftValue} ; Y: ${topValue}`;    
    }

    //event listener for all the buttons to move the div
document.querySelectorAll("button").forEach(b => {
    b.addEventListener("click", buttonClicked);
  })

  function buttonClicked(e){
    e.preventDefault();
    let moveVal = parseInt(document.getElementById("moving").value, 10);

    switch(e.target.id){

        case "UP-LEFT":
        moveUp(moveVal);
        moveLeft(moveVal);
        break;

        case "UP":
        moveUp(moveVal);
        break;

        case "UP-RIGHT":
        moveUp(moveVal);
        moveRight(moveVal);
        break;

        case "RIGHT":
        moveRight(moveVal);
        break;

        case "LEFT":
        moveLeft(moveVal);
        break;

        case "DOWN-LEFT":
        moveDown(moveVal);
        moveLeft(moveVal);
        break;

        case "DOWN":
        moveDown(moveVal);
        break;

        case "DOWN-RIGHT":
        moveDown(moveVal);
        moveRight(moveVal);
        break;

    }
    concatCoordinates();
  }

  function makeBorder(active, nonActive1, nonActive2){
    active.style.borderWidth = "5px";
    active.style.borderColor = "black";
    active.style.borderStyle = "solid";
    nonActive1.style.borderWidth = 0;
    nonActive2.style.borderWidth = 0;       
}

function makeActive(active){
bob = active;
}
