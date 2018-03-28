import { ADD_QUESTION, ADD_DECK } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case ADD_DECK :
      return [
        action.payload,
        ...state,
      ]
      
    case ADD_QUESTION : {
      return  state.map( deck => 
        deck.title === action.deckTitle ? { ...deck, questions:[ ...deck.questions, action.question] } : deck
      )
    }
    default :
      return state
  }
}

export default entries