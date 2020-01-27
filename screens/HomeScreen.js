import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import Header from '../components/Header';
import Crud from '../components/Crud';
import styles from "../styles";
import * as firebase from "firebase";
import LinearGradient from 'react-native-linear-gradient';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

state = {
    email: "",
    displayName: "",
};

componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });
}
  render() {
    return (            
      <View style={styles.container}>
          <Header/>          
          <LinearGradient colors={['#181818', '#161616', '#141414', '#121212', '#101010']} style={styles.linearGradient}>
          <View style={styleWel.welcome}>
            <Text style={styleWel.text}>
              Hi {this.state.displayName} ! Let's ride the world !
            </Text>
          </View>          
          </LinearGradient>
          <Crud/>
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


