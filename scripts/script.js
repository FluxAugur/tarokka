document.addEventListener('DOMContentLoaded', () => {});

function drawCards() {
  let past = document.getElementById('past');
  let present = document.getElementById('present');
  let future = document.getElementById('future');
  let assistance = document.getElementById('assistance');
  let opposition = document.getElementById('opposition');
  let lowDetails = document.getElementById('lowDetails');
  let highDetails = document.getElementById('highDetails');

  try {
    past.removeChild(past.lastChild);
    present.removeChild(present.lastChild);
    future.removeChild(future.lastChild);
    assistance.removeChild(assistance.lastChild);
    opposition.removeChild(opposition.lastChild);

    while(lowDetails.lastChild) {
      lowDetails.removeChild(lowDetails.lastChild);
    }
    while(highDetails.lastChild) {
      highDetails.removeChild(highDetails.lastChild);
    }
  } catch {
    // shrug
  }

  // low picks
  createCardDiv('past', ['card-significance'], cards.position.past.significance);
  let lowPicks = [];
  lowPicks.push(drawFromDeck('low', lowPicks));
  createCardImg('past', 'low', lowPicks[0]);
  createCardDiv('past', ['card-meaning', 'hidden'], 'Represents — ' + cards.low[lowPicks[0]].meaning);

  createCardDiv('present', ['card-significance'], cards.position.present.significance);
  lowPicks.push(drawFromDeck('low', lowPicks));
  createCardImg('present', 'low', lowPicks[1]);
  createCardDiv('present', ['card-meaning', 'hidden'], 'Represents — ' + cards.low[lowPicks[1]].meaning);

  createCardDiv('future', ['card-significance'], cards.position.future.significance);
  lowPicks.push(drawFromDeck('low', lowPicks));
  createCardImg('future', 'low', lowPicks[2]);
  createCardDiv('future', ['card-meaning', 'hidden'], 'Represents — ' + cards.low[lowPicks[2]].meaning);

  // high picks
  createCardDiv('assistance', ['card-significance'], cards.position.assistance.significance);
  let highPicks = [];
  highPicks.push(drawFromDeck('high', highPicks));
  createCardImg('assistance', 'high', highPicks[0]);
  createCardDiv('assistance', ['card-meaning', 'hidden'], 'Represents — ' + cards.high[highPicks[0]].meaning);

  createCardDiv('opposition', ['card-significance'], cards.position.opposition.significance);
  highPicks.push(drawFromDeck('high', highPicks));
  createCardImg('opposition', 'high', highPicks[1]);
  createCardDiv('opposition', ['card-meaning', 'hidden'], 'Represents — ' + cards.high[highPicks[1]].meaning);
}

function createCardImg(position, deck, card) {
  let img = document.createElement('img');
  img.addEventListener('click', (event) => {
    revealCard(deck, card, event.target, position);
  });
  img.setAttribute('src', cards.back.file);
  img.classList.add('card-image');
  document.getElementById(position).appendChild(img);
}

function revealCard(deck, card, target, position) {
  if (deck === 'high') {
    target.setAttribute('src', cards.high[card].file);
  } else if (deck === 'low'){
    target.setAttribute('src', cards.low[card].file);
  }
  document.getElementById(position).lastChild.classList.remove('hidden');
}

function drawFromDeck(deck, pickedCards) {
  let card = -1;
  let okay = false;
  let numCardsInDeck = -1;
  if (deck === 'high') {
    numCardsInDeck = 14;
  } else if (deck === 'low') {
    numCardsInDeck = 40;
  }
  while (!okay) {
    okay = true;
    card = Math.floor(Math.random() * numCardsInDeck)
    for (let i = 0; i < pickedCards.length; ++i) {
      if (card == pickedCards[i]) {
        okay = false;
      }
    }
  }
  return card;
}

function createCardDiv(position, styles, text) {
  let div = document.createElement('div');
  for (let i = 0; i < styles.length; ++i) {
    div.classList.add(styles[i]);
  }
  div.appendChild(document.createTextNode(text));
  document.getElementById(position).appendChild(div);
}
