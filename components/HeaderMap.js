import React, { Component } from 'react';
import { Text } from 'react-native';
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
        <Header
                  style={{backgroundColor: 'black'}}>
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
              transparent
              textStyle='Ajouté un Spot'>
            <Text style={{color: 'white'}}>Ajouté un Spot </Text>
            <Icon name='add' />
            </Button>
        </Right>
        </Header>
    );
  }
}

export default withNavigation(HeaderIconExample)