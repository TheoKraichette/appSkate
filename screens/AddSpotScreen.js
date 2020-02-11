import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from "react-native";
import {
  TextInput,
  Button
} from "react-native-paper";
import MapView from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS} from 'react-native-permissions';
import mapStyle from '../mapStyle';
import styles from "../styles";
import LoadingScreen from './LoadingScreen';
import * as firebaseApp from "firebase";
import { firebaseConfig } from '../App';
import  Picture  from '../components/Picture';

console.disableYellowBox = true;

// Disable yellow box warning messages
export default class AddSpot extends Component {
  
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
    confirmVisible: false,
    loading: true,
    region: {
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001
    },
    isMapReady: false,
    marginTop: 1,
    userLocation: "",
    regionChangeProgress: false

    };
}
  componentDidMount(){
    this.requestLocationPermission();
}

  requestLocationPermission = async () => {
    if(Platform.OS === "ios") {
        var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if(response === 'granted'){
        this.locateCurrentPosition();
    }
    } else {
        var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if(response === 'granted'){
            this.locateCurrentPosition();
        }
    }
}

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        };
        this.setState({
          region: region,
          loading: false,
          error: null,
        });
      },
      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false
        })
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
    );
  }

  onMapReady = () => {
    this.setState({ isMapReady: true, marginTop: 0 });
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  // Fetch location details as a JSON from google map API
  fetchAddress = () => {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyD0eoffcsPhgvOLn7RnwBbrK70uufqMSyM")
      .then((response) => response.json())
      .then((responseJson) => {
        const userLocation = responseJson.results[0].formatted_address;
        this.setState({
          userLocation: userLocation,
          regionChangeProgress: false
        });
    });
  }

  // Update state on region change
  onRegionChange = region => {
    this.setState({
      region: region,
      regionChangeProgress: true
    }, () => this.fetchAddress());
    console.log(region)
  }
  spotAdded = () => alert('spot added');

  // Action to be taken after select location button click
  onLocationSelect = () => alert(this.state.userLocation);

  // CRUD
  listenForTasks(tasksRef) {
    tasksRef.on("value", dataSnapshot => {
    var tasks = [];
    dataSnapshot.forEach(child => {
        tasks.push({
        location: child.val().location,
        name: child.val().name,
        resume: child.val().resume,
        key: child.key
        });
    });

    this.setState({
        dataSource: tasks
    });
  });
}

addItem(region, itemName, itemResume) {
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
        region === "" || region == undefined
        ? this.state.region
        : region,
    resume:
        itemResume === "" || itemResume == undefined
        ? this.state.itemResume
        : itemResume,
    user:
        firebaseApp.auth().currentUser.uid
    };

    try {
      firebaseApp
    .database()
    .ref()
    .update(updates);
    alert('spot added');
    this.goBack();
    } catch (error) {
      alert('please complete all fields');
      console.log(error)
    }
  }

saveItem() {
    if (this.state.selecteditem === null) this.addItem();
    else this.updateItem();
    this.setState({ itemname: null, selecteditem: null, userLocation: "", itemResume: null });
}

  render() {
    if (this.state.loading) {
      return (
        <View>
          <LoadingScreen/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
              {!!this.state.region.latitude && !!this.state.region.longitude &&
                <MapView
                  style={stylesMap.map}
                  initialRegion={this.state.region}
                  showsUserLocation={true}
                  onMapReady={this.onMapReady}
                  onRegionChangeComplete={this.onRegionChange}
                  customMapStyle={mapStyle}
                >
                </MapView>
              }
                <View style={styles.mapMarkerContainer}>
                  <Text style={{ fontFamily: 'fontawesome', fontSize: 42, color: "#E2DEDE" }}>&#xf041;</Text>
                </View>
                <View style={{padding: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "roboto", marginBottom: 5 }}>Move map for pick location</Text>
                  <Text style={{ fontSize: 10, color: "#999" }}>ADD SPOT</Text>
                  <TextInput
                  numberOfLines={2}
                    label="Location"
                    style={styles.input}
                    onChangeText={location => this.setState({ userLocation: location })}
                    value={this.state.userLocation}
                  />
                  <TextInput
                  label="Name"
                  style={styles.input}
                  onChangeText={name => this.setState({ itemname: name })}
                  value={this.state.itemname}
                  />    
                  <TextInput
                    label="Resume"
                    style={styles.input}
                    onChangeText={resume => this.setState({ itemResume: resume })}
                    value={this.state.itemResume}
                  />     
                  <View style={{height:10}}></View>                   
                  <Picture/>
                  <Button 
                  mode="contained"
                  style={{backgroundColor:'#101010', marginTop: 5}}
                  onPress={() => this.saveItem()}
                  >
                    <Text style={{ color: "#FFF", fontWeight: "500", fontFamily: 'JackArmstrongBold' }}>Add Spot</Text>
                  </Button>                  
                    <View style={{height: 10}}></View>
                  <Button
                    onPress={this.goBack}
                    style={{backgroundColor:'#101010'}}>
                      <Text style={{ color: "#FFF", fontWeight: "500", fontFamily: 'JackArmstrongBold' }}>GoBack</Text>
                  </Button>
                </View>      
            </View>   
        </View>
      );
    }
  }
}

const stylesMap = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
  },
  map: {
      height: '40%',
  },
  inputTitle: {
    color: "#101010",
    fontSize: 10,
    textTransform: "uppercase"
},
input: {
    borderBottomColor: 'black', 
    borderBottomWidth: 1,
    height: 20
},

});