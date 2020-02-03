import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
SafeAreaView,
StyleSheet,
View,
Text,
StatusBar,
Image,
TouchableOpacity
} from 'react-native';

import {
Colors,
} from 'react-native/Libraries/NewAppScreen';

const options = {
title: 'Select Avatar',
customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
storageOptions: {
    skipBackup: true,
    path: 'images',
},
};
export default class Picture extends Component {
constructor(props) {
    super(props)
    this.state = {
    filepath: {
        data: '',
        uri: ''
    },
    fileData: '',
    fileUri: ''
    }
}

chooseImage = () => {
    let options = {
    title: 'Select Image',
    customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    };
    ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
    } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri
        });
    }
    });
}

launchCamera = () => {
    let options = {
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    };
    ImagePicker.launchCamera(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
    } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri
        });
    }
    });

}

launchImageLibrary = () => {
    let options = {
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
    } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri
        });
    }
    });

}

renderFileData() {
    if (this.state.fileData) {
    return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
    />
    } else {
    return <Image source={require('../assets/dummy.png')}
        style={styles.images}
    />
    }
}

renderFileUri() {
    if (this.state.fileUri) {
    return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
    />
    } else {
    return <Image
        source={require('../assets/galeryImages.jpg')}
        style={styles.images}
    />
    }
}

render() {
    return (
    <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.ImageSections}>
                <View>
                    {this.renderFileData()}
                </View>
                <View>
                    {this.renderFileUri()}
                </View>
            </View>
            <View style={styles.btnParentSection}>
                <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                    <Text style={styles.btnText}>Choose File</Text>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    </Fragment>
    );
}
};

const styles = StyleSheet.create({
scrollView: {
    backgroundColor: Colors.lighter,
},

body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
},
ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2
},
images: {
    width: 30,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
},
btnParentSection: {
    alignItems: 'center',
    marginTop: 5
},
btnSection: {
    width: 225,
    height: 40,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
},
btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
}
});