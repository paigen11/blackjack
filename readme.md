#What is it?
-------
BlackJack game setup with Bootstrap and utilizing jQuery/Javascript, HTML and CSS. The Javascript has three primary buttons: deal, hit and stand, and the player can bet money before each round using the betting buttons at the bottom of the screen. 

##Languages used:
-------
*HTML
*CSS
*Native JavaScript
*jQuery

##Link to Github documents
-------
[Github](https://github.com/paigen11/blackjack.git)

##Authors
-------
Paige Niedringhaus

##Screenshots
--------
![alt text](https://github.com/paigen11/blackjack/blob/master/screenshots/blackjack-shot1.png "blackjack-shot1.png")

![alt text](https://github.com/paigen11/blackjack/blob/master/screenshots/blackjack-shot2.png "blackjack-shot2.png")

![alt text](https://github.com/paigen11/blackjack/blob/master/screenshots/blackjack-shot3.png "blackjack-shot3.png")

##Further Game Info
--------
The deal, hit and stand buttons are disabled until the player places a bet using some of the money in the bank. Once the bet's been placed the buttons to increase or decrease the bet are disabled until a new hand is dealt.

The dealer and player both have hands of cards which are dealt out randomly using a Math.random function when "deal" is clicked. Card totals, bets and wins are kept updated on the screen using JavaScript and jQuery. Once the initial cards are dealt (with a timeout function to fade them in), the player can choose to "hit" or "stand."

If either the player or dealer gets or goes over 21, the message system is updated accordingly in the middle of the table, telling them so. If the player wins, the winning bet is added to the bank and the "wins" count is updated accordingly. At this point, the deal, stand and hit buttons are all disabled and the player must click the "New Game" button to start the next hand.

##Code Examples
--------
JavaScript for randomly shuffling deck
```
function shuffleDeck(){
	for(var i = 1; i<1000; i++){
		card1 = Math.floor(Math.random() * theDeck.length);
		card2 = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1];
		theDeck[card1] = theDeck[card2];
		theDeck[card2] = temp;
	}
}
```

jQuery for "stand" button
```
	$('.stand-button').click(function(){
		// player clicked on stand. What happens to the player? Nothing.
			var slotForNewCard = "";
			var dealerTotal = calculateTotal(dealersHand, 'dealer');
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
			// Dealer has at least 17. Check to see who won
		}
		checkWin();		
	});

	$('.reset-button').click(function(){
		reset();
	});

	if($('.bank-balance').text <= 0){
		$('.message').html("You should probably quit while you're ahead. The house always wins in the end.")
	}
```

