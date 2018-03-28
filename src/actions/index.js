export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_DECK = 'ADD_DECK'

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    payload: deck
  }
}

export function addQuestion (deckTitle, question) {
  return {
    type: ADD_QUESTION,
    deckTitle,
    question,
  }
}