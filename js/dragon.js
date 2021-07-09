// rn only dragon exists, will usee as template for other animals probably
function Dragon(name,x,y) {
    this.name=name;
    this.x=x;
    this.y=y;
    this.aX=0;
    this.aY=0;
    this.id="Dragon";
    this.nextP;
}

// used to create the sprite for the dragon
const dragPic = new Image(32,57);
dragPic.src="./images/dragonStand3.png";

// draws the sprite
Dragon.prototype.draw = function(){
    ctx.drawImage(dragPic,this.x-16,this.y-57);
}

// if clicked on say it's name
Dragon.prototype.clicked = function(x,y){
    if(this.x+16 >= x && x >= this.x-16){
        if(this.y >= y && y >= this.y-57){
            let p = document.createElement("p");
            p.style.backgroundColor = "rgba(245,179,179,.5)";
            p.style.fontSize="70%";
            p.style.position="absolute";
            p.textContent=`Rawr I'm ${this.name}`;
            p.style.border="2px solid black";
            p.style.top=`${this.y - 20}px`;
            p.style.left=`${this.x - 20}px`;
            body.appendChild(p);
            setTimeout(function(){p.remove();},2000);
        }
    }
}

// finds a random peep to hunt, idk why set to 0 by default (look into)
Dragon.prototype.findPeep = function(){
    let rand = random(0,peeps.length);
    this.nextP= peeps[0];
}

// pretty basic move thing, needs work
Dragon.prototype.move = function(){
    if(this.nextP !== undefined ){
        if(this.x > this.nextP.x)
            this.aX=-4;
        else 
            this.aX=4;
        if(this.y > this.nextP.y)
            this.aY=-4;
        else 
            this.aY=4;
        
        this.x+=this.aX;
        this.y+=this.aY;
        
        if(this.x == this.nextP.x && this.y == this.nextP.y)
        console.log("gottem");
    }
    else{
            this.findPeep();
    }
    


    this.draw();
}

// a function that just creates a test dragon lol
function dragonSpawn(){
    let d = new Dragon("Chrisa",100,100);
    drags.push(d);
}