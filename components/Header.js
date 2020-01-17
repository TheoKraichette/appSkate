import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';
import * as firebaseApp from 'firebase'

class HeaderIconExample extends Component {
    
    signOutUser = () => {
        firebaseApp.auth().signOut();
    };
    goBack = () => {
      this.props.navigation.goBack();
    }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent
            onPress={this.goBack}>
              <Icon name='back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button onPress={this.signOutUser}>
              <Text style={{color: 'white'}}>Logout</Text>
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}
export default withNavigation(HeaderIconExample)