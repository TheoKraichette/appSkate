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
    
    componentDidMount(){
      const data = this.props.navigation.getParam(data, 'some default value');
      this.setState({data});
    }

    goBack = () => {
      this.props.navigation.goBack();
    }

    render() {
      const { navigation } = this.props.navigation;

        return (            
        <View style={styles.container}>
            <HeaderMap/>          
            <LinearGradient colors={['#181818', '#161616', '#141414', '#121212', '#101010']} style={styles.linearGradient}>
            <View style={styleWel.welcome}>
              <Text style={{color: 'FFF'}}>    {/*{this.state.data}*/}</Text>
            </View>            
            <LastSpot/>
            </LinearGradient>
            <Button
            onPress={this.goBack}
            style={{backgroundColor:'#101010', margin: 5}}>
              <Text style={{color: "#FFF", fontWeight: "500", fontFamily: 'JackArmstrongBold' }}>View challenges of this spot</Text>
            </Button>
            <Button
            onPress={this.goBack}
            style={{backgroundColor:'#101010', margin: 5}}>
              <Text style={{ color: "#FFF", fontWeight: "500", fontFamily: 'JackArmstrongBold' }}>Add challenge</Text>
            </Button>
            <Button
            onPress={this.goBack}
            style={{backgroundColor:'#101010', margin: 5}}>
              <Text style={{ color: "#FFF", fontWeight: "500", fontFamily: 'JackArmstrongBold' }}>GoBack</Text>
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


