//Variale decolators
//dom selector
const imgs = document.querySelectorAll(".headerDiv img");
const dotOut = document.querySelector("#countOut");
let a = document.querySelectorAll(".dot");

let count = 1; //Used to track which pic is on display
let time = 1; //Slideshow uses this for a "last frame"
let resetTic = 6000;//Speed of slide show
let play = true;//Controls slideshow

//the amount of images in the slideshow
const imgsLen = imgs.length;

init();

function init(){
    dotsOut();
    loadGraphics();
}

function dotsOut(){
    const dotMsg = "<span class='dot mx-1'></span>";

    for(i=0;i<imgsLen;i++){
    dotOut.innerHTML += dotMsg;
    };
}


function moveUp(){
    if (count == imgsLen){
        count = 1;
    } else {
        count++;
    }
}
function moveDown(){
    if (count == 1){
        count = imgsLen;
    } else {
        count--;
    }
}

function countMove(dir){
    switch(dir){
        case true:
            //up
            moveUp();
            break;
        case false:
            //down
            moveDown();
            break;
    }
    console.log(count);

}


function pauseSlide(){
    play = false;
    if ($("button").html() == "pause"){
        setTimeout(function(){
            play = true;
        },resetTic);
    }
}

function loadGraphics(){
    $(".dot:nth-child("+count+")").addClass("dotActive");//Makes sure the dot is active when the page is loaded
    $(".headerImgs:nth-child("+count+")").addClass("headerImgsActive");//Makes sure the image is active when the page is loaded
    $(".headerImgs:nth-child("+count+")").show();//Is done when the page loads
}

//click events
$("#arrowLeft").click(function(){
    countMove(false);
    pauseSlide();
})
$("#arrowRight").click(function(){
    countMove(true);
    pauseSlide();
})
$("#btn1").click(function(){
    //check what the button says
    let msg = $(this).html();
    console.log(msg);
    switch(msg){
        //if the button is on pause
        case "pause":
            $(this).html("play");
            play = false;
            break;
        //if the button is on play
        case "play":
            play = true;
            $(this).html("pause");
            break;
    }
})
//intervals
setInterval(function(){
    
    //check if count has been updated
    if (time != count){
        $(".dot:nth-child("+time+")").toggleClass("dotActive");
        $(".dot:nth-child("+count+")").toggleClass("dotActive");
        /*
        $(".headerImgs:nth-child("+time+")").toggleClass("headerImgsActive");
        $(".headerImgs:nth-child("+count+")").toggleClass("headerImgsActive");
        */
       let spd = "slow";//The speed which the pictures change
       $(".headerImgs").hide(spd);
       $(".headerImgs:nth-child("+count+")").show(spd);


    }
    //time gets reset
    time = count;
},1000/60);

setInterval(function(){
    if (play == true){
        if(count<imgsLen){
            count ++
        } else {
            count = 1;
        }
    }
    let a = $("#btn1").html();
    if (a == "pause"){
        play= true;
    }
},resetTic);
