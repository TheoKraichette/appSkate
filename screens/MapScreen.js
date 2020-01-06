import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
      }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>Hi Map View </Text>

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
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
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
