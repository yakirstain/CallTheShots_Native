import React, { Component } from "react";
import { View, Modal, Image, Dimensions, Text } from "react-native";

const tickCount = Math.floor(Math.random() * 5) + 2;
const timevar = 0;

export default class Game2 extends Component {
    state = {
        arrowPos: 0,
        arrowSpeed: 40,
        BGC: "rgba(240, 240, 241,0.2)",
        modalVisible: false,
        winner: ""
    };
    componentWillMount() {
        timevar = 0;
        tickCount = Math.floor(Math.random() * 5) + 2;
    }
    componentDidMount() {
        let timez = Math.floor(Math.random() * 2000 + 2000);
        this.inty(10, 5, timez);
        this.inty(2, 2, timez - 1000);
        this.lastic();
        this.spinspeed();

    }
    inty = (spd, tick, TO) => {
        timevar += TO + (this.state.arrowSpeed / tick) * 0.8; // interval times algoritam
        this.interval = setInterval(() => {
            //arrow spin speed
            this.timeOut = setTimeout(() => {
                if (this.state.arrowSpeed >= spd)
                    this.setState({ arrowSpeed: this.state.arrowSpeed - tick });
                else if (this.state.arrowSpeed <= spd) {
                    clearInterval(this.interval);

                }
            }, TO);
        }, 800)

    };

    lastic = () => {
        this.timeOut = setTimeout(() => {
            this.interval2 = setInterval(() => {
                this.setState({ arrowPos: this.state.arrowPos + 10 });
                tickCount--;
                if (tickCount <= 0) {
                    clearInterval(this.interval2);
                    this.winz();
                }
            }, 1000);
        }, timevar + 3);

    };

    spinspeed = () => {
        //arrow spinning
        this.interval = setInterval(() => {
            this.setState({ arrowPos: this.state.arrowPos + this.state.arrowSpeed });
        }, 50);

    };

    winz = () => {
        let winnerPlayer = 0
        let won = ((this.state.arrowPos % 360) + 28)
        if (won >= 360)
            won -= 360;
        if (won < 120) {
            this.setState({ BGC: "rgba(113, 171, 69, 0.3)" })
            winnerPlayer = 1;
        }
        else if (won > 120 && won < 240) {
            this.setState({ BGC: "rgba(91, 153, 212, 0.3)" })
            winnerPlayer = 3;
        }
        else if (won == 120 || won == 240 || won == 360) {
            console.warn("Top kek")
            winnerPlayer = Math.floor(Math.random()*2)+1;
        }
        else {
            this.setState({ BGC: "rgba(255, 190, 0, 0.3)" })
            winnerPlayer = 2;
        }
        this.timeOut2 = setTimeout(() => {
            this.setState({ modalVisible: true, winner: this.props.navigation.state.params.images[winnerPlayer - 1].Image })
        }, 1000);
        this.timeOut = setTimeout(() => {
            this.setState({ arrowPos: 0 });
            timevar = 0;
            tickCount = Math.floor(Math.random() * 5) + 2;
            this.props.navigation.navigate("friendsPage");
        }, 4000);

    }
    render() {
        return (
            <View style={{ width: WIDTH, height: HEIGHT, backgroundColor: this.state.BGC }}>
                <Image
                    source={require("../images/spinItBackground.png")}
                    style={{
                        width: WIDTH,
                        height: HEIGHT,
                        position: 'absolute',
                        resizeMode: 'cover',
                        opacity: 0.15
                    }}
                />
                <Image style={styles.wheel} source={require("../images/spinItWheel.png")} />
                <Image
                    style={{
                        position: "absolute",
                        top: 345,
                        left: 155,
                        width: 65,
                        height: 120,
                        transform: [{ rotate: this.state.arrowPos + "deg" }]
                    }}
                    source={require("../images/arrow.png")}
                />
                <View style={styles.view1}>
                    <Image
                        style={styles.imageStyle}
                        source={{
                            uri: this.props.navigation.state.params.images[0].Image
                        }}
                    />
                </View>
                <View style={styles.view2}>
                    <Image
                        style={styles.imageStyle2}
                        source={{
                            uri: this.props.navigation.state.params.images[1].Image
                        }}
                    />
                </View>
                <View style={styles.view3}>
                    <Image
                        style={styles.imageStyle3}
                        source={{
                            uri: this.props.navigation.state.params.images[2].Image
                        }}
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => null}
                >
                    <View
                        style={{
                            top: 270,
                            left: 2,
                            width: "100%",
                            height: "100%",
                            alignSelf: "center",
                        }}
                    >
                        <Text style={{ fontSize: 25, color: "white", textAlign: 'center', }}>
                            You're Out!
                        </Text>
                        <Image
                            style={styles.winner}
                            source={{ uri: this.state.winner }}
                        />
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
    wheel: {
        position: "absolute",
        top: 250,
        left: 25,
        height: 303.75,
        width: 324.75
    },
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 70
    },
    imageStyle2: {
        width: 80,
        height: 80,
        borderRadius: 70
    },
    imageStyle3: {
        width: 80,
        height: 80,
        borderRadius: 70
    },
    view1: {
        position: "absolute",
        top: 97,
        left: WIDTHMIDDLE + 60,
        borderRadius: 75,
        width: 85,
        height: 85,
        backgroundColor: 'rgb(113,171,69)'
    },
    view2: {
        position: "absolute",
        top: 97,
        left: WIDTHMIDDLE - 150,
        borderRadius: 75,
        width: 85,
        height: 85,
        backgroundColor: 'rgb(255,190,0)'
    },
    view3: {
        position: "absolute",
        top: 97,
        left: WIDTHMIDDLE - 45,
        borderRadius: 75,
        width: 85,
        height: 85,
        backgroundColor: 'rgb(91,153,212)'
    },
    winner: {
        width: 160,
        height: 160,
        marginLeft: 105,
        marginTop: -5,
        borderRadius: 100,
    },
};