import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';

class HeaderIconExample extends Component {

  goToAddSpot = () => {
    this.props.navigation.push('addSpot')
  }
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
            <Icon name='arrow-back' />
            </Button>
        </Left>
        <Body>
            <Title>Header</Title>
        </Body>
        <Right>
            <Button
              onPress={this.goToAddSpot}
              transparent>
            <Icon name='menu' />
            </Button>
        </Right>
        </Header>
    </Container>
    );
  }
}

export default withNavigation(HeaderIconExample)