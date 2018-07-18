import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'native-base';

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import HomePage from './src/Components/HomePage';
import AddFriendsPage from './src/Components/AddFriendsPage';
import Game1 from './src/Components/Game1';
import MyCamera from './src/Components/Camera/MyCamera';
import Game3 from './src/Components/Game3';
import startingVideo from './src/Components/startingVideo';
import Game2 from './src/Components/Game2';


const stackNav = createStackNavigator(
  {
    friendsPage: AddFriendsPage,
    cameraPage: MyCamera,

  }
)

const SwitchNav = createSwitchNavigator(
  {
    welcomeVideo:startingVideo,
    welcomePage: HomePage,
    fourGame: Game1,
    twoGame:Game3,
    ThreeGame:Game2,
    homeGame: stackNav

  }
)




export default class App extends React.Component {

  render() {
    return (
      <View style={styles.containerStyle}>
        <SwitchNav />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  }
}
