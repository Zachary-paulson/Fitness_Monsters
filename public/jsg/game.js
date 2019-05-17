var game = new Phaser.Game(800,800,Phaser.AUTO);
var height = 800;
var width = 800;
var buttonDispX = 50;


date = new Date();



var tickCounter = 0 ;

var time;


//---------------------------STATES---------------------------------------
var main = {
	preload: function(){	
	},
	create: function(){
		//round pixels, so that pixel sprites remain sharp
		//this fixed a problem with the button sprite sheet
		game.renderer.renderSession.roundPixels = true;
		//Allows game to run in background
		game.stage.disableVisibilityChange = true;
		
		drawGameBody();
		
		//draw pet sprite
		petSprite = game.add.sprite(this.game.world.centerX,this.game.world.centerY,"bunny");
		//change its "center point";
		petSprite.anchor.setTo(0.5);
	
	}
};

//State loads all most game assests. While this technically isnt needed as all states can preload
//the files are small enough that this preload will be very quick, and will prevent the game from
//flickering when states change.
var preload = {
	preload: function(){
		//loads an image can can be refenced as background
		this.load.image("background","assets/art/background.png");
		//loads a sprite sheet and breaks the sheet up into 10, 128 x 128 sprites.
		this.load.spritesheet("bunny","assets/art/pet/bunny.png");
		this.load.spritesheet("foodSheet","assets/art/items/foodSheet.png",128,128,9);
		//loads button sprite sheet.
		this.load.spritesheet("buttonSheet","assets/art/buttonSheet.png",64,64,15);
		//loads a bitmapFont, which requires both a png as well as an XML file.
		this.load.bitmapFont("pixel","assets/font/pixelFont.png","assets/font/pixelFont.xml");
		
	},
	create: function(){
		game.state.start("main");
	}
};

var stats = {
	preload: function(){	
	},
	create: function(){
		drawGameBody();
		pet.hunger = Math.min(Math.max(pet.hunger,0),100);
		text = game.add.bitmapText(75, game.world.centerY-200,"pixel","ERROR",32);	
	},
	update: function(){
		tickCheck();
		text.text = "Name: " + pet.name + "\nSex: " + pet.sex + "\nHunger: "+ pet.hunger + "\nMoney: $"+globalVal.money;
	}
};
var pet = {
	name : "Bun Bun",
	sex : "YES",
	hunger : 50,
	size : 60
};

globalVal ={
// Will be set to the users steps later on 
	money : 500
};


//time per tick, in minutes
var TIME_PER_TICK = 5;
var timeBegin = 0;

//This function checks if the "real world clock" has advanced enough to increment the game a tick.
//The tick will alter the properties of the pet. 
function tickCheck(){
	var timeNow = (new Date()).getTime();
	//console.log("timeNow: "+timeNow);
	if (timeBegin == 0){
		timeBegin = (new Date()).getTime();
		//console.log("timeBegin: "+timeBegin);
	}
	if ((timeNow-timeBegin)>(TIME_PER_TICK*60*1000)){
		timeBegin = (new Date()).getTime();
		//console.log("timeBegin: "+timeBegin);
		tick();
	}
		 
}

function tick(){
	tickCounter++;
	console.log("tick");
	pet.hunger = pet.hunger-3;
	pet.hunger = Math.min(Math.max(pet.hunger,0),100);
}
game.state.add("preload",preload);
game.state.add("main",main);
game.state.add("stats",stats);
game.state.add("food",food);
//game.state.add("shop",shop);
game.state.add("shopFood",shopFood);
game.state.start("preload");