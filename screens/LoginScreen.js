import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Keyboard, Platform  } from "react-native";
import * as firebase from "firebase";


export default class LoginScreen extends React.Component {

    state = {
        email: "",
        password: "",
        errorMessage: null,
        keyboardAvoidingViewKey: 'keyboardAvoidingViewKey'
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        // using keyboardWillHide is better but it does not work for android
        this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide': 'keyboardWillHide', this.keyboardHideListener.bind(this));
    }

    componentWillUnmount() {
        this.keyboardHideListener.remove()
    }

    keyboardHideListener() {
        this.setState({
            keyboardAvoidingViewKey:'keyboardAvoidingViewKey' + new Date().getTime()
        });
    }

    handleLogin = () => {
        const { email, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        let { keyboardAvoidingViewKey } = this.state

        return (
            
        <ScrollView>
            <KeyboardAvoidingView behavior={'position'}key={keyboardAvoidingViewKey}>
                <View>
                    <View style={{flex: 1 , alignItems: 'center', marginTop: 10, marginLeft: 10}}>
                        <Image
                            source={require('../assets/WSG.png')}
                            >
                        </Image>
                        <Text style={styles.greeting}>{`Welcome on WeSkateGo !`}</Text>

                    <Text style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.inputTitle}>Email adress</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}>
                            </TextInput>
                        </View>

                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}>
                            </TextInput>
                        </View>
                    </View>
                    
                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={{ color: "#FFF", fontWeight: "500", fontFamily: 'JackArmstrongBold' }}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ alignSelf: "center", marginTop: 32 }}
                        onPress={() => this.props.navigation.navigate("Register")}>
                        <Text style={{ color: "#414959", fontSize: 13 }}>
                            New to AppSkate? <Text style={{  color: "#000", fontFamily: 'JackArmstrongBold' }}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        fontFamily: 'JackArmstrongBold',
        color: '#010110'

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
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#101010",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: 'black', 
        borderBottomWidth: 1
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#202020",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});