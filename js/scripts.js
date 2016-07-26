// 1. When the user clicks deal, deal.
var theDeck = [];
var totalPlayer = 0;
var totalDealer = 0;

$(document).ready(function(){

	$('.deal-button').click(function(){
		createDeck();  // run a function that creates an array of 1h to 13c
		shuffleDeck(); // shuffle the deck
		console.log(theDeck);
		placeCard('player', 'one', theDeck[0]);
		placeCard('player', 'two', theDeck[2]);
		placeCard('dealer', 'one', theDeck[1]);
		placeCard('dealer', 'two', theDeck[3]);
	});

	
	$('.hit-button').click(function(){
		placeCard('player', 'three', theDeck[4]);
	});
	
	$('.stand-button').click(function(){

	});

});

function placeCard(who, where, cardToPlace){
	var classSelector = '.'+who+'-cards .card-'+where;
	$(classSelector).html(cardToPlace);
	if(who == 'player'){
		totalPlayer += parseInt(cardToPlace);
		$('.player-total-number').text(totalPlayer);
	}else if(who == 'dealer'){
		totalDealer += parseInt(cardToPlace);
		$('.dealer-total-number').text(totalDealer);
	}
}


function createDeck(){
	// Fill the deck with 
	// - 52 cards. 
	// - 4 suits
	// 	- h, s, d, c
	var suits = ['h', 's', 'd', 'c'];
	for(var s=0; s<suits.length; s++){
		for(var c=1; c<=13; c++){
			theDeck.push(c+suits[s]);
		}
	}
}

function shuffleDeck(){
	for(var i = 1; i<1000; i++){
		card1 = Math.floor(Math.random() * theDeck.length);
		card2 = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1];
		theDeck[card1] = theDeck[card2];
		theDeck[card2] = temp;
	}
}
