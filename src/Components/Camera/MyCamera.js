import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Camera, Permissions } from 'expo'

import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class MyCamera extends Component {
    constructor(props) {
        super(props)

    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })

    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            await this.setState({ photo: photo.uri }, console.log(this.state.photo));
            fetch('http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/insertNewImage', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageUri: photo.uri
                })
            }).then(() => console.log('it did something'));
            this.props.navigation.state.params.refreshfunction();
            this.props.navigation.navigate("friendsPage");
        }
    }
    render() {
        const { hasCameraPermission } = this.state

        if (hasCameraPermission === null) {
            return <View />
        }
        else if (hasCameraPermission === false) {
            return <Text> No access to camera</Text>
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1, justifyContent: 'space-between' }} type={this.state.type} ref={ref => { this.camera = ref; }} >

                        <Header rounded
                            style={{
                                position: 'absolute', backgroundColor: 'transparent',
                                left: 0, top: 0, right: 0, zIndex: 100, alignItems: 'center'
                            }}
                        >
                            <View style={{ flexDirection: 'row', flex: 4 }}>
                                <Item style={{ backgroundColor: 'transparent' }}>
                                </Item>
                            </View>

                            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
                                <Icon
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ?
                                                Camera.Constants.Type.front :
                                                Camera.Constants.Type.back
                                        })
                                    }}
                                    name="reverse-camera" style={{ color: 'white', fontWeight: 'bold' }} />
                            </View>
                        </Header>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>


                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <MaterialCommunityIcons name="circle-outline"
                                    style={{ color: 'white', fontSize: 100 }}
                                    onPress={this.snap.bind(this)}
                                >
                                </MaterialCommunityIcons>

                            </View>
                        </View>
                    </Camera>
                </View>
            )
        }
    }
}
export default MyCamera;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});