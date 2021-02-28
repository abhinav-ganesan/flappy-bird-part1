var myGamePiece;
var myObstacles=[];
var myScore;
var flappy="https://www.pngitem.com/pimgs/b/184-1842507_flappy-bird-png.png"

function startGame() {
  myGameArea.start();
  myGamePiece=new component(30,30, flappy, 10, 120, "image");
  myScore=new component("30px", "consolas", "#5f27cd", 280, 40, "text");
}

var myGameArea={
  canvas:document.createElement("canvas"),
  start:function(){
    this.canvas.width=600;
    this.canvas.height=370;
    this.context=this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo=0;
    this.interval=setInterval(updateGameArea, 20);
  },
  clear:function(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  }
}

function component(width, height, color, x, y, type){
  this.type=type;
  if(type=="image"){
    this.image = new Image();
    this.image,src=color;
  }
  this.width=width
  this.height=height;
  this.speedX=0;
  thisspeedY=0;
  this.x=x;
  this.y=y;
  this.update=function(){
    ctx=myGameArea.context;
    if(this.type=="text"){
      ctx.font=this.width+""+this.height;
      ctx.fillStyle=color;
      ctx.fillText(this.text, this.x, this.y);
    }
    else {
      ctx.fillStyle=color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    if(type=="image"){
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    else {
      ctx.fill=color;
      ctx.fillRect(this.x,this.y,this.width, this.height);
    }
  }
  this.newPos=function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith=function(otherobj){
    var myleft=this.x;
    var myright=this.x+(this.width);
    var mytop=this.y;
    var mybottom=this.y+(this.height);
    var otherleft=otherobj.x;
    var otherright=otherobj.x+(otherobj.width);
    var othertop=otherobj.y;
    var otherbottom=otherobj.y+(otherobj.height);
    var crash=true;
    if((mybottom<othertop) || (mytop>otherbottom) || (myright<otherleft) || (myleft>otherright)){
      crash=false;
    }
    return crash;
  }
}
