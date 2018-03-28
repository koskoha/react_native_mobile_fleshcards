import React from 'react';
import { Provider } from 'react-redux'
import { Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'

import configureStore from './src/store/configureStore'
import Router from './src/routes/router';
import { clearLocalNotification, setLocalNotification } from './src/utils/tools'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  state = {
    store: null
  }


  async componentWillMount () {
    const store = await configureStore();
    this.setState({ store });
  }
  
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  render () {
    if (this.state.store === null) {
      return (
        <Text>
          Loading...
        </Text>
      )
    }

    return (
      <Provider store={this.state.store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={'#2776f4'} barStyle="light-content" />
          <Router />
        </View>
      </Provider>
    )
  }
}
