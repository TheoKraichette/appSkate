import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';
import * as firebaseApp from 'firebase';
import { StatusBar, View } from 'react-native';

class HeaderIconExample extends Component {

    signOutUser = () => {
        firebaseApp.auth().signOut();
    };
    goBack = () => {
      this.props.navigation.goBack();
    }
    
  render() {
    return (
    <View>
      <StatusBar/>
        <Header
          style={{backgroundColor: '#FFFFFF'}}>
          <Left>
            <Button transparent
            onPress={this.goBack}>
              <Icon name='home' style={{color: 'black'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'black', fontFamily: 'Verdana', fontWeight:'bold' }}>WeSkateGO</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.signOutUser}>
              <Text style={{color: '#101010', fontFamily: 'Verdana', fontWeight:'bold' }}>Logout</Text>
            </Button>
          </Right>
        </Header>
      </View>
    );
  }
}
export default withNavigation(HeaderIconExample)