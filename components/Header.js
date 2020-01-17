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
          style={{backgroundColor: 'black'}}>
          <Left>
            <Button transparent
            onPress={this.goBack}>
              <Icon name='home' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.signOutUser}>
              <Text style={{color: 'white'}}>Logout</Text>
            </Button>
          </Right>
        </Header>
      </View>
    );
  }
}
export default withNavigation(HeaderIconExample)