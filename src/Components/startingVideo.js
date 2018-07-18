import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Video } from 'expo';


export default class startingVideo extends Component {
    constructor(props) {
        super(props)

    };
    componentDidMount(){
        this.videoTimeOut = setTimeout(() => {
            this.props.navigation.navigate("welcomePage");
        }, 1500);
    }

    render() {
        return (
            <Video
                source={require('../images/backgroundVideo.mp4')}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                style={{ width: WIDTH, height: HEIGHT }}
            />
        )
    };

}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;