import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ImagePicker } from 'react-native-image-picker';

import * as firebase from 'firebase/app';
import 'firebase/storage';

//
// Don't forget to initialize firebase!!!
//

const styles = StyleSheet.create({ 
  button: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: "#333", 
    textAlign: "center", 
    maxWidth: 150 
  }
});

class FirebaseStorageUploader extends Component {

    uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
        };
        
        xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
        };

        // this helps us get a blob
        xhr.responseType = 'blob';

        xhr.open('GET', uri, true);
        xhr.send(null);

        });

    }

    uploadToFirebase = (blob) => {

        return new Promise((resolve, reject)=>{

        var storageRef = firebase.storage().ref();

        storageRef.child('uploads/photo.jpg').put(blob, {
            contentType: 'image/jpeg'
        }).then((snapshot)=>{

            blob.close();

            resolve(snapshot);

        }).catch((error)=>{

            reject(error);
        });
    });
}      


    handleOnPress = () => { 

        ImagePicker.launchImageLibraryAsync({ 
        mediaTypes: "Images"
        }).then((result)=>{ 

        if (!result.cancelled) {
            // User picked an image
            const {height, width, type, uri} = result;
            return uriToBlob(uri);

        }

        }).then((blob)=>{

        return uploadToFirebase(blob);

        }).then((snapshot)=>{

        console.log("File uploaded");
    
        }).catch((error)=>{

        throw error;

        }); 

    }

    render () {
    
        var button = <View 
        style={[styles.button]}
        onPress={this.handleOnPress}
        >
        <Text>Choose Photo</Text>
        </View> 

        return (button);
        
    }

}

export default FirebaseStorageUploader;