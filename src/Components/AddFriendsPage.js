import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions, Alert, Modal } from "react-native";


export default class AddFriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      playerCounter: 0,
      modalVisible: false,
      errMsg: ''
    };
  }
  componentDidMount() {
    this.refreshPlayerCount();
  }

  static navigationOptions = {
    header: null
  };


  goPlay = async () => {
    let res = await fetch(
      "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/getPhotoUri",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    let json = await res.json();
    let theJson = JSON.parse(json.d);
    this.setState({ photos: theJson });
    //console.warn(this.state.photos[0].Image);
    this.props.navigation.navigate("fourGame", { images: this.state.photos });
  };

  marioGame = async () => {
    let res = await fetch(
      "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/getPhotoUri",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    let json = await res.json();
    let theJson = JSON.parse(json.d);
    this.setState({ photos: theJson });
    //console.warn(this.state.photos[0].Image);
    this.props.navigation.navigate("twoGame", { images: this.state.photos });
  };

  wheelGame = async () => {
    let res = await fetch(
      "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/getPhotoUri",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    let json = await res.json();
    let theJson = JSON.parse(json.d);
    this.setState({ photos: theJson });
    //console.warn(this.state.photos[0].Image);
    this.props.navigation.navigate("ThreeGame", { images: this.state.photos });
  };

  deleteImages = async () => {
    await fetch("http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/deleteImages");
    this.refreshPlayerCount();
  }
  refreshPlayerCount = async () => {
    let res = await fetch(
      "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/getPlayers",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    let json = await res.json();
    let theJson = JSON.parse(json.d);
    this.setState({ playerCounter: theJson })
  }
  checkPlayersFours = async () => {
    await this.refreshPlayerCount();
    if (this.state.playerCounter >= 4) {
      if (this.state.playerCounter > 4) {
        this.setState({ modalVisible: true, errMsg: "There Are Extra Players\nOnly First Four Will Play" })
        this.timeOut = setTimeout(() => {
          this.setState({ modalVisible: false })
          this.goPlay();
        }, 3000);
      }
      else {
        this.goPlay();
      }

    }
    else {
      this.setState({ modalVisible: true, errMsg: "Four Players Required" })
      this.timeOut = setTimeout(() => {
        this.setState({ modalVisible: false })
      }, 2500);
    }
  }
  checkPlayersTwos = async () => {
    await this.refreshPlayerCount();
    if (this.state.playerCounter >= 2) {
      if (this.state.playerCounter > 2) {
        this.setState({ modalVisible: true, errMsg: "There Are Extra Players\nOnly First Two Will Play" })
        this.timeOut = setTimeout(() => {
          this.setState({ modalVisible: false })
          this.marioGame();
        }, 3000);
      }
      else {
        this.marioGame();
      }
    }
    else {
      this.setState({ modalVisible: true, errMsg: "Two Players Required" })
      this.timeOut = setTimeout(() => {
        this.setState({ modalVisible: false })
      }, 2500);
    }
  }
  checkPlayersThrees = async () => {
    await this.refreshPlayerCount();
    if (this.state.playerCounter >= 3) {
      if (this.state.playerCounter > 3) {
        this.setState({ modalVisible: true, errMsg: "There Are Extra Players\nOnly First Three Will Play" })
        this.timeOut = setTimeout(() => {
          this.setState({ modalVisible: false })
          this.wheelGame();
        }, 3000);
      }
      else {
        this.wheelGame();
      }
    }
    else {
      this.setState({ modalVisible: true, errMsg: "Three Players Required" })
      this.timeOut = setTimeout(() => {
        this.setState({ modalVisible: false })
      }, 2500);
    }
  }
  render() {
    return (

      <View>
        <Image source={require('../images/friendsBackground.jpg')} style={styles.backgroundStyle} />
        <TouchableOpacity
          style={{ top: HEIGHTMIDDLE+130 , left: WIDTHMIDDLE+80,width: 70, height: 70,position:'absolute' }}
          onPress={this.checkPlayersFours}
        >
          <Image
            style={{ width: 70, height: 70, opacity: 0.7, }}
            source={require("../images/bottleButton.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHTMIDDLE+130, left: WIDTHMIDDLE-40, width: 60, height: 60,position:'absolute' }}
          onPress={this.checkPlayersThrees}
        >
          <Image
            style={{ width: 70, height: 70, opacity: 0.7 }}
            source={require("../images/spinItGame.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHTMIDDLE+130, left: WIDTHMIDDLE-150, width: 70, height: 70,position:'absolute' }}
          onPress={this.checkPlayersTwos}
        >
          <Image
            style={{ width: 70, height: 70, opacity: 0.7 }}
            source={require("../images/marioButton.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHTMIDDLE+260, left: WIDTHMIDDLE-25 , width: 70, height: 70,position:'absolute' }}
          onPress={() => { this.props.navigation.navigate("cameraPage", { refreshfunction: this.refreshPlayerCount }) }}
        >
          <Image
            style={{ height: 40, width: 40, opacity: 0.6 }}
            source={require("../images/addPicture.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHTMIDDLE+260, left: WIDTHMIDDLE-95 , width: 70, height: 70,position:'absolute' }}
          onPress={this.deleteImages}
        >
          <Image
            style={{ height: 40, width: 40, opacity: 0.6 }}
            source={require("../images/deleteImagesPic.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHTMIDDLE+260, left: WIDTHMIDDLE + 45, width: 70, height: 70,position:'absolute' }}
          onPress={this.refreshPlayerCount}
        >
          <Image
            style={{ height: 40, width: 40, opacity: 0.6 }}
            source={require("../images/refreshPlayers.png")}
          />
        </TouchableOpacity>
        <View style={{ top: HEIGHTMIDDLE+220, left: WIDTHMIDDLE - 55,position:'absolute' }}>
          <Text>Player Count: {this.state.playerCounter}</Text>
        </View>
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
              width: "100%",
              height: "20%",
              alignSelf: "center",
              backgroundColor: "rgba(240, 240, 241,0.7)",
              justifyContent: 'center',
              alignItems: 'center'

            }}
          >
            <Text style={{ fontSize: 25, color: "rgb(163, 163, 194)", textAlign: 'center', }}>
              {this.state.errMsg}
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const WIDTHMIDDLE = Dimensions.get("window").width / 2;
const HEIGHTMIDDLE = Dimensions.get("window").height / 2;
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  players: {
    top: HEIGHT - 50,
    left: WIDTHMIDDLE
  },
  backgroundStyle: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    resizeMode: 'cover',
  },
};
