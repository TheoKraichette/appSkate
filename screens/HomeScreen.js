import React from "react";
import {
  View
} from "react-native";
import Header from '../components/Header';
import Crud from '../components/Crud';
import styles from "../styles";


export default class HomeScreen extends React.Component {

  render() {
    return (            
      <View style={styles.container}>
          <Header/>
          <Crud/>
      </View>
    );
  }
}

