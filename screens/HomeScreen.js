import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
    
    state = {
        email: "",
        displayName: "",
        displayNickName: ""
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName, });
    }    

    signOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        return (
            <View style={styles.container}>
                <Container>
                    <Header
                        androidStatusBarColor="#FFFFFF"
                        style={{ backgroundColor: 'red' }}>
                        <Left>
                            <Button transparent>
                            <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Header</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                            <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
                </Container>

                <View style={styles.container}>
                    <Text style={styles.greeting}>Hi {this.state.displayName}!</Text>
                </View>
            </View>
    );
  }
}                

 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",

    },
    greeting: {
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        marginBottom: 50
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    button: {
        marginTop: 30,
        marginHorizontal: 30,
        backgroundColor: "#8F0F0F",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});

