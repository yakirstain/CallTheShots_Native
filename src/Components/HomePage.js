import React, { Component } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";

import BackgroundImage from "./BackgroundImage";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <BackgroundImage />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            this.props.navigation.navigate("homeGame");
          }}
        />
      </View>
    );
  }
}
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const styles = {
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonStyle: {
    width: WIDTH,
    height: HEIGHT,
    position: "absolute"
  }
};
