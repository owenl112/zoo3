function Person(name,x,y){
    this.name=name; // peep name
    this.x=x; // X cord
    this.y=y; // Y cord
    this.aX=0; // X move
    this.aY=0; // Y move
    this.wander=true; // if they are just walking
    this.object=0; // what objective they have
    this.nxt=0; // where to walk next
    this.hunger=random(50,100); // hunger
    this.thirst=random(50,100); // thirst
    this.energy=random(75,100); // energy
    this.bathroom=random(25,100); // bathroom 
    this.id="Person";
}

// makes person image
let personPicture = new Image();
personPicture.src = "./images/peep2.png";

// draws person
Person.prototype.draw = function(){
    ctx.drawImage(personPicture,this.x-8,this.y-32);
}

// this checks if the peeps feet are on a path
Person.prototype.feet = function(){
    let t=false;
    tiles.forEach(tile=>{
        if(tile.inTile(this.x,this.y) && tile.builtOn==1){
            t=true;
        }
    })
    return t;
}

// this checks if they were clicked on
Person.prototype.clicked = function(x,y){
    if(this.x+8 >= x && x >= this.x-8){
        if(this.y >= y && y >= this.y-32){
            let p = document.createElement("p");
            p.style.backgroundColor = "rgba(245,222,179,.8)";
            p.style.fontSize="70%";
            p.style.whiteSpace = "pre-line";
            p.style.position="absolute";
            p.textContent=`Hey I'm ${this.name} \n Energy: ${this.hunger}/100 \n Hunger: ${this.hunger}/100 \n Thirst: ${this.thirst}/100 \n Bathroom: ${this.bathroom}/100`;
            p.style.border="2px solid black";
            p.style.top=`${this.y + 10}px`;
            p.style.left=`${this.x + 10}px`;
            body.appendChild(p);
            setTimeout(function(){p.remove();},4000);
        }
    }
}

// this will handle how they move (FML this is going to kill me)
Person.prototype.move = function(){
    if(this.feet){
        if(this.wander){
            if(this.nxt==0){
                
            }
        }
    }
}

// function to spawn peeps, kinda messy but it actually does work :)
function peepSpawn() {
    let spawnables=[];
    let spawnCount=0;
    tiles.forEach(tile=>{
        if(tile.builtOn == 1){
            spawnables.push(tile);
            spawnCount++;
        }
    });
    spawnCount -= peeps.length;
    spawnCount = spawnCount/random(2,6);
    while(spawnCount>0){
        let random1 = random(0,spawnables.length);
        let sX = 0 + spawnables[random1].rX + random(-20,20);
        let sY = spawnables[random1].rY + random(Math.floor(-Math.abs((sX-spawnables[random1].rX)*.6)+15)-2,Math.floor(+Math.abs((sX-spawnables[random1].rX)*.6)-15)+2);
        let p = new Person("John",sX,sY);
        p.draw();
        peeps.push(p);
        spawnables.splice(random1,1);
        spawnCount--;
    }
    
}