import React from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS} from 'react-native-permissions';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        header: null
      }
    componentDidMount(){
        this.requestLocationPermission();
    }
    constructor(props){
        super(props);
     
        this.state = {
        }
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
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0121
                }

                this.setState({initialPosition});
            },
        )
    }

    render() {
        return (
            <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={map => this._map = map}
            showsUserLocation={true}
            initialRegion={this.state.initialPosition}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
 
    },
    map: {
        height: '100%'
    }

});
