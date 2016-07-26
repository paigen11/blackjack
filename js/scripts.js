// Set messages after game over. - DONE
// The table/game looks like Rob made it. Change this
// What about those 11, 12, 13s?
// What about aces?
// The player can hit forever? - DONE
// There is no win counter / bet system
// There is no 'deck' to draw from. - DONE
// The cards aren't red or black like they should / could be - DONE
// The cards are lame. Find images. - DONE
// There is no delay on showing the cards ... it's instant
// You can see the dealer's second card on deal. That's unfair to the house.
// make a win counter for dealer / player
// better message styling

// 1. When the user clicks deal, deal.
var theDeck = [];
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;

$(document).ready(function(){

	$('.deal-button').click(function(){
		createDeck();  // run a function that creates an array of 1h to 13c
		shuffleDeck(); // shuffle the deck

		// remove message
		document.getElementById('message').innerHTML = "";

		// Push onto the playersHand array the new card. Then, place it in the DOM.
		playersHand.push(theDeck[0]);
		placeCard('player', 'one', theDeck[0]);
		
		playersHand.push(theDeck[2]);
		placeCard('player', 'two', theDeck[2]);
		
		dealersHand.push(theDeck[1]);
		placeCard('dealer', 'one', theDeck[1]);
		
		dealersHand.push(theDeck[3]);
		placeCard('dealer', 'two', theDeck[3]);

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
	});

	
	$('.hit-button').click(function(){
		
		var slotForNewCard = "";
		if(playersHand.length == 2){
			slotForNewCard = "three";}
			else if(playersHand.length == 3){
				slotForNewCard = "four";
			}else if(playersHand.length == 4){
				slotForNewCard = "five";
			}else if(playersHand.length == 5){
				slotForNewCard = "six";
			}
			placeCard('player', slotForNewCard, theDeck[topOfTheDeck]);
			playersHand.push(theDeck[topOfTheDeck]);
			var playersTotal = calculateTotal(playersHand, 'player');
			topOfTheDeck++;
			
			if((playersTotal > 21) || (playersTotal === 21)){
				checkWin();
			}
		}
	);
	
	$('.stand-button').click(function(){
		// player clicked on stand. What happens to the player? Nothing.
			var slotForNewCard = "";
			var dealerTotal = calculateTotal(dealersHand, 'dealer');
			console.log(dealerTotal);
			while(dealerTotal < 17){
				 // dealer has less than 17, hit away!
				 if(dealersHand.length == 2){
				 	slotForNewCard = "three";
				 }else if(dealersHand.length == 3){
				 	slotForNewCard = "four";
				 }else if(dealersHand.length == 4){
				 	slotForNewCard = "five";
				 }else if(dealersHand.length == 5){
				 	slotForNewCard = "six";
				 }
				 placeCard('dealer', slotForNewCard, theDeck[topOfTheDeck]);
				 dealersHand.push(theDeck[topOfTheDeck]);
				 dealerTotal = calculateTotal(dealersHand, 'dealer');
				 topOfTheDeck++;
			}
			// Dealer has at least 17. Check to see who won
			checkWin();
	});

	$('.reset-button').click(function(){
		reset();
	});

});

function checkWin(){
	// Get player total
	var playersTotal = calculateTotal(playersHand, 'player');
	// Get dealer total
	var dealersTotal = calculateTotal(dealersHand, 'dealer');

	if(playersTotal === 21){
		document.getElementById('message').innerHTML = "Blackjack! You win this round!";
		// player wins
	}else if(dealersTotal === 21){
		document.getElementById('message').innerHTML = "Aw man, the house got blackjack. Time for a new hand.";
		// dealer wins
	}else if(playersTotal > 21){
		document.getElementById('message').innerHTML = "Oh, good try, but you went over 21. House wins.";
		// player has busted
		// set a message somewhere that says this
	}else if(dealersTotal > 21){
		document.getElementById('message').innerHTML = "The dealer went over 21, you win!";
		// dealer has busted
		// set a message somewhere that says this
	}else{
		// neither player has more than 21
		if(playersTotal > dealersTotal){
			document.getElementById('message').innerHTML = "Neither of you have blackjack, but you're closer. That's a win!";
			// player won. say this somewhere
		}else if(dealersTotal > playersTotal){
			document.getElementById('message').innerHTML = "Neither of you have blackjack, but the dealer's closer. The house wins.";
		 	// dealer won. say this somewhere
		}else{
			document.getElementById('message').innerHTML = "Looks like nobody won and you tied. Time for a new hand."
			// push. tie. say this somewhere
		}
	}
	// disable buttons
	disableAllBtns();
}

function disableAllBtns(){
	var buttons = document.getElementsByClassName("button");
	for(i=0; i < buttons.length; i++){
		buttons[i].classList.remove('active');
		buttons[i].classList.add('hidden');
	}
}

function placeCard(who, where, cardToPlace){
	var classSelector = '.'+who+'-cards .card-'+where;
	
	// Write logic to fix the 11, 12, 13 issue
	var cardImages = '<img src="images/'+cardToPlace+'.png">';
	$(classSelector).html(cardImages);
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
			 console.log(theDeck);
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

function calculateTotal(hand, whosTurn){
	// console.log(hand);
	// console.log(whosTurn);
	var total = 0;
	var cardValue = 0;
	for(var i = 0; i < hand.length; i++){
		cardValue = Number(hand[i].slice(0,-1))
		if(cardValue > 10){
			cardValue = 10;
		}
		total += cardValue;
	}

	// Update the HTML with the new total
	var elementToUpdate = '.'+whosTurn+'-total-number';
	$(elementToUpdate).text(total);

	return total;
}

function reset(){
	//empty the deck
	//reset the place in the deck
	//reset the player's total cards
	//reset the dealer's total cards
	//reset the player's hand array
	//reset the dealer's hand array
	//reset the message
	//reset all the cards (divs and empty class)
	theDeck = [];
	
	shuffleDeck();
	
	playersHand = [];
	var playersTotal = calculateTotal(playersHand, 'player');
	
	dealersHand = [];
	var dealersTotal = calculateTotal(dealersHand, 'dealer');

	document.getElementById('message').innerHTML = "Are you feeling lucky, punk?";

	var cards = document.getElementsByClassName('card');
	for(var i=0; i < cards.length; i++){
		cards[i].classList.add('empty');
		cards[i].innerHTML = " ";
	}

	// reset player and dealer totals
	document.getElementsByClassName('dealer-total-number').text = 0;
	document.getElementsByClassName('player-total-number').text = 0;

	// reset buttons
	var buttons = document.getElementsByClassName("button");
	for(var i = 0; i < buttons.length; i++){
		buttons[i].classList.remove('hidden');
		buttons[i].classList.add('active');	
	}
}