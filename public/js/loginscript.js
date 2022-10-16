let background = document.querySelector('#background');
function generateBg(){
	background.innerHTML = '';
	let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let elWidth = (24+100);
  let elHeight = (24+100);
  let colCount = screenWidth/elWidth;
  let rowCount = screenHeight/elHeight;
	for(let y=0; y<rowCount; y++){
  	for(let x=0; x<colCount; x++){
    	let randomType = Math.floor(Math.random()*4)+1;
      let randomDelay = Math.random()*5;
      switch(randomType){
      	case 1:
        	addArrow(x, y, elWidth, elHeight, randomDelay);
          break;
        case 2:
        	addPlus(x, y, elWidth, elHeight, randomDelay);
          break;
        case 3:
        	addStar(x, y, elWidth, elHeight, randomDelay);
          break;
        case 4:
        	addMoon(x, y, elWidth, elHeight, randomDelay);
          break;
      }
    }
  }
}

window.addEventListener('resize',()=>{
	generateBg();
});
generateBg();