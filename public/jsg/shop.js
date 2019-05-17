
var shopFood = {
	preload: function(){	
	},
	create: function(){
		drawGameBody();
		drawGameUI(foodArray,"foodSheet");
		button12.mode = "buy";
	},
	update: function(){
		displaySlide(foodArray);
		tickCheck();
	}
};


//items sold by the store
foodArray = [
	new foodItem("Burger",0,10,"Fast food",8),
	new foodItem("Steak",1,20,"Cow flesh",18),
	new foodItem("Creamsicle",2,5,"I hate creamsicles",3),
	new foodItem("Fish",3,20,"85% Mercury free!",20),
	new foodItem("Egg",4,20,"Egg flesh",20),
	new foodItem("Coffee",5,20,"Bitter drink",20),
	new foodItem("Drumstick",6,20,"Bird flesh",20),
	new foodItem("Shoe",7,150,"You pay for the design",2),
	new foodItem("Chicken",8,20,"Fresh chicken",20)
];