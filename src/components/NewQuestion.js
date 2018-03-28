import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { addQuestion } from '../actions/index';
import uniqueId from '../utils/tools'

class NewQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state={
    question: '',
    answer: '',
    error: '',
  }

  handleSubmit(){
    const { title } = this.props.navigation.state.params;
    if(!this.state.question || !this.state.answer){
      this.setState({error: "Please provide all necessary information!"})
    }else{
      this.props.actions.addQuestion(title, {id: uniqueId(), question:this.state.question, answer:this.state.answer});
      this.setState({question:'', answer: ''})
      this.setState({error:''})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Type Your Question"
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <TextInput
          style={styles.input}
          placeholder="Type Answer"
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
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

mapDispatchToProps = dispatch => ({ 
  actions:{
    addQuestion: (title, question) => dispatch(addQuestion(title, question))
  },
});

export default connect(undefined, mapDispatchToProps)(NewQuestion)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: '',
  },
  input: {
    margin: 10,
    height: 40, 
    width: 300, 
    borderColor: 'gray', 
    borderWidth: 2,
    borderRadius: 5
  },
  submitBtn: {
    backgroundColor: '#2776f4',
    padding: 10,
    width: 250,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
