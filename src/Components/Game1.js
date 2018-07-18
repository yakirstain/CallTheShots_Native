import React, { Component } from "react";
import { View, Animated, Modal, Text, Dimensions, Image } from "react-native";

export default class Game1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      winner: ""
    };
  }
  componentWillMount() {
    // console.warn(this.props.navigation.state.params.images[0].Image);

    //corner positioning
    this.pos1 = new Animated.ValueXY(0, 0);
    Animated.spring(this.pos1, {
      toValue: {
        x: WIDTHMIDDLE - 50.5,
        y: HEIGHT - 134
      }
    }).start();
    this.pos2 = new Animated.ValueXY(0, 0);
    Animated.spring(this.pos2, {
      toValue: {
        x: -WIDTHMIDDLE + 50,
        y: HEIGHT - 134
      }
    }).start();
    this.pos3 = new Animated.ValueXY(0, 0);
    Animated.spring(this.pos3, {
      toValue: {
        x: -WIDTHMIDDLE + 50,
        y: 10.5
      }
    }).start();
    this.pos4 = new Animated.ValueXY(0, 0);
    Animated.spring(this.pos4, {
      toValue: {
        x: WIDTHMIDDLE - 50.5,
        y: 10.5
      }
    }).start();

    this.ballMov = new Animated.ValueXY(0, 0);
    let max = 12;
    let min = 5;
    let randomNum = Math.floor(Math.random() * (max - min)) + min;
    let flag = 0;
    let winnerPlayer = 0;

    //ball going to the corner
    this.interval = setInterval(() => {
      if (flag == 0) {
        winnerPlayer = 3;
        Animated.spring(this.ballMov, {
          toValue: { x: -WIDTHMIDDLE + 100, y: HEIGHTMIDDLE - 140 }
        }).start();
        flag = Math.floor(Math.random() * 4);
      } else if (flag == 1) {
        winnerPlayer = 1;
        Animated.spring(this.ballMov, {
          toValue: { x: -WIDTHMIDDLE + 100, y: -HEIGHTMIDDLE + 100 }
        }).start();
        flag = Math.floor(Math.random() * 4);
      } else if (flag == 2) {
        winnerPlayer = 4;
        Animated.spring(this.ballMov, {
          toValue: { x: WIDTHMIDDLE - 100, y: HEIGHTMIDDLE - 140 }
        }).start();
        flag = Math.floor(Math.random() * 4);
      } else if (flag == 3) {
        winnerPlayer = 2;
        Animated.spring(this.ballMov, {
          toValue: { x: WIDTHMIDDLE - 100, y: -HEIGHTMIDDLE + 100 }
        }).start();
        flag = Math.floor(Math.random() * 4);
      } else if (flag == -1) {
        clearInterval(this.interval);
        this.setState({ modalVisible: true, winner: this.props.navigation.state.params.images[winnerPlayer - 1].Image })
        this.timeOut = setTimeout(() => {
          this.props.navigation.navigate("friendsPage");
        }, 4000);
      }
    }, 300);
    this.timerInt = setInterval(() => {
      randomNum -= 1;
      if (randomNum == 0) {
        clearInterval(this.timerInt);
        flag = -1;
      }
    }, 1000);
  }
  render() {
    return (
      <View>
        <Image
          style={styles.backgroundStyle}
          source={require("../images/backgroundImgGame1.jpg")}
        />
        <View style={styles.generalPos}>
          <Animated.View style={this.pos1.getLayout()}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.state.params.images[3].Image
              }}
            />
          </Animated.View>
          <Animated.View style={this.pos2.getLayout()}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.state.params.images[2].Image
              }}
            />
          </Animated.View>
          <Animated.View style={this.pos3.getLayout()}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.state.params.images[0].Image
              }}
            />
          </Animated.View>
          <Animated.View style={this.pos4.getLayout()}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.state.params.images[1].Image
              }}
            />
          </Animated.View>
        </View>
        <Animated.View style={this.ballMov.getLayout()}>
          <Image
            source={require("../images/beerTop.png")}
            style={styles.beerBall}
          />
        </Animated.View>
        <View style={{ marginTop: 50 }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => null}
          >
            <View
              style={{
                top: 160,
                left: 2,
                width: "70%",
                height: "70%",
                alignSelf: "center",
                

              }}
            >
              <Text style={{ fontSize: 25, color: "white", textAlign: 'center', }}>
                You're It!
              </Text>
              <Image
                style={styles.winner}
                source={{ uri: this.state.winner }}
              />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
const WIDTHMIDDLE = Dimensions.get("window").width / 2;
const HEIGHTMIDDLE = Dimensions.get("window").height / 2;
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const styles = {
  generalPos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    width: 80,
    height: 80
  },
  beerBall: {
    height: 30,
    width: 30,
    left: WIDTHMIDDLE - 15,
    top: HEIGHTMIDDLE - 15
  },
  backgroundStyle: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    resizeMode: 'cover',
  },
  winner: {
    width: 170,
    height: 170,
    resizeMode: "contain",
    position: "absolute",
    left: 40,
    top: 72
  },
};
