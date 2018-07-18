import React from 'react';
import { Image, Dimensions } from 'react-native';


const BackgroundImage = () => {
    const { containerStyle } = styles;
    return (
        <Image source={require('../images/backgroundImgMain.jpg')} style={containerStyle} />
    );
};
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = {
    containerStyle: {
        width: WIDTH,
        height: HEIGHT,
        position: 'absolute',
        resizeMode: 'cover',
    },
};

export default BackgroundImage;