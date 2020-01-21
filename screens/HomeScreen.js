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
import {
  TextInput,
  Button,
  Snackbar,
  Portal,
  Dialog,
  Paragraph,
  Provider as PaperProvider
} from "react-native-paper";
import { firebaseConfig } from '../App';
import Header from '../components/Header';
import { Platform } from "react-native";


export default class HomeScreen extends React.Component {
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
          name: child.val().name,
          key: child.key
        });
      });

      this.setState({
        dataSource: tasks
      });
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          width: "90%",
          height: 2,
          backgroundColor: "#BBB5B3"
        }}>
        <View />
      </View>
    );
  };

  deleteItem(item) {
    this.setState({ deleteItem: item, confirmVisible: true });
  }

  performDeleteItem(key) {
    var updates = {};
    updates["/spots/" + key] = null;
    return firebaseApp
      .database()
      .ref()
      .update(updates);   
  }

  addItem(itemLocation, itemName) {
    var newPostKey = firebaseApp
      .database()
      .ref()
      .child("spots")
      .push().key;

    var updates = {};
    updates["/spots/" + newPostKey] = {
      name:
        itemName === "" || itemName == undefined
          ? this.state.itemname
          : itemName,
        location:
        itemLocation === "" || itemLocation == undefined
          ? this.state.itemLocation
          : itemLocation
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);    
  }

  updateItem() {
    var updates = {};
    updates["/spots/" + this.state.selecteditem.key] = {
      name: this.state.itemname,
      location: this.state.itemLocation
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);   
  }

  saveItem() {
    if (this.state.selecteditem === null) this.addItem();
    else this.updateItem();

    this.setState({ itemname: "", selecteditem: null, itemLocation: "" });
  }

  hideDialog(yesNo) {
    this.setState({ confirmVisible: false });
    if (yesNo === true) {
      this.performDeleteItem(this.state.deleteItem.key).then(() => {
        this.setState({ snackbarVisible: true });
      });
    }
  }

  showDialog() {
    this.setState({ confirmVisible: true });
    console.log("in show dialog");
  }

  undoDeleteItem() {
    this.addItem(this.state.deleteItem.name);
  }

  render() {
    return (            
      <PaperProvider>
        <Header/>
        <View style={styles.container}>
          <ScrollView>
            <Text>City list from firebase</Text>
            <TextInput
              label="Name"
              style={{
                height: 50,
                width: 250,
                borderColor: "gray",
                borderWidth: 1                
              }}
              onChangeText={text => this.setState({ itemname: text })}
              value={this.state.itemname}
            />        
            <TextInput
            label="Location"
            style={{
              height: 50,
              width: 250,
              borderColor: "gray",
              borderWidth: 1                
            }}
            onChangeText={text => this.setState({ itemLocation: text })}
            value={this.state.itemLocation}
          />
            <View style={{height:10}}></View>          
            <Button 
              mode="contained"
              style={{backgroundColor:'black'}}
              onPress={() => this.saveItem()}
            >
              {this.state.selecteditem === null ? "add" : "update"}
            </Button>                  
            <ScrollView horizontal={true}>

            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <View>
                    <TouchableWithoutFeedback>
                      <View style={{ paddingTop: 10 }}>
                        <Text
                          style={{ color: "#4B0082" }}
                          onPress={() => this.deleteItem(item)}
                        >
                          Delete
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.setState({
                          selecteditem: item,
                          itemname: item.name,
                          itemLocation: item.location
                        }) 
                      }
                    >
                      <View>
                        <Text style={styles.item}>{item.name} </Text>
                      </View>
                    </TouchableWithoutFeedback>
                </View>
              )}
              spotseparatorComponent={this.renderSeparator}
            />                  
            </ScrollView>

            <Text />
            <Portal>
              <Dialog
                visible={this.state.confirmVisible}
                onDismiss={() => this.hideDialog(false)}
              >
                <Dialog.Title>Confirm</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Are you sure you want to delete this?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => this.hideDialog(true)}>Yes</Button>
                  <Button onPress={() => this.hideDialog(false)}>No</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </ScrollView>
          <Snackbar
            visible={this.state.snackbarVisible}
            onDismiss={() => this.setState({ snackbarVisible: false })}
            action={{
              label: "Undo",
              onPress: () => {
                // Do something
                this.undoDeleteItem();
              }
            }}
          >
            Item deleted successfully.
          </Snackbar>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 38 : 22,
    alignItems: "center",
    backgroundColor: "#F5FFFA"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: "center"
  }
});
