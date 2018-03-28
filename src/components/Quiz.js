import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import Questions from './Questions';
import { connect } from 'react-redux';
  
class Quiz extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Questions
          data={this.props.questions}
          deckTitle= {this.props.deckTitle}
          navigation = {this.props.navigation}
        />
      </View>
    );
  }
}

const getDeck = (store, title) => {
  const deckLook = store.decks.filter((deck) => deck.title === title )
  return deckLook
}

function mapStateToProps(store, { navigation }){
  const { title } = navigation.state.params
  return { questions: getDeck(store, title)[0].questions, deckTitle: title }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default connect(mapStateToProps)(Quiz);