const SUITS = {
  'CLUB':'♣',
  'SPADE':'♠',
  'HEART': '♥',
  'DIAMOND':'♦' 
};

const VALUES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];


class Card{
  constructor(value, suit){
    this.value = value;
    this.suit = suit;
    this.isAvailable = true;
  }
  
}

class BlackJack extends Card{
  constructor(value,suit){
    super(value,suit);
  }
  
  
  isAce(){
    return this.value == 1;
  }
  
  isFaceCard(){
    return this.value > 10 && this.value<=13;
  }
  //getter
  getValue(){
    if(this.isAce()) return 1; 
    if(this.isFaceCard()) return 10;
    
    return this.value;
  }
  //setter 
  setValue(value) {
    if(value>=1 && value<=13){
      this.value = value;
    }else{
      throw `Value Error ${value}, should be between 1 and 13.` 
    }
  }
}

class Deck{
  constructor(){
    this.cards = this.createCards();
    this.deal_Index = 0;
  }
  
  createCards(){
    let keys = Object.keys(SUITS);
    return keys.flatMap((suit)=>{
      return VALUES.map((value)=>{
        return new Card(value,SUITS[suit]);
      })
    });
  }
  
  shuffle(){
    var len = this.cards.length;
    var d = len;
    var array = [];
    var k, i;
    for (i = 0; i < d; i++) {
        k = Math.floor(Math.random() * len);
        array.push(this.cards[k]);
        this.cards.splice(k, 1);
        len = this.cards.length;
    }
    for (i = 0; i < d; i++) {
        this.cards[i] = array[i];
    }
  }
  
  remainingCards(){
    this.cards.length - this.deal_Index;
  }
  
  dealCard(){
    try{
      let card = this.cards[this.deal_Index];
      card.isAvailable = False;
      this.deal_Index += 1; 
    }catch(e){
      throw `Index Out of bound Error.`
    }
  }
}

let deck = new Deck();
deck.shuffle();
let blackJeck = new BlackJack(deck.cards[0].value,deck.cards[0].suit);
console.log(blackJeck.getValue());

