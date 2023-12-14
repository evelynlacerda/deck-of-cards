const cards = document.querySelectorAll('.card')
const catchCardsBtn = document.querySelector('#catching')
const shuffleCardsBtn = document.querySelector('#shuffling')
const newDeckOfCardsBtn = document.querySelector('#new-deck')

//Função assíncrona para fazer o fetch com a API de cards. É necessário que o fetch retorne um json, por isso a utilização do 'return await response.json()'
async function createShuffleDeck() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    const response = await fetch(url)
    return await response.json()
}

//Essa função é a que pega os ids de cada card, e retorna para um código json. O count é a quantidade de cartas que queremos pegar, e o deck_id é o id do deck que queremos pegar as cartas.
async function catchSomeDecks(deck_id) {
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=6`
    const response = await fetch(url)
    return await response.json()
}

//Aqui, distribuímos as cartas para cada card, de acordo com o index de cada um. O index é o número de cada card, que vai de 0 a 5.
async function catchingDecks() {
    const deckOfCards = await createShuffleDeck()
    const deck = await catchSomeDecks(deckOfCards.deck_id)
    cards.forEach((card, index) => {
        if (deck.cards[index]) card.src = deck.cards[index].images.png
    })
}

//Para criar um novo baralho de cartas, reiniciando a contagem, a função 'createNewDeck' retorna um novo id do json, e o 'newDeck' recebe esse id, e o utiliza para fazer o fetch das cartas.
async function createNewDeck() {
    const url = "https://deckofcardsapi.com/api/deck/new/"
    const responde = await fetch(url)
    return await responde.json()
}

async function shuffleRemainingDecks(deck_id) {
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/?remaining=true`
    const response = await fetch(url)
    return await response.json()
}

shuffleCardsBtn.addEventListener('click', async () => {
    const deckOfCards = await createShuffleDeck()
    await shuffleRemainingDecks(deckOfCards.deck_id)
})

//Nesse evento de click, o async e await foi adicionado para que o 'display: block' seja adicionado apenas quando o catchingDecks terminar de executar. Caso a API esteja sobrecarregada, o display será modificado somente depois.
catchCardsBtn.addEventListener('click', async () => {
    await catchingDecks()
    cards.forEach(card => card.src !== '' ? card.style.display = 'block' : null)
})

newDeckOfCardsBtn.addEventListener('click', async () => {
    const newDeck = await createNewDeck()
    await shuffleRemainingDecks(newDeck.deck_id)
    cards.forEach(card => card.style.display = 'none')
})