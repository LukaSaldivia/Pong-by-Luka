const version = '1.0.3'

document.querySelector('#version').textContent = version;

window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  if(check){
    document.querySelector('#scorePl1').classList.add('mobile')
  }
};


mobileAndTabletCheck();
// Declaración general del canvas, elementos y variables

let c = document.querySelector("#c");

let ctx = c.getContext("2d");

let startPowerUps;

let mandarValores_Timeout;

let isPaused = false;

const pauseMenu = document.querySelector('#pauseMenu');



const player1_display = document.querySelector('#scorePl1');
const player2_display = document.querySelector('#scorePl2');
var [score_player1, score_player2] = [0,0];


// c.style.backgroundColor = "#00000040"

let sizes = {
  w: 400,
  h: 600
}


c.width = sizes.w;
c.height = sizes.h;

document.querySelector('#iniciarBtn').addEventListener('click',()=>{
  document.querySelector('#mainMenu').classList.add('started')
setTimeout(()=>{
  document.querySelector('.game').classList.add('started');
  setTimeout(()=>{
    restart();
    loop();
  },1000)

},400)
})



let player1Movement = [];
let player2Movement = [];


// Declaración de Clases y consecutivamente los objetos cuyas clases

/////// Clase Field
class Field{
  constructor(){
    this.width = sizes.w;
    this.height = sizes.h;
    this.scaleX = 1;

    this.default = {
      width : sizes.w,
      height : sizes.h,
      scaleX : 1,
    }
    
    this.attributes = []
  }
  
  update(){
    updateActiveAttributes(this);
    c.width = this.width
    c.height = this.height
    c.style.transform = `scaleX(${this.scaleX}`;
  }

  reset(){
    this.width = sizes.w;
    this.height = sizes.h;
    this.scaleX = 1;
    this.attributes = []
  }
   
}

let field = new Field();


/////// Clase Player
class Player{
  constructor(xpos,ypos,width,height,color,speed,player){
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.player = player;
    
    this.dx = 0;
    
    this.default = {
      width : 100,
      height : 5,
      color : 'white',
      speed : 5
    }
    
    this.attributes = []
  }
  
  draw(context){
    context.fillStyle = this.color;
    context.fillRect(this.xpos,this.ypos,this.width,this.height)
  }
  
  update(context){
    updateActiveAttributes(this);
    this.xpos = this.dx+this.xpos
    
    if(this.xpos<0){
      this.xpos = 0;
    }
    if((this.xpos+this.width)>sizes.w){
      this.xpos=sizes.w-this.width;
    }

    this.draw(context);
  }

  reset(){
    this.xpos = 145;
    this.width = 100;
    this.height = 5;
    this.color = '#FFFFFF';
    this.speed = 5;
    
    this.dx = 0;

    this.attributes = [];
  }

  
}
/////// Fin Clase Player

let player1 = new Player(145,20,100,5,'white',0,1)
let player2 = new Player(145,580,100,5,'white',0,-1)
let players = [];
players.push(player1);
players.push(player2);
players.forEach((player) => {player.draw(ctx)
})
// 

/////// Clase Ball
class Ball{
  constructor(xpos,ypos,radius,color,speed){

    

      this.xpos = xpos;
      this.ypos = ypos;
      this.radius = radius;
      this.color = color;
      this.speed = speed;
      
      this.dx = 1* 5;
      this.dy = 1* this.speed;
      
      this.ang = Math.random() * ((0.1-0.05)-0.05)+0.05;
      
      
      
      this.lastBounce = 0;

      this.change = false;

      this.default = {
        color : 'white',
        speed : 5,
        change : true,
        radius : 5
      }
      
      this.attributes = []
      
    }
    draw(context){
      context.beginPath()
      context.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2,false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath()
      
    }
    
    update(context){

      updateActiveAttributes(this);
      
      this.xpos += this.dx*this.ang*3;
      
 

      this.ypos += this.dy;

  

        this.setDy()
      


    
    
    let shakeAmount = 30;
    
    if((this.xpos + this.radius) > sizes.w){
      this.xpos = sizes.w-this.radius;
      this.dx = -this.dx;
      
      
        c.style.marginLeft = `${shakeAmount}px`;
        setTimeout(()=>{c.style.marginLeft = '0px'},100)
      
    }
    
    if((this.xpos - this.radius) < 0){
      this.xpos = this.radius;
      this.dx = -this.dx;
      
        c.style.marginRight = `${shakeAmount}px`;
        setTimeout(()=>{c.style.marginRight = '0px'},100)
      
    }
    if((this.ypos + this.radius) > sizes.h){
      this.ypos = sizes.h-this.radius;
      this.dy = -this.dy;
      
        score_player1++;        score(player1_display,score_player1);
        
        
        c.classList.add('goal');
        c.style.backgroundPosition = `top`;
        setTimeout(()=>{c.style.backgroundPosition = 'center'},600)
        setTimeout(()=>{c.classList.remove('goal')},700)
        
        restart();
      
    }
    
    if((this.ypos - this.radius) < 0){
      this.ypos = 0+this.radius;
      this.dy = -this.dy;
      
        score_player2++;
        score(player2_display,score_player2);


        c.classList.add('goal');
        c.style.backgroundPosition = `bottom`;
        setTimeout(()=>{c.style.backgroundPosition = 'center'},600)
        setTimeout(()=>{c.classList.remove('goal')},700)
        restart();
      
    }

    
    
    this.draw(context);
  }
  
  reset(){
    
    this.attributes =  [];

  this.speed = 0;
  this.dx = 1* this.speed;
  this.dy = 1* -this.speed;
  this.color = 'white'
  this.xpos = 200;
  this.ypos = 300;
  this.ang = Math.random() * ((0.1-0.05)-0.05)+0.05;

  setTimeout(()=>{
    this.speed = 4;
    this.dx = 1* this.speed;
    this.dy = 1* this.speed*(Math.random() > 0.5 ? -1 : 1);
    this.color="white"
  },3000)

  }

  setDefault(){
    this.speed = 4;
    this.dx = 1* this.speed;
    this.dy = 1* -this.speed;
    this.color="white"
  }

  setDy(){
    if(this.change){
      this.change = false;

      let dir = this.dy > 0?1:-1;
      this.dy = 1*this.speed*dir;

    }
  }
  
}
/////// Fin Clase Ball
let white = new Ball(200,300,5,"white",0)
white.draw(ctx)


// 

let powerups = []


// Clase PowerUp
class PowerUp{
  constructor(name,enviroment, probability,time,negative,attr,description){

    this.description = description;

    this.xpos =0
    this.ypos =0

    this.lastBounce = 1;

    this.negative = negative


    this.name = name;
    this.enviroment = enviroment;
    this.probability = probability;
    this.time = time
    this.attr = {...attr}
    this.target = Math.random() > 0.5 ? 1 : -1
    this.path = `./images/powerups/${this.name}.png`;
    this.icon = new Image;
    this.icon.src = this.path;
    this.radius = 20;
    this.offset = 0;
    this.dir = Math.random() > 0.5 ? 1 : -1;

    
    if(this.enviroment == 'player'){
      this.color = this.target * this.lastBounce *this.negative == this.lastBounce ? '#228c22' : '#ba0707'
    }else{

      this.color = '#9e006c'
    }
  }
  draw(context){
    context.beginPath()
    context.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2,false);
    context.fillStyle = this.color;
    context.fill();
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
    context.drawImage(this.icon,this.xpos-this.radius+4,this.ypos-this.radius+4,32,32);
    context.shadowColor = 'white'
  }
  
  update(context){
    this.ypos += this.dir/3;
    this.lastBounce = white.lastBounce
    this.draw(context)
  }
}

let powerups_list = [

  new PowerUp('slow','player',0.5,6000,-1,{
    speed: 3,
    color: '#22BB55'
  },`Realentiza la paleta correspondiente.`)
  ,
  new PowerUp('fast','player',0.6,12000,1,{
    speed: 7,
    color: '#FFFF23'
},'Aumenta la velocidad a la paleta correspondiente.')
,
new PowerUp('ampliar','player',0.5,8000,1,{
  width: 150
},'Hace la paleta más larga del jugador correspondiente.')
,
new PowerUp('reducir','player',0.2,4000,-1,{
  width: 50
},'Hace la paleta más corta del jugador correspondiente.')
,
new PowerUp('deathball','ball',0.05,2000,0,{
  speed: 9,
  color: "red",
  change: true
},'Aumenta la velocidad de la pelota.')
,
new PowerUp('mirror','field',0.1,5000,0,{
  scaleX: -1 
},'Invierte la cancha.')
,
new PowerUp('invisible','player',0.08,5000,-1,{
  color: '#00000000'
},'Hace invisible a la paleta correspondiente.')

]








// Inicio de juego

//  Inicio de loop
// loop();





// Controles



document.addEventListener('keydown', (e) =>{

  if(e.code == 'Enter' || e.code == 'NumpadEnter'){
    e.preventDefault()
  }
  console.log(e.code);

  switch (e.code) {
    case 'KeyA':
      player1Movement.push('left');
      
      break;
    case 'KeyD':
      player1Movement.push('right');
      
      break;
    case 'ArrowLeft':
      player2Movement.push('left');
      
      break;
      case 'ArrowRight':
      player2Movement.push('right');
      
      break;
  
    default:
      break;
  }


  if(e.code=='Escape'){
    isPaused = !isPaused
    if(!isPaused){
      loop();
    }
    // pause();
  }

  
  
})

document.addEventListener('keyup',e=>{
  if(e.key.toLowerCase()=='a'){
    player1Movement = player1Movement.filter(mov => mov != 'left');
  }
  if(e.key.toLowerCase()=='d'){
    player1Movement = player1Movement.filter(mov => mov != 'right');    
  }
  
  if(e.code=='ArrowLeft'){
    player2Movement = player2Movement.filter(mov => mov != 'left');
  }
  if(e.code=='ArrowRight'){
    player2Movement = player2Movement.filter(mov => mov != 'right');
  }
})


document.addEventListener('touchstart', (e) => {
  const control1 = document.querySelector('#control1');
  const control2 = document.querySelector('#control2');
  const control3 = document.querySelector('#control3');
  const control4 = document.querySelector('#control4');

  switch (e.target) {
    case control1:
      player1Movement.push('left');

      break;
    case control2:
      player1Movement.push('right');
      break;
    case control3:
      player2Movement.push('left');
      break;
    case control4:
      player2Movement.push('right');
      break;
  
    default:
      break;
  }
})

document.addEventListener('touchend',(e)=>{
  const control1 = document.querySelector('#control1');
  const control2 = document.querySelector('#control2');
  const control3 = document.querySelector('#control3');
  const control4 = document.querySelector('#control4');

  switch (e.target) {
    case control1:
      player1Movement = player1Movement.filter(mov => mov != 'left');      
      break;
      case control2:
      player1Movement = player1Movement.filter(mov => mov != 'right');
      break;
      case control3:
      player2Movement = player2Movement.filter(mov => mov != 'left');
      break;
      case control4:
        player2Movement = player2Movement.filter(mov => mov != 'right');
      break;
  
    default:
      break;
  }
})

// Funciones

function loop(){
  ctx.clearRect(0,0,sizes.w,sizes.h);
  if(!isPaused){
    requestAnimationFrame(loop);
  }
  
  
  field.update();
  white.update(ctx);
  
  players.forEach(e=>{
    e.update(ctx)
  })

  powerups.forEach(e =>{
    e.update(ctx)
  })

  

  collisions(player1,player2,white,powerups)


  playersMovement(player1Movement);
  playersMovement(player2Movement);



}

function playersMovement(playerXMovement) {
  let player = playerXMovement == player1Movement ? player1 : player2;
  if(playerXMovement[playerXMovement.length-1] == 'right'){
    player.dx = player.speed;
  }
  if(playerXMovement[playerXMovement.length-1] == 'left'){
    player.dx = -player.speed;
  }

  if(playerXMovement.length == 0){
    player.dx = 0;
  }

  

  
}





function score(parent_display, score) {
  parent_display.textContent = score

}



function collisionBallRectangle(obj1, obj2) {
  if(
    obj1.xpos+obj1.radius >= obj2.xpos && 
    obj1.xpos <= obj2.xpos+obj2.width &&
    obj1.ypos+obj1.radius >= obj2.ypos &&
    obj1.ypos <= obj2.ypos+obj2.height
  ){
    let dist = ((obj2.xpos+obj2.width)-obj1.xpos);
    const cuenta = dist - obj2.width/2;
    let ang = cuenta < 0 ? (cuenta)*-1 : cuenta

    let dir = cuenta < 0 && obj1.dx > 0 ? 1 :
    cuenta < 0 && obj1.dx < 0 ? -1 :
    cuenta > 0 && obj1.dx > 0 ? -1 : 1;

    obj1.dy = -obj1.dy;
    
    obj1.ang = ang/100;
    obj1.dx = obj1.dx*dir;
    if(obj2.ypos == 20){
      obj1.lastBounce = 1;
    }else{
      obj1.lastBounce = -1;
    }


  }
}

function updateActiveAttributes(obj){
  let currentTime = Math.floor(Date.now() / 1000)

  for (let i = 0; i < obj.attributes.length; i++){
    let effect = obj.attributes[i].source;
    
    Object.assign(obj,effect.attr)

    let duration = effect.time;
    let elapsedTime = currentTime - effect.start_time;

    if(elapsedTime*1000 > duration){
      obj.attributes.splice(i,1);
      Object.assign(obj,obj.default)
    }
  }
}


function collisionPwrUpBall(obj1, [...balls]) {
  balls.forEach((c,i) => {
    let xDis = c.xpos - obj1.xpos;
    let yDis = c.ypos - obj1.ypos; 

    let math = Math.sqrt(Math.pow(xDis,2)+Math.pow(yDis,2));

    if(math < c.radius+2 + obj1.radius){
      powerups.splice(i,1)

      let target;
      switch (c.enviroment) {
        case 'ball':
          target = white;
          break;
        case 'player':
          players.forEach((e,i) => {
            if(e.player == c.target*c.lastBounce){
              target = players[i];
            }
          })
          break;

          case 'field':

          target = field;
            break;
        default:
          break;
      }
      mandarValores(target,c);
    }


  })
}

function collisions(rect1,rect2,ball1,[...balls]) {
  collisionBallRectangle(ball1,rect1);
  collisionBallRectangle(ball1,rect2);
  collisionPwrUpBall(ball1,[...balls])
}

function restart (){
  white.reset();
  players.forEach((player) => {
    player.reset();
  })
  field.reset();
  powerups = [];
  clearInterval(startPowerUps);
  clearTimeout(mandarValores_Timeout);
  setTimeout(()=>{  addObjectsRandomly(powerups_list,powerups)
  },3000)

}

function addObjectsRandomly(objectsArray, newArray) {

  let spawnTime = 2;
  let limit = 20;

  startPowerUps = setInterval(() => {
    let arrayLength = newArray.length;
      let randomProbability
      do {
        randomProbability = Math.random()
        let randomNumber = Math.floor(Math.random() * (objectsArray.length-0)+0)
        if (randomProbability <= objectsArray[randomNumber].probability) {
          let o = objectsArray[randomNumber];
          let clone = new PowerUp(o.name,o.enviroment,o.probability,o.time,o.negative,o.attr);
          newArray.push(clone);
          let obj = clone;
          let randomX = Math.random() * ((sizes.w-100)-100)+100;
          let randomY = Math.random() * ((sizes.h-100)-100)+100;
          obj.xpos = randomX
          obj.ypos = randomY;
        }


      } while (newArray.length == arrayLength);
      if(newArray.length == limit+1){
        newArray.shift();
      }
  
      console.table(newArray)
  }, spawnTime*1000);

}

function mandarValores(target,source)
{
source.start_time = Math.floor(Date.now()/1000);
target.attributes.push({source})



}

function pause(){
  if(isPaused){
    pauseMenu.classList.add('active')
  }else{
    pauseMenu.classList.remove('active');
  }
}


function closeWindow(querySelector) {
  let e = document.querySelector(querySelector);
  e.style.display = 'none';
}

function openWindow(querySelector) {
  let e = document.querySelector(querySelector);
  e.style.display = 'flex';
}

function uploadPowerups(target,[...powerups]){
  powerups.forEach((e)=>{
    target.insertAdjacentHTML('beforeend',`
    <div class="power-up">
              <img src="${e.path}" alt="${e.name}">
              <p><b>Descripción: </b>${e.description}</p>
              <p><b>Duración: </b>${e.time/1000} segundos</p>
              <p>${e.enviroment == 'player'? 'Afecta a jugadores':'No afecta a nadie en particular'}</p>
            </div>
    `)
  })
}

uploadPowerups(document.getElementById('powerups-box'),powerups_list)