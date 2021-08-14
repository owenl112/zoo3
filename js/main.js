const canvas = document.querySelector("canvas"); // get canvas
const body = document.querySelector("body"); // get body
let ctx = canvas.getContext('2d'); // idk used for drawing I think
let width = canvas.width = window.innerWidth -10; // sets width
let height = canvas.height = window.innerHeight -10; // sets height
// arrays for tiles, people and dragons 
let tiles=[];
let peeps=[];
let drags=[];
let homes=[];
// draws background
ctx.fill();
ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
ctx.fillRect(0, 0, width, height);

// this whole thing just makes the tiles
let yCords=15;
let xCords=0;
while(yCords < Math.round(height / 15)*15){
	while(xCords < Math.round(width / 50)*50 -50){
		xCords+=50;
		 if(yCords%2 !=0 && xCords ==50)
			 xCords -=25;
		let g = new Ground(Math.floor(xCords/50),(yCords/15)-1,xCords,yCords,0,0);
        tiles.push(g);
	}
	xCords=0;
	yCords+=15;
}
tiles.forEach(t=>{
    t.draw();
})
tiles[0].drawPath();
// makes it so right click works 
canvas.addEventListener('contextmenu', e => {
	e.preventDefault();
  });

  // the main mouse thing
canvas.onmousedown = function(e){
	let tile = getTile(e.clientX-10,e.clientY-10); // gets the tile the mouse is on
	switch(e.buttons){
		// left click
		case 1:
			if(selected=="C"){ // if on cursor, check if anyone was clicked on
				peeps.forEach(p=>{ p.clicked(e.clientX-10,e.clientY-10)});
				drags.forEach(d=>{ d.clicked(e.clientX-10,e.clientY-10)});
			}
			else if(selected=="F"){ // if fences, build fence
				let quart= getQuart(tile,e.clientX-10,e.clientY-10);
				tile.makeFence(quart);
			}
			else if(selected=="H"){
				tile.getFenceBoxes();
				tile.builtOn=4;
			}
			else if(selected.charAt(0)=="B"){
				tile.buildBuilding();
			}
			else if(selected=="P") // if path, build path
				tile.drawPath();
			else if(selected=="T") // if bulldoze (Trash) delete tile
				tile.deleteTile();
			break;

		// right click
		case 2:
			if(selected=="P" || selected=="F"); // general purpose delete for right click
				tile.deleteTile();
			break;

		// middle click
		case 4:
			break;

		default:
			break;
	}
}

canvas.onmousemove = function(e) {
	let tile = getTile(e.clientX-10,e.clientY-10); 
	if(selected=="P" && tile !=0){
		tile.displayTempPath();
		if(e.buttons==1)
			tile.drawPath();
	}
	else if(selected=="F"){
		let quart= getQuart(tile,e.clientX-10,e.clientY-10);
		tile.displayTempFence( quart);
	}
}

// gets a random number 
function random(min,max){
	let num = Math.floor(Math.random()*(max-min)) + min;
	return num;
}

// update screen every half second
setInterval(updateScreen,500);

// function to update screen
function updateScreen(){
	//draw the tiles,with paths and fences
	tiles.forEach(t=>{
		if(t.builtOn==0 )//|| (t.builtOn==3 && selected!="P"))
			t.draw();
		if(t.builtOn==2)
			t.draw("lime");
		if(t.builtOn==1)
			t.drawPath();
		if(t.fence!=0)
			t.drawFence();
		if(t.builtOn==4)
			t.drawHome();
		if(t.builtOn>=50)
			t.drawBuildings();
	});
	// draw the peeps / dragons
	peeps.forEach(p=> {p.draw();});
	drags.forEach(d=> {d.move();});

	if(random(0,60)==4)
		peepSpawn();
}