import React from "react";
import {
StyleSheet,
Text,
View,
FlatList,
TouchableWithoutFeedback,
ScrollView
} from "react-native";
import * as firebaseApp from "firebase";
import { firebaseConfig } from '../App';
import { Platform } from "react-native";

export default class LastSpot extends React.Component {
constructor(props) {
    super(props);

    if (!firebaseApp.apps.length) {
    firebaseApp.initializeApp(firebaseConfig);
    }
    this.tasksRef = firebaseApp.database().ref("/spots");

    const dataSource = [];
    this.state = {
    dataSource: dataSource,
    selecteditem: null,
    snackbarVisible: false,
    confirmVisible: false
    };
}

componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
}

listenForTasks(tasksRef) {
    tasksRef.on("value", dataSnapshot => {
    var tasks = [];
    dataSnapshot.forEach(child => {
        tasks.push({
        location: child.val().location,
        resume: child.val().resume,
        name: child.val().name,
        key: child.key
        });
    });

    this.setState({
        dataSource: tasks
    });
    console.log(this.state.dataSource)
    });
}

render() {
    return (            
        <View style={styles.container}>
            <ScrollView>
                <Text>
                    Last spots : 
                </Text>
                <View style={{height:10}}></View>          
                <ScrollView horizontal={true}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) => (
                        <View>
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    alert(item.resume)
                                }
                            >
                                <View>
                                    <Text style={styles.item}>{item.name} </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        )}
                    />                  
                </ScrollView>
            </ScrollView>
        </View>
    );
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 38 : 22,
    alignItems: "center",
    backgroundColor: "#FBFBFA"
},
item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: "center"
}
});
