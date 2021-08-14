// ground object, used for all tiles and holds info on paths / fences
function Ground(x,y,rX,rY,builtOn){
    this.x = x;
    this.y = y;
    this.rX=rX;
    this.rY=rY;
    this.builtOn=builtOn;
    this.fence="";
}
// builtOn: 0=nothing  1=path  2=neon-selected  3=temp-path  4=home    53=toilets

// draws the ground (not sprite based)
Ground.prototype.draw = function() {
    ctx.beginPath();
    ctx.moveTo(this.rX-25,this.rY);
    ctx.lineTo(this.rX,this.rY+15);
    ctx.lineTo(this.rX+25,this.rY);
    ctx.lineTo(this.rX,this.rY-15);
    ctx.lineTo(this.rX-25,this.rY);
    ctx.fillStyle = 'rgb(10,150,10)';
	ctx.fill();
	ctx.fillStyle = 'rgb(5,100,5)';
	ctx.stroke();

}

// draws the ground with a color given (should make the same soon (todo))
Ground.prototype.draw = function(color) {
    ctx.beginPath();
    ctx.moveTo(this.rX-25,this.rY);
    ctx.lineTo(this.rX,this.rY+15);
    ctx.lineTo(this.rX+25,this.rY);
    ctx.lineTo(this.rX,this.rY-15);
    ctx.lineTo(this.rX-25,this.rY);
    ctx.fillStyle = color;
	ctx.fill();
	ctx.fillStyle = 'rgb(5,100,5)';
	ctx.stroke();
}

// returns true if given cords are in a given tile
Ground.prototype.inTile = function(x,y){
    let t=false;
    if(y >= this.rY-(-Math.abs((x-this.rX)*.6)+15)){
        if(y <= this.rY+(-Math.abs((x-this.rX)*.6)+15))
            t=true;
    }
    return t;
}

// i don't think this is in use lol 
Ground.prototype.onQuarter = function(x,y){
    let t=false;
    if(y >= this.rY-(-Math.abs((x-this.rX)*.6)+15)){
        if(y <= this.rY+(-Math.abs((x-this.rX)*.6)+15))
            t=true;
    }
    return t;
}

// gets the tile that x and y are in
function getTile(x,y) {
    let temp = 0;
    tiles.forEach(tile=>{
        if(tile.inTile(x,y))
            temp=tile;
    });
    return temp;
}

// gets the quarter of the tile the cords are in (used for fences)
function getQuart(t,x,y){
    let dir="";
    if(t.rY > y)
        dir+="N";
    else
        dir+="S";
    if(x < t.rX)
        dir+="W ";
    else if(t.rX <= x)
        dir+="E ";
    
    return dir;
}

// draws the path
Ground.prototype.drawPath = function(){
    this.builtOn="1";
    ctx.beginPath();
    ctx.moveTo(this.rX-24,this.rY);
    ctx.lineTo(this.rX,this.rY+14);
    ctx.lineTo(this.rX+24,this.rY);
    ctx.lineTo(this.rX,this.rY-14);
    ctx.lineTo(this.rX-24,this.rY);
    ctx.fillStyle = 'rgb(50,50,50)';
	ctx.fill();
	ctx.fillStyle = 'rgb(5,100,5)';
	ctx.stroke();
}

Ground.prototype.drawHome = function(){
    ctx.drawImage(homeImage,this.rX-25,this.rY-35);
}

// resets fences / paths and draws it green
Ground.prototype.deleteTile = function(){
    this.builtOn=0;
    this.fence="";
    this.draw();
}

// 2 images used for both fences
const fenceR = new Image(25,30);
fenceR.src="./images/fence1.png";
const fenceL = new Image(25,30);
fenceL.src="./images/fence2.png";
// home image
const homeImage = new Image(50,50);
homeImage.src="./images/home.png";
// idk LOL
Ground.prototype.makeFence = function(q){
    this.fence += q;
    this.drawFence();
}

// this draws the fence, looks for what quarter(s) are needed
Ground.prototype.drawFence = function(){
    let allF = this.fence.split(" ");
    allF.forEach(f=>{
    if(f == "SE")
        ctx.drawImage(fenceL,this.rX,this.rY-15);
    else if(f=="NE")
        ctx.drawImage(fenceR,this.rX,this.rY-30);
    if(f == "NW")
        ctx.drawImage(fenceL,this.rX-25,this.rY-30);
    else if(f=="SW")
        ctx.drawImage(fenceR,this.rX-25,this.rY-15);
    });
}

let fenceChecked = true;

Ground.prototype.getFenceBoxes = function(){
    fenceChecked=true;
    // this.builtOn=2;
    checkFences(this,"SE",1,1,1);
    checkFences(this,"SW",-1,1,1);
    checkFences(this,"NE",1,-1,1);
    checkFences(this,"NW",-1,-1,1);
    this.builtOn ==4;
    if(fenceChecked){
        let div = document.createElement("div");
        let p = document.createElement("p");
        div.style.backgroundColor = "rgba(245,222,179,1)";
        p.style.fontSize="120%";
        div.style.position="absolute";
        p.textContent=`Is this Correct?`;
        div.style.border="2px solid black";
        div.style.top=`40px`;
        div.style.left=`40px`;
        let btn = document.createElement("button");
        btn.textContent="Yes";
        let btn2 = document.createElement("button");
        btn2.textContent="No";
        div.appendChild(p)
        div.appendChild(btn);
        div.appendChild(btn2);
        body.appendChild(div);
        btn2.onclick = function(){
            tiles.forEach(t=>{
                if(t.builtOn==2){
                    t.builtOn=0;
                }
            });
            div.remove();
        }
        btn.onclick = function(){
            let tempHomes=[];
            tiles.forEach(t=>{
                if(t.builtOn==2){
                    tempHomes.push(t);
                    t.builtOn=0;
                }
            });
            homes.push(tempHomes);
            div.remove();
        }
    }
}

function checkFences(og,str,xMod,yMod,d1) {
    let go=false;
    let x = 0, y=0;
    while(go==false){
        let t = getTile(og.rX+xMod*x,og.rY+yMod*y);
        if(t !=0){
            if(t.fence!=""){
                let op=t.fence.split(" ");
                op.forEach(o=>{
                    if(o==str)
                        go=true;
                });
            }
            if(t.builtOn==0)
                t.builtOn=2;
            if( d1 == 1){
                if(xMod==yMod){
                    checkFences(t,"NE",1,-1,0);
                    checkFences(t,"SW",-1,1,0);
                }
                if(xMod!=yMod){
                    checkFences(t,"NW",-1,-1,0);
                    checkFences(t,"SE",1,1,0);
                }
            }
        }
        else{
            go=true;
            complainFences();
        }
        x+=25, y+=15;
    }
}

function complainFences(){
    let p = document.createElement("p");
    p.style.backgroundColor = "rgba(245,222,179,.5)";
    p.style.fontSize="170%";
    p.style.position="absolute";
    p.textContent=`Fences are not all connected!`;
    p.style.border="2px solid black";
    p.style.top=`100px`;
    p.style.left=`100px`;
    body.appendChild(p);
    setTimeout(function(){p.remove();},2000);
    tiles.forEach(t=>{
        if(t.builtOn==2){
            t.builtOn=0;
        }
    });
    fenceChecked=false;
}

Ground.prototype.displayTempPath = function() {
    tiles.forEach(t=>{
        if(t.builtOn==3 && t != this){
            t.draw();
            t.builtOn=0;
        }
    })
    if(this.builtOn==0){
        this.builtOn=3;
        ctx.beginPath();
        ctx.moveTo(this.rX-24,this.rY);
        ctx.lineTo(this.rX,this.rY+14);
        ctx.lineTo(this.rX+24,this.rY);
        ctx.lineTo(this.rX,this.rY-14);
        ctx.lineTo(this.rX-24,this.rY);
        ctx.fillStyle = 'rgba(50,50,50,.5)';
        ctx.fill();
        ctx.fillStyle = 'rgb(5,100,5)';
        ctx.stroke();
    }
}

Ground.prototype.displayTempFence = function(quart) {
    // console.log(this);
    // ctx.beginPath();
    // ctx.moveTo(this.rX,this.rY);
    // if(quart.charAt(0)=='N')
    //     ctx.moveTo(this.rX,this.rY-15);
    // else if(quart.charAt(0)=='S')
    //     ctx.moveTo(this.rX,this.rY+15);
    // if(quart.charAt(1)=='W')
    //     ctx.moveTo(this.rX-25,this.rY);
    // else if(quart.charAt(1)=='E')
    //     ctx.moveTo(this.rX+25,this.rY);
    // ctx.moveTo(this.rX,this.rY);
    // ctx.fillStyle = 'rgb(50,50,50)';
	// ctx.fill();
	// ctx.fillStyle = 'rgb(205,100,5)';
	// ctx.stroke();
}
Ground.prototype.drawBuildings = function(){
    if(this.builtOn==51)
        ctx.drawImage(toiletPng,this.rX-25,this.rY-40);
    if(this.builtOn==52)
        ctx.drawImage(foodPng,this.rX-25,this.rY-40);
    if(this.builtOn==53)
        ctx.drawImage(drinkPng,this.rX-25,this.rY-40);
}

Ground.prototype.buildBuilding = function(){
    switch(selected.charAt(1)){
        case '1':
            ctx.drawImage(toiletPng,this.rX-25,this.rY-40);
            this.builtOn=51;
            break;
        case '2':
            ctx.drawImage(foodPng,this.rX-25,this.rY-40);
            this.builtOn=52;
            break;
        case '3':
            ctx.drawImage(drinkPng,this.rX-25,this.rY-40);
            this.builtOn=53;
            break;
        default:
            break;
    }
}