import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class HeaderIconExample extends Component {
    signOutUser = () => {
        firebase.auth().signOut();
    };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button onPress={this.signOutUser}>
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}