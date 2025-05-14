const hexagon = document.querySelector("#hexagon");
const gameTimerDisplay = document.querySelector('#gameTimer'); 
const playerTimerDisplay = document.querySelector("#playerTimer");
const cenX = 250;
const cenY = 250;
let arr = [];
let weight_arr = [];
let angle = 0;
let weight_angle = 0;
let arr75, weight_arr75 = [];
let arr150, weight_arr150 = [];
let arr225, weight_arr225 = [];
let titan = true;
let red  = 4;
let blue = 4;
let winDisplay = document.querySelector('#winDisplay');
let scoreRed,scoreBlue;

const line = function(){ 
    for(let i = 0; i<6; i++){
        let p = document.createElementNS("http://www.w3.org/2000/svg", "line");//we can't use just createElement because svg is non-standard
        p.setAttribute('x1',arr[i][0]);
        p.setAttribute('y1',arr[i][1]);
            if(i != 5){
            p.setAttribute('x2',arr[i+1][0]);
            p.setAttribute('y2',arr[i+1][1]);
            }else{
                p.setAttribute('x2',arr[0][0]);
                p.setAttribute('y2',arr[0][1]);
            }
            p.setAttribute('stroke','black');
            p.setAttribute('stroke-width', 2.5);
            hexagon.appendChild(p);
        }
    }

function circle(R){           
    for(let i = 0; i<6; i++){
        let p = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        p.setAttribute('cx',arr[i][0]);
        p.setAttribute('cy',arr[i][1]);
        p.setAttribute('r', 12);
        p.setAttribute('fill', 'grey');
        p.setAttribute('stroke','black');
        p.setAttribute('id',`node${R}${i}`);
        
        p.addEventListener('click',()=>{
            click(p);
        })
        hexagon.appendChild(p);
        }
}

const line_outerinner= function(){
    for(let i = 0; i<6; i++){
        let p = document.createElementNS("http://www.w3.org/2000/svg", "line");
        p.setAttribute('x1',arr150[i][0]);
        p.setAttribute('y1',arr150[i][1]);
        if(i%2==0){
            p.setAttribute('x2',arr75[i][0]);
            p.setAttribute('y2',arr75[i][1]);
        }else{
            p.setAttribute('x2',arr225[i][0]);
            p.setAttribute('y2',arr225[i][1]);
        }
        p.setAttribute('stroke','black');
        p.setAttribute('stroke-width', 1.5);
        // hexagon.appendChild(p);
        hexagon.insertBefore(p, hexagon.firstChild);
    }
}

const weightValue75 = [9, 8, 8, 9, 8, 8];
const weightValue150 = [4, 6, 5, 4, 6, 5];
const weightValue225 = [2, 1, 2, 3, 1, 1];
const weight = function(weight_arr, weightValue){
    for(let i = 0; i<6; i++){
        let p = document.createElementNS("http://www.w3.org/2000/svg", "text");
        p.setAttribute('x', weight_arr[i][0]);
        p.setAttribute('y', weight_arr[i][1]);
        p.setAttribute('fill', 'black');
        p.setAttribute('font-size',20);
        p.setAttribute('font-weight',2);
        p.setAttribute('text-anchor', 'middle');
        p.setAttribute('dominant-baseline', 'middle');
        
        p.textContent = weightValue[i];
        hexagon.appendChild(p);
    }
    for(let i = 0; i<6; i++){
        let p = document.createElementNS("http://www.w3.org/2000/svg", "text");
        if(i % 2 == 0){
            p.setAttribute('x', (weight_arrI75[i][0]+weight_arrI150[i][0])/2);
            p.setAttribute('y', (weight_arrI75[i][1]+weight_arrI150[i][1])/2);
        }else{
            p.setAttribute('x', (weight_arrI225[i][0]+weight_arrI150[i][0])/2);
            p.setAttribute('y', (weight_arrI225[i][1]+weight_arrI150[i][1])/2);
        }
        p.setAttribute('fill', 'black');
        p.setAttribute('font-size',20);
        p.setAttribute('font-weight',1);
        p.setAttribute('text-anchor', 'middle');
        p.setAttribute('dominant-baseline', 'middle');
        p.textContent = '1';
        hexagon.appendChild(p);
    }
}
let weight_angle1;
let weight_arr1 = [];
let weight_arrI75 = [];
let weight_arrI150 = [];
let weight_arrI225 = [];
for(let R = 75; R<=225; R+=75){
    for(let i = 0; i < 6; i++){
        angle = i*Math.PI/3;
        let x = cenX + R * Math.cos(angle);
        let y = cenY + R * Math.sin(angle);
        arr.push([x,y]);
    }
    for(let i = 0; i < 6; i++){
        weight_angle = Math.PI/6 + i*Math.PI/3;
        let x = cenX + (R-40)* Math.cos(weight_angle);
        let y = cenY + (R-40)* Math.sin(weight_angle);
        weight_arr.push([x,y]);
    }
    for(let i = 0; i < 6; i++){
        weight_angle1 = Math.PI/36 + i*Math.PI/3;
        let x = cenX + R * Math.cos(weight_angle1);
        let y = cenY + R * Math.sin(weight_angle1);
        weight_arr1.push([x,y]);
    }
    line();                     //cannot call a function if its created below its calling UNLESS it is hoisted
    circle(R);                  //*HEXAGON STRUCTURE MADE*
    
        if(R == 75){
        arr75 = arr;
        weight_arr75 = weight_arr;
        weight_arrI75 = weight_arr1;
        }
        if(R == 150){
        arr150 = arr;
        weight_arr150 = weight_arr;
        weight_arrI150 = weight_arr1;
        }
        if(R == 225){
        arr225 = arr;
        weight_arr225 = weight_arr;
        weight_arrI225 = weight_arr1;
        }
    arr = [];
    weight_arr = [];
    weight_arr1 = [];
}
line_outerinner();
weight(weight_arr75, weightValue75);
weight(weight_arr150, weightValue150);
weight(weight_arr225, weightValue225);

const playerChance = document.querySelector('#playerChance');     // Player Display
function updatePlayerDisplay(){                     
        if(titan){
            playerChance.innerHTML = 'Player 1';
            playerChance.style.color = 'red';
        }else{
            playerChance.innerHTML = 'Player 2';
            playerChance.style.color = 'blue';
        }
}

//everytime when a node is clicked

let move = false;
function click(p){
    if(isPaused) return; //if game is paused click should not work
    if(red==0 && blue==0 && move==false){
        movementPhase1(p);
        // move = true;
    }
    else if(red==0 && blue==0 && move==true){
        movementPhase2(p);
    }
    else{
        let id = p.getAttribute('id');
        if(p.getAttribute('fill') != 'grey') return;//to check if the circle was already filled
        let filled = true;
        // let filled1 = true;
        if(id.includes('node150')){
            filled = isOuterFilled();
        }
        if(id.includes('node75')){
            filled = isMiddleFilled();
        }
        if(filled == true){
            if(titan==true){
                titan = !titan;
                if(red>0){
                p.setAttribute('fill', 'red');
                red--;
                } 
            }else{
                titan = !titan;
                if(blue>0){
                p.setAttribute('fill', 'blue');
                blue--;
                }
            }
            playerTime = 10;
        }
    }
    updatePlayerDisplay();
    score();
    win();
}

//***placement phase***

function isOuterFilled(){
    for(let i = 0; i<6; i++){
        let check = document.querySelector(`#node225${i}`);
        if(check.getAttribute('fill') == 'grey') return false; 
    }
    return true;
}
function isMiddleFilled(){
    for(let i = 0; i<6; i++){
        let check = document.querySelector(`#node150${i}`);
        if(check.getAttribute('fill') == 'grey') return false; 
    }
    return true;
}

//**Movement Phase**

const possibleMovement = [[2250,2251,2255],[2251,2252,2250,1501],[2252,2253,2251],[2253,2254,2252,1503],[2254,2255,2253],[2255,2250,2254,1505],
                          [1500,1501,1505,750],[1501,1502,1500,2251],[1502,1503,1502,752],[1503,1504,1502,2253],[1504,1505,1503,754],[1505,1500,1504,2255],
                          [750,751,755,1500],[751,752,750],[752,753,751,1502],[753,754,752],[754,755,753,1504],[755,750,754]];
let moveArr;
let colour;
function movementPhase1(p){
    let id  = p.getAttribute('id');
    if(titan) colour = 'red';
    else colour = 'blue';
    if(p.getAttribute('fill') == colour){
        for(let i of possibleMovement){
            if(id == `node${i[0]}`){
                moveArr = i;
                move = true;
            }
        }
    }
}
function movementPhase2(p){
    if(p.getAttribute('id') == `node${moveArr[0]}`){
        move = false;
        return;
    }
    if(p.getAttribute('fill') == 'grey'){
        for(let i of moveArr){
            if(p.getAttribute('id') === `node${i}`){
                let id1 = document.querySelector(`#node${moveArr[0]}`);
                p.setAttribute('fill', id1.getAttribute('fill'));
                id1.setAttribute('fill','grey');
                move = false;
                titan = !titan;
                playerTime = 10;
            }
        }
    }
}

//game timer

let totalTime = 5*60;
let gameTime = totalTime;
let gameTimer = setInterval(()=>{
    gameTime--;
    if((gameTime%60)<10){
        gameTimerDisplay.innerHTML = `Game Time 0${Math.floor(gameTime/60)}:0${gameTime%60}`;
    }else{
    gameTimerDisplay.innerHTML = `Game Time 0${Math.floor(gameTime/60)}:${gameTime%60}`;
    }
    if(gameTime == 0){
        clearInterval(gameTimer);
        if(scoreRed>scoreBlue) winDisplay.innerHTML = 'Player 1 wins!';
        else if(scoreRed<scoreBlue) winDisplay.innerHTML = 'Player 2 wins!';
        else winDisplay.innerHTML = "It's a tie!";
    }
},1000)

//player timer

let playerTime = 10;
let playerTimer = setInterval(()=>{
    playerTime--;
    playerTimerDisplay.innerHTML = `Player Time 0${playerTime%60}`;
    if(playerTime == 0){
        playerTime = 10;
        if (red === 0 && blue === 0) {
            move = false;
        }
        titan = !titan;
        updatePlayerDisplay();
    }
},1000)

//pause and resume buttons

const pause = document.querySelector('#pause');
const resume = document.querySelector('#resume');
let isPaused = false;
pause.addEventListener('click',()=>{
    clearInterval(gameTimer);
    clearInterval(playerTimer);
    isPaused = true;
})

resume.addEventListener('click',()=>{
    if(isPaused == false) return;

    gameTimer = setInterval(()=>{
        gameTime--;
        if((gameTime%60)<10){
            gameTimerDisplay.innerHTML = `Game Time 0${Math.floor(gameTime/60)}:0${gameTime%60}`;
        }else{
            gameTimerDisplay.innerHTML = `Game Time 0${Math.floor(gameTime/60)}:${gameTime%60}`;
        }
        if(gameTime == 0){
            clearInterval(gameTimer);
        }
    },1000)
    playerTimer = setInterval(()=>{
        playerTime--;
        playerTimerDisplay.innerHTML = `Player Time 0${playerTime%60}`;
        if(playerTime == 0) playerTime = 10;
    },1000)
    isPaused = false;
})

//Reset

const reset = document.querySelector("#reset");
reset.addEventListener('click',()=>{
    for(let R=75; R<=225; R+=75){
        for(let i=0; i<6; i++){
            let id= document.querySelector(`#node${R}${i}`);
            id.setAttribute('fill','grey');
        }
    }
    playerTime = 10;
    gameTime = totalTime;
    titan = true;
    playerChance.innerHTML = 'Player 1';
    p1.innerHTML = `Player 1: 0`; 
    p2.innerHTML = `Player 2: 0`;
    red = 4;
    blue = 4;
})

//Scoring

const scoringNodes = [[2250,2251,2],[2251,2252,1],[2252,2253,2],[2253,2254,3],[2254,2255,1],[2255,2250,1],
                      [1500,1501,4],[1501,1502,6],[1502,1503,5],[1503,1504,4],[1504,1505,6],[1505,1500,5],
                      [750,751,9],[751,752,8],[752,753,8],[753,754,9],[754,755,8],[755,750,8],
                      [750,1500,1],[1501,2251,1],[752,1502,1],[1503,2253,1],[754,1504,1],[1505,2255,1]];
let p1 = document.querySelector('#p1');
let p2 = document.querySelector('#p2');
function score(){
    scoreRed = 0;
    scoreBlue = 0;
    for(let i of scoringNodes){
        let id1 = document.querySelector(`#node${i[0]}`);
        let id2 = document.querySelector(`#node${i[1]}`);
        if(id1.getAttribute('fill') == id2.getAttribute('fill')){
            if(id1.getAttribute('fill') == 'red'){
                scoreRed += i[2];
            }
            if(id1.getAttribute('fill') == 'blue'){
                scoreBlue += i[2];
            }
        }
    } 
    p1.innerHTML = `Player 1: ${scoreRed}`; 
    p2.innerHTML = `Player 2: ${scoreBlue}`;
}
function win(){
    for(let i= 0; i<6; i++){
        let id = document.querySelector(`#node75${i}`);
        if(id.getAttribute('fill') == 'grey') return; 
    }
    if(scoreRed>scoreBlue) winDisplay.innerHTML = 'Player 1 wins!';
    else if(scoreRed<scoreBlue) winDisplay.innerHTML = 'Player 2 wins!';
    else winDisplay.innerHTML = "It's a tie!";
    clearInterval(gameTimer);
    clearInterval(playerTimer);
}



   

    

    
    

