import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title: title
    }
  }

  render() {
    const { navigation } = this.props;
    const { title } = this.props.deck;
    return (
      <View style={styles.container}>
        <Text style = {styles.title}> {title} </Text>
        <Text style = {styles.cardsNum}> {this.props.deck.questions.length} cards </Text>
        <View style={styles.deckBtn}>
          <TouchableOpacity 
            style={styles.addCardBtn}
            onPress={() => navigation.navigate('AddQuestion',{ title: title })} 
          >
            <Text style={styles.btnText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => navigation.navigate('Quiz',{ title: title })} 
          >
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
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
  return { deck: getDeck(store, title)[0]  }
}

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cardsNum:{
    color: 'grey',
    fontSize: 30,
  },
  btnText:{
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 60,
    textAlign: 'center'
  },
  deckBtn:{
    justifyContent: 'center',
  },
  addCardBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    margin:10,
    height: 45,
    width: 250,
    borderRadius: 5,
    borderWidth: 1,
    // alignItems: 'center',
  },
  startBtn: {
    margin:10,
    width: 250,
    backgroundColor: '#2776f4',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  }
});
