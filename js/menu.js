// grab the ul and img's 
const fullMenu = document.querySelector("#mainMenu");
const subMenu = document.getElementById("buildMenu");
const allBtns = document.querySelectorAll("img");
const fenceImg = document.getElementById("m3");
let btnS;
let selected = "C"; // default on C

// if ul clicked, if it was an image then update whats selected
fullMenu.onclick = function(event){
	 btnS = event.target;
	if(btnS.src != null){
		updateMenu(btnS);
	}
}
subMenu.onclick = function(e){
	let btn = e.target;
	if(btn.src!=null)
		updateSubMenu(btn);
}
function updateSubMenu(button){
	allBtns.forEach(b=> {
		b.style.border="1px solid wheat"
	});
	button.style.border="1px solid red";
	selected=`B${button.id.charAt(2)}`;
}

// if when a key is pressed, go check what menu item that is
document.addEventListener('keydown', logKey);
let keys = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0'];
let buildMenuRotateNum=1;
function logKey(e) {
    keys.forEach(key => {
        if(e.code == key){
			if(e.code == 'Digit5' && selected.charAt(0)=="B"){
				console.log("ok");
				if(buildMenuRotateNum==4)
					buildMenuRotateNum=1;
				allBtns.forEach(b=>{
					if(b.id==`bm${buildMenuRotateNum}`){
						updateSubMenu(b)
					}
				});
				buildMenuRotateNum++;
			}
			else
            	updateSelected(keys.indexOf(key)+1);
        }
    });
}

// looks at the number selected, if it is valid go to next step (this could be 1 function with logKey)
function updateSelected(id) {
	allBtns.forEach(btn=>{
		if(btn.id.charAt(1) == id){
			updateMenu(btn);
		}
	});
}

// big old thing that sets selected to red, and makes variable selected equal the letter that matches the choice 
function updateMenu(button) {
	allBtns.forEach(btn => {
		btn.style.border = "1px solid wheat";
	})
	if(button.style.border != "1px solid red")
		button.style.border = "1px solid red";

	switch (button.alt) {
		case 'Pathes':
			selected="P";
			break;
		case 'Fences':
			selected="F";
			break;
		case 'Trash':
			selected="T";
			break;
		case 'Cursor':
			selected="C";
			break;
		case 'Home':
			selected="H";
			break;
		case 'Build':
			selected="B";
			buildMenu();
			break;
		default:
			selected="C";
	}
	if(selected!="B")
		hideBuildMenu();
}

const buildingMenu = document.getElementById("buildMenu");
function buildMenu() {
	buildingMenu.style.visibility = "visible";
}
function hideBuildMenu() {
	buildingMenu.style.visibility = "hidden";
}