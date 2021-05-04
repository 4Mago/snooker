let canvas = document.getElementById("cvs");
canvas.width = 320;
canvas.height = 240;
let ctx = canvas.getContext("2d");
let cw = canvas.width;
let ch = canvas.height;
//////////////////////////////////
let k = 8;    //  k = kvadrat

// 1 = upp, 2 = höger, 3 = ner 4 = vänster
let riktning = 2;
let spela = false;  //Håller koll på om spelet ska köras eller ej
let points = 0;     //Räknar poäng
let fps = 5;  // Hastighet i spelet vid start
let tid;  // Variabel för setTimeout
let play; // Variabel för requestAnimationFrame
let snake;
let nyttHuvud;
let food;


function orm()
{
    for(let i = 0; i < snake.length; i++)
    {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(snake[i].x, snake[i].y, k, k);
        ctx.fill();
    }
}

function mat()
{
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(food.x,food.y,k,k);
    ctx.fill();
}

function animation()
{
    ctx.clearRect(0,0,cw,ch);
    mat();
    orm();
    if(riktning == 1)
    {
        nyttHuvud ={x:snake[0].x, y: snake[0].y - k};
    }
    else if(riktning == 2)
    {
        nyttHuvud ={x:snake[0].x+k, y: snake[0].y};
    }
    else if(riktning == 3)
    {
        nyttHuvud ={x:snake[0].x, y: snake[0].y+k};
    }
    else if(riktning == 4)
    {
        nyttHuvud ={x:snake[0].x-k, y: snake[0].y};
    }

    snake.unshift(nyttHuvud);  //Nytt huvud i början på arrayn snake
    if(nyttHuvud.x == food.x && nyttHuvud.y == food.y) //Tog mat
    {
        food.x = Math.floor(Math.random()*40)*k;
        food.y = Math.floor(Math.random()*30)*k;
        points++;
        fps++;
    }
    else{  // Tog ingen mat
        snake.pop();
    }
    // OM SNAKE LÄMNAR CANVAS
    if(nyttHuvud.x == cw) nyttHuvud.x = 0;
    if(nyttHuvud.y == ch) nyttHuvud.y = 0;
    if(nyttHuvud.x == -k) nyttHuvud.x = cw;
    if(nyttHuvud.y == -k) nyttHuvud.y = ch;

    for(let n = 1; n < snake.length; n++)
    {
        if(snake[0].x == snake[n].x && snake[0].y == snake[n].y)
        {
            //Krockat med sig själv
            gameOver();
            return;
        }
    }

   tid = setTimeout(function(){
      play =requestAnimationFrame(animation);
   }, 1000/fps);
    
}


function start()
{
    ctx.font="bold 30pt arial";
    ctx.textAlign ="center";
    ctx.fillStyle="green";
    ctx.fillText("SNAKE",160,120);
    ctx.font="bold 15pt arial";
    ctx.fillText("Tryck på \"space\" för att starta",160,180);
    snake = [{x:k*10, y:10*k},{x:k*9, y:10*k},{x:k*8, y:10*k},{x:k*7, y:10*k}];
    nyttHuvud = {x:0,x:0};
    food = {x:240, y:120};


}

function gameOver()
{
    ctx.clearRect(0,0,cw,ch);
    ctx.font="bold 30pt arial";
    ctx.textAlign ="center";
    ctx.fillStyle="red";
    ctx.fillText("GAME OVER",160,120);
    ctx.font="bold 15pt arial";
    ctx.fillText(points+" poäng",160,180);
    clearTimeout(tid);
    cancelAnimationFrame(play);
    spela=false;

}

window.addEventListener("keydown",function(){
     if(event.code == "ArrowUp" && riktning != 3)
     {
         riktning = 1;
     }
     if(event.code == "ArrowRight" && riktning != 4)
     {
         riktning = 2;
     }
     if(event.code == "ArrowDown" && riktning != 1)
     {
         riktning = 3;
     }
     if(event.code == "ArrowLeft" && riktning != 2)
     {
         riktning = 4;
     }
     if(event.code == "Space"&& spela== false)
     {
         spela=true;
         animation();
     }
});

start();
