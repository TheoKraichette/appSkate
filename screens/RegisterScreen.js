import React from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default class RegisterScreen extends React.Component {
    
    static navigationOptions = {
        header: null
    }

    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    };

    componentDidMount() {
        this._isMounted = true;
    }

    handleSignUp = () => {
        //Creation d'utilisateur via firebase auth email & password 
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
            firebase.auth().currentUser.updateProfile({
                displayName : this.state.name,
            }).then(()=>{
        //Ajout de l'utilisateur a la base de données
                firebase.database()
                .ref('user/' + firebase.auth().currentUser.uid + "/profile")
                .set({
                    Username: this.state.name,
                    UserEmail: this.state.email,
                })
            });
        }).catch(error => this.setState({ errorMessage: error.message }));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
        <View style={styles.container}>
            <View style={{marginTop: 25}}>
                <Text style={styles.greeting}>{`Sign up to get started \n \n On We Skate GO`}</Text>
            </View>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Nick Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                        />
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontFamily: 'JackArmstrongBold' }}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}>
                    <Text style={{ color: "#414959", fontSize: 13 }}
                    onPress={() => this.props.navigation.navigate("Login")}>
                        Already an account? <Text style={{ fontFamily: 'JackArmstrongBold', color: "#000" }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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