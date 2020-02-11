import React from "react";
import { StyleSheet, Platform, View, Text } from "react-native";
import MapView , { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';
import mapStyle from '../mapStyle';
import HeaderMap from '../components/HeaderMap';
import * as firebaseApp from 'firebase';
import { firebaseConfig } from '../App';
import skate88 from '../assets/skate88.png';

export default class MapScreen extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        //Initialisation de firebase si il n'y est pas déja
        if (!firebaseApp.apps.length) {
        firebaseApp.initializeApp(firebaseConfig);
        }
        //Les requetes effectuées feront référence aux documents spots
        this.tasksRef = firebaseApp.database().ref("/spots");

        const dataSource = [];
        this.state = {
        longitude: 0,
        latitude: 0,
        marker: null,
        dataSource: dataSource,
        selecteditem: null,
        snackbarVisible: false,
        confirmVisible: false
        };
    }
    //Premiere methode appelé
    componentDidMount() {
        this.requestLocationPermission();
    }
    
    goToDetailSpot = () => {
    //    this.setState({marker: this.state.dataSource});
    //   console.log(this.state.marker);
        this.props.navigation.navigate('detailSpot', {data: this.state.datasource})
    }
    //Sortie des données de la bdd
    listenForTasks(tasksRef) {
        tasksRef.on("value", dataSnapshot => {
        var tasks = [];
        dataSnapshot.forEach(child => {
            tasks.push({
            image: child.val().image,
            location: child.val().location,
            name: child.val().name,
            key: child.key
            });
        });
    // initialisation du state avec les données récupérer
        this.setState({
            dataSource: tasks
        });
    });
}
    //Demande d'autorisation de geolocalisation
    requestLocationPermission = async () => {
        //Si la plateforme est Ios
        if(Platform.OS === "ios") {
            //Attente de la réponse permission IOS
            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            //Si la réponse est valide renvoi a la fonction de géolocalisation
            if(response === 'granted'){
            this.locateCurrentPosition();
            }
        } else { // Sinon meme chose pour Android
            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if(response === 'granted'){
                this.locateCurrentPosition();
            }
        }
    }
    // Geolocalisation
    locateCurrentPosition = () => {
        Geolocation.getCurrentPosition(
        //Reception de la position de l'utilisateur
            position => {
            JSON.stringify(position);
                let initialPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.000002,
                    longitudeDelta: 0.0121
                }
            /* initialisation du state avec les coordonnées
                de la position de l'utilisateur */
                this.setState({initialPosition});
            //Si une position a été récupérée j'envoi a la fonction
                if(position !== null){
                    this.listenForTasks(this.tasksRef);
                }
            },
        )
    }

    render() {
        return (
        <View>
            <HeaderMap/>
            {/*La position initial de l'affichage de la map
            sera la position de l'utilisateur récupérer précédemment*/}
            <MapView                
                initialRegion={this.state.initialPosition}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                customMapStyle={mapStyle}
            > 
            {/*J'appelle les données des spots récupérés 
                et je rend un marker pour chaque spot trouvé*/}
            {this.state.dataSource.map(marker => (
                <MapView.Marker
                    key={marker.key}
                    image={skate88}
                    coordinate={{longitude: marker.location.longitude, latitude: marker.location.latitude}}
                >
                    <Callout onPress={this.goToDetailSpot}>
                        <Text> Spot Name : {marker.name}</Text>
                        <Text style={styles.item}>Double tap to see more !</Text>
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