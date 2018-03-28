import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { addDeck } from '../actions/index';

class NewDeck extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state={
    title: '',
    error: ''
  }

  handleSubmit(){
    if(!this.state.title){
      this.setState(() => ({error: 'Deck Title Cannot be Empty'}) )
    }else{
      this.props.actions.addDeckTitle({title:this.state.title, questions:[]})
      this.setState({title:''})
      this.setState({error:''})
    } 
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder="Deck Title"
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <Text style= {{color:'red'}}>
          {this.state.error}
        </Text>
        <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

mapStateToProps =state => ({ decks: state });

mapDispatchToProps = dispatch => ({ 
  actions:{
    addDeckTitle: title => dispatch(addDeck(title))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input:{
    height: 40,
    width: 300,
    borderColor: 'gray', 
    borderWidth: 2,
    borderRadius: 5,
  },
  title: {
    fontSize: 60,
    textAlign: 'center'
  },
  submitBtn: {
    backgroundColor: '#2776f4',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    width: 250,
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
