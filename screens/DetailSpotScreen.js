import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import {
    TextInput,
    Button
  } from "react-native-paper";
import styles from "../styles";
import * as firebase from "firebase";
import LinearGradient from 'react-native-linear-gradient';
import LastSpot from '../components/LastSpot';
import HeaderMap from "../components/HeaderMap";

export default class DetailSpotScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (            
        <View style={styles.container}>
            <HeaderMap/>          
            <LinearGradient colors={['#181818', '#161616', '#141414', '#121212', '#101010']} style={styles.linearGradient}>
            <View style={styleWel.welcome}>
            </View>            
            <LastSpot/>
            
            </LinearGradient>        
            <Button
            onPress={this.goBack}
            style={{backgroundColor:'#101010'}}>
            </Button>

    
        </View>
        );
    }
}

const styleWel = StyleSheet.create({
  welcome: {
    height: 151,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  text :{
    color: 'white',
    fontFamily: 'JackArmstrongBold'
  }
})


