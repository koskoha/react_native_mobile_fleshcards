import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { Card, Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Questions extends Component {
  constructor(props) {
    super(props);
    
    this.handlePress = this.handlePress.bind(this);
    this.handleNavigationToQuiz = this.handleNavigationToQuiz.bind(this);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0, correct: 0, incorrect: 0, showQuestion: true };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right'  
      ? this.setState( state => {correct: state.correct += 1}) 
      : this.setState( state => {incorrect: state.incorrect += 1})
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderNoMoreCards(correct, incorrect) {
    console.log(this.props);
    return (
      <Card title="Your score!">
        <Text style={{ marginBottom: 10 }}>
          correct: {this.state.correct}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          incorrect: {this.state.incorrect}
        </Text>
        <Button
          backgroundColor="#03A9F4"
          title="Start Over?"
          onPress = {() => this.props.navigation.navigate('Quiz', { title: this.props.deckTitle })}
        />
      </Card>
    );
  }

  handleNavigationToQuiz(){
    this.props.navigation.navigate('Quiz', { title: this.props.deckTitle })
  }

  renderCard(item) {
    return (
      <Card
        key={item.id}
        title={this.state.showQuestion ? item.question : item.answer}
        titleStyle= {styles.question}
      > 
        <View style= {styles.swipeContainer}>
          <Text style={styles.swipeLeft}>
            Swipe LEFT for incorrect 
          </Text>
          <Text style={styles.swipeRight}>
            Swipe RIGHT for correct
          </Text>
        </View>
        <Button
          onPress = {this.handlePress}
          backgroundColor="#03A9F4"
          title={this.state.showQuestion ? 'Answer' : 'Question'}
        />
      </Card>
    );
  }

  handlePress(){
    this.setState( prevState => ({showQuestion: !prevState.showQuestion}))
    console.log(this.state.showQuestion);
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.renderNoMoreCards(this.state.correct, this.state.incorrect);
    }

    return this.props.data.map((item, i) => {
      if (i < this.state.index) { return null; }

      if (i === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...this.state.panResponder.panHandlers}
          >
            {this.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item.id}
          style={[styles.cardStyle, { top: 10 * (i - this.state.index), zIndex: 5 }]}
        >
          {this.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  question:{
    fontSize: 40,
    textAlign: 'center'
  },
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  },
  swipeLeft:{
    justifyContent: 'flex-start', 
    marginBottom: 10,
    color: 'blue'
  },
  swipeRight: {
    justifyContent: 'flex-end', 
    marginBottom: 10,
    color: 'blue'
  },
  swipeContainer:{
    flex:1, 
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },
};

export default Questions;