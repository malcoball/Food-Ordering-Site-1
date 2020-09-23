$(document).ready(function() {
//Dom selectors
const omOut = document.querySelector(".omCont");
const wpOut = document.querySelector(".wpCont");
const basketOut = document.querySelector("#basketList");
const totalItems = document.querySelector("#totalItems");
const totalBasket = document.querySelector("#totalBasket");
const txtInp = document.querySelector("#textInp");
const tblOut = document.querySelector("#basketTable");

//vars
let topOpen = false;
let buyOpen = false;
let omOpen = false;
let wpOpen = false;
let basketTotal = 0;

$("#card1").hide();
$(".wpCont").hide();
$(".omCont").hide();


$("#h1").click(function(){
    switch(topOpen){
        case true:
            $("#card1").slideUp();
            topOpen = false;
            break;
        case false:
            $("#card1").slideDown();
            topOpen = true;

            break;
    }
    
})
$("#h2").click(function(){
    switch(buyOpen){
        case true:
            $(".buyCont").slideUp();
            buyOpen = false;

            //closes omelette menu
            if (omOpen == true){
                $(".omCont").slideUp();
                omOpen = false;
            }
            //closes omelette menu
            if (wpOpen == true){
                $(".wpCont").slideUp();
                wpOpen = false;
            }
            break;
        case false:
            $(".buyCont").slideDown();
            buyOpen = true;
            break;
    }
    
})

//collapseable list
$(".listHead1").click(function(){
    switch(omOpen){
        case true:
            $(".omCont").slideUp();
            omOpen = false;
            break;
        case false:
            $(".omCont").slideDown();
            omOpen = true;
            break;
    }
})
$(".listHead2").click(function(){
    switch(wpOpen){
        case true:
            $(".wpCont").slideUp();
            wpOpen = false;
            break;
        case false:
            $(".wpCont").slideDown();
            wpOpen = true;
            break;
    }
})

let omelettes = [];
let wraps = [];
let specs = [];

//output cards
class Omelette {
    constructor(name, price, cal, desc) {
        this.name = name;
        this.price = price;
        this.cal = cal;
        this.desc = desc;
        omelettes.push(this);
    }
}
class Wrap {
    constructor(name, price, cal, desc) {
        this.name = name;
        this.price = price;
        this.cal = cal;
        this.desc = desc;
        wraps.push(this);
    }
}


const omelette1 = new Omelette("Plain Onion",180,200,"Cooked with plenty of red onion.");
const omelette2 = new Omelette("Plain Mushroom",180,200,"Cooked with plenty of mushrooms.");
const omelette3 = new Omelette("Field's choice",200,220,"Made with fresh button mushrooms and red onion.");
const omelette4 = new Omelette("Meat saver",200,240,"Made with smoked bacon, just a taste without being too much");
const omelette5 = new Omelette("Farmer's delight",240,300,"With a mix of cheese and bacon, this make a very tasty meal");
const omelette6 = new Omelette("Cheese a plenty",200,220,"Plenty of chedder to really give texture");

const wrap1 = new Wrap("Chicken Newyorker",240,300,"A mix of chicken, bacon and cheese. opped with bbq sauce");
const wrap2 = new Wrap("Halloumi Wrap",300,300,"grilled haloumi cheese with lettuce and chilli sauce");
const wrap3 = new Wrap("farmyard lite",240,250,"mix of cheese and ham for a very nice taste");
const wrap4 = new Wrap("Chicken Caesar",320,300,"chicken and salad I guess");
const wrap5 = new Wrap("BLT",240,300,"a mix of bacon lettuce and tomamto");
const wrap6 = new Wrap("Breakfast",450,700,"english breakfast so eggs,sausage,bacon and mushrooms!");
const wrap7 = new Wrap("Roast Beef",300,450,"ground beef I suppose");



outputCards(omOut,omelettes);
outputCards(wpOut,wraps);
function outputCards(target,output){
    let msg = "";
    msg ='<div class="row cardRow">'
    for(i=0;i<output.length;i++){
        //Start
        //give id
        if (target == omOut){
            msg += '<div class="buyCard card col-3" id='+"om"+i+'>';
        } else {
            msg += '<div class="buyCard card col-3" id='+"wp"+i+'>';
        }
        //div for top row
        msg += '<div class="flex1">';
        //Price
        //check if number is float
        //int
        if ((((output[i].price)/100)%1)==0){
            msg += '<p>Price:£'+(output[i].price)/100;
        } else {
            msg += '<p>Price:£'+(output[i].price)/100 + "0";
        }
        //kCal
        msg += '<p >kCal:'+output[i].cal;
        //Exit div
        msg += '</div>';
        //name
        msg += '<h5 class="card-title">'+output[i].name; 
        //description
        msg += '</h5><p class="card-text">'+output[i].desc;
        //close
        msg += "</div>";    

        //add space
        let num = i+1;
        if ((num%3) != 0) {
            msg += '<div class="col-1">'+""+'</div>';
        }
        
    }
    msg +='</div>'
    target.innerHTML = msg;
}

//card clicks
$(".buyCard").click(function(){
    //returns the id of clicked card in number form
    let a = (this.id);
    //returns number of id
    let b = parseInt(a.slice(2));
    //returns name of id    
    let c = a.slice(0,2);

    //put onto basket
    if (c == "om"){;
        basket.unshift({name : omelettes[b].name,price : omelettes[b].price});     
        
    } else {
        basket.unshift({name : wraps[b].name,price : wraps[b].price}); 
    }
    update();
})
$("#card1").click(function(){
    basket.unshift({name : "Spanish Omelette",price : 250});
    update();
})
function updateBasket(){
    let msg = "";
    //reset the html
    tblOut.innerHTML = "<tr><th></th><th></th><th></tr>";
    //Output basket
    for (i=0;i<basket.length;i++){
       //new line
       msg = "";
       //Add unique tag
       //unique class
       if ((i%2)==0){
            //even
            msg += '<tr class="tbleItm tableR1" id='+"tble"+i+'>';
        } else {
            //odd
            msg += '<tr class="tbleItm tableL1" id='+"tble"+i+'>';
        }
       
       
       //Output icon
       msg += '<td><i class="fas fa-times cancel"></i></td>';
       //Output price
       //float
       if (((basket[i].price)/100)%1==0){    
            msg += '<td>'+"£:"+(basket[i].price)/100 +'.00 '+'</td>';
        //int
        } else {
            msg += '<td>'+"£:"+(basket[i].price)/100 +'0 '+'</td>';
        }

        //Output name
        msg += '<td>'+basket[i].name+'</td>';
        
        //close tag
        tblOut.innerHTML += msg;
        tblOut.innerHTML += '</tr>';
    }
    updateStyle();
    
}
function updateSubTotal(){
    //reset the html
    totalBasket.innerHTML = "";
    let total =0;
    for (i=0;i<basket.length;i++){
        total += basket[i].price;
    }
    total = total/100;
    if ((total%1)==0){
        //int
        total ="Basket Subtotal £"+ total + ".00";
    } else {
        //float
        total ="Basket Subtotal £"+ total + "0";

    }
    totalBasket.innerHTML = total;
}
function updateTotalItems(){
    totalItems.innerHTML = "Total Items : "+basket.length;
}
function update(){
    updateBasket();
    updateSubTotal();
    updateTotalItems();
    basketToggle();
}
function removeArrItem(ind){
    let len = basket.length;
    let temp = [];
    for(i=0;i<len;i++){
        if(i !== ind){
            temp.push(basket[i]);
        }
    }
    basket = temp;
    update();
}
$("#btn1").click(function(){
    let inp = parseInt(txtInp.value);
    console.log(inp);
    removeArrItem(2);
})

//Basket style
function updateStyle(){
    $(".tableL1").css(tableStyle1);
    $(".tableR1").css(tableStyle2);
}
//Basket cancel button
$(document).on( "click",".cancel", function() {
    //hide/remove one element from array and update
    let target = $(this).parent().parent().parent().html();//Gets row
    let txt = target.indexOf("id");
    let ind = parseInt(target.slice(txt+8,txt+9));
    
    removeArrItem(ind);
   console.log(ind);
  });
  
//Show/hide basket
function basketToggle(){
    let count = basket.length;

    if (count >=1){
        $("#sidebar").removeClass().addClass("basketShow");
    } else {
        $("#sidebar").removeClass().addClass("basketHide");
    }
}
const tableStyle1 = {
    "text-transorm" : "uppercase",
    "background-color" : "#492540",
    "color" : "#F6EA8C"
};
const tableStyle2 = {
    "text-transorm" : "uppercase",
    "background-color" : "#2A0C22",
    "color" : "#F6EA8C"
}
let basket = [];
class BasketItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

});