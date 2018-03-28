import { TabNavigator, StackNavigator } from 'react-navigation';
import {Platform} from 'react-native'

import NewDeck from '../components/NewDeck';
import DeckList from '../components/DeckList';
import Deck from '../components/Deck';
import NewQuestion from '../components/NewQuestion';
import Quiz from '../components/Quiz'

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#7aadff' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : '#7aadff',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export default StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#7aadff',
      },
      headerTintColor: '#fff',
    }
  },
  AddQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: 'Add Card',
      headerStyle: {
        backgroundColor: '#7aadff',
      },
      headerTintColor: '#fff',
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerStyle: {
        backgroundColor: '#7aadff',
      },
      headerTintColor: '#fff',
    }
  },
})

