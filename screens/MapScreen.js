import React from "react";
import { StyleSheet, Platform, View, Text} from "react-native";
import MapView , { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';
import mapStyle from '../mapStyle';
import HeaderMap from '../components/HeaderMap';
import * as firebaseApp from 'firebase';
import { firebaseConfig } from '../App';

export default class MapScreen extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        if (!firebaseApp.apps.length) {
        firebaseApp.initializeApp(firebaseConfig);
        }
        this.tasksRef = firebaseApp.database().ref("/spots");

        const dataSource = [];
        this.state = {
        longitude: 0,
        latitude: 0,
        dataSource: dataSource,
        selecteditem: null,
        snackbarVisible: false,
        confirmVisible: false
        };
    }

    componentDidMount() {
        // start listening for firebase updates
        this.requestLocationPermission();
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
        console.log(this.state.dataSource)
        });
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
            position => {
            JSON.stringify(position);
                let initialPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.000002,
                    longitudeDelta: 0.0121
                }
                this.setState({initialPosition});
                if(initialPosition !== null){
                    this.listenForTasks(this.tasksRef);
                }
                console.log(this.state.initialPosition)
            },
            error => console.log(error), 
        )
    }

    render() {
        return (
        <View>
            <HeaderMap/>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={this.state.initialPosition}
                customMapStyle={mapStyle}
            >
            {this.state.dataSource.map(marker => (
                <MapView.Marker
                    key={marker.key}
                    coordinate={{longitude: marker.location.longitude, latitude: marker.location.latitude}}
                >
                    <Callout>
                        <Text style={styles.item}>{marker.name} </Text>
                    </Callout>
                </MapView.Marker>
            ))}
            </MapView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",

    },
    map: {
        height: '95%',
    }

});