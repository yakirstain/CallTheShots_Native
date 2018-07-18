import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    ImageBackground,
    LayoutAnimation,
    TouchableOpacity,
    Modal,
} from "react-native";
import { AppLoading } from "expo";

export default class Game3 extends Component {
    state = {
        marioKart: 0,
        luigiKart: 0,
        rush: 5,
        appReady: false,
        modalVisible: false,
        winner: ""
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            // Animate the upate
            LayoutAnimation.spring();
            flag = Math.floor(Math.random() * 2);
            speed = Math.floor(Math.random() * this.state.rush + 2);
            if (flag)
                this.setState({
                    marioKart: this.state.marioKart + speed
                });
            else
                this.setState({
                    luigiKart: this.state.luigiKart + speed
                });
            if (this.state.marioKart >= WIDTH-40) {
                clearInterval(this.interval);
                this.setState({ modalVisible: true, winner: this.props.navigation.state.params.images[1].Image })
                this.timeOut = setTimeout(() => {
                    this.props.navigation.navigate("friendsPage");
                }, 4000);


            } else if (this.state.luigiKart >= WIDTH-40) {
                clearInterval(this.interval);
                this.setState({ modalVisible: true, winner: this.props.navigation.state.params.images[0].Image })
                this.timeOut = setTimeout(() => {
                    this.props.navigation.navigate("friendsPage");

                }, 4000);

            }
        }, 60);
    }
    _onPress = () => {
        this.setState({ rush: 15 });
    };

    loadImages = () => {
        return Promise.all([
            require("../images/road.png"),
            require("../images/bros.png"),
            require("../images/mariohat.png"),
            require("../images/luigihat.png"),
            require("../images/cloud.png"),
            require("../images/mario.png"),
            require("../images/luigi.png")
        ]);
    };

    handlerError = error => console.warn(error);
    finishedLoading = () => {
        this.setState({ appReady: true });
    };

    render() {
        return (
            <View>
                {this.state.appReady === false ? (
                    <AppLoading
                        startAsync={this.loadImages}
                        onError={this.handlerError}
                        onFinish={this.finishedLoading}
                    />
                ) : (
                        <ImageBackground
                            source={require("../images/road.png")}
                            style={{ width: WIDTH, height: HEIGHT }}
                        >
                            <View>
                                <Image
                                    style={styles.mario}
                                    source={require("../images/mariohat.png")}
                                />
                                <Image
                                    style={styles.luigi}
                                    source={require("../images/luigihat.png")}
                                />
                                <Image
                                    style={styles.cloud}
                                    source={require("../images/cloud.png")}
                                />
                                <TouchableOpacity onPress={this._onPress}>
                                    <Image
                                        style={styles.lightning}
                                        source={require("../images/boost.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Image
                                source={require("../images/mario.png")}
                                style={{
                                    flex: 1,
                                    width: 50,
                                    height: 50,
                                    position: "absolute",
                                    left: this.state.marioKart,
                                    top: 520
                                }}
                            />
                            <Image
                                source={require("../images/luigi.png")}
                                style={{
                                    flex: 1,
                                    width: 50,
                                    height: 50,
                                    position: "absolute",
                                    left: this.state.luigiKart,
                                    top: 570
                                }}
                            />
                            <Image
                                style={styles.imageStyle}
                                source={{
                                    uri: this.props.navigation.state.params.images[0].Image
                                }}
                            />
                            <Image
                                style={styles.imageStyle2}
                                source={{
                                    uri: this.props.navigation.state.params.images[1].Image
                                }}
                            />
                        </ImageBackground>
                    )}

                <View style={{ marginTop: 50 }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => null}
                    >
                        <View
                            style={{
                                width: "85%",
                                height: "37%",
                                alignSelf: "center",
                                backgroundColor: "rgb(140, 220, 248)",
                                top:10
                            }}
                        >
                            <Text style={{ fontSize: 25, color: "white", textAlign: 'center' }}>
                                You Lost!
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
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTHMIDDLE = Dimensions.get("window").width / 2;
const HEIGHTMIDDLE = Dimensions.get("window").height / 2;
const styles = {
    lightning: {
        marginTop: 420,
        marginLeft: WIDTHMIDDLE-30,
        height: 50,
        width: 50
    },
    winner: {
        width: 170,
        height: 170,
        position: "absolute",
        left: 70,
        top: 72
    },
    mario: {
        flex: 1,
        width: 60,
        height: 60,
        resizeMode: "contain",
        position: "absolute",
        right: 45,
        top: 52
    },
    imageStyle: {
        width: 80,
        height: 80,
        position: "absolute",
        top: 100,
        right: 38,
        borderRadius: 70
    },
    imageStyle2: {
        width: 80,
        height: 80,
        position: "absolute",
        top: 100,
        left: 38,
        borderRadius: 70
    },
    luigi: {
        flex: 1,
        width: 60,
        height: 60,
        resizeMode: "contain",
        position: "absolute",
        left: 45,
        top: 50,
    },
    sky: {
        backgroundColor: "lightblue",
        height: 300,
        position: "relative"
    },
    cloud: {
        position: "absolute",
        top: 50,
        transform: [
            {
                translateY: 1
            },
            {
                translateX: 1
            },
            {
                scale: 0.2
            }
        ]
    }
};