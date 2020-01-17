import { createBottomTabNavigator } from 'react-navigation-tabs'
import React from 'react'
import { StyleSheet, Image } from 'react-native';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';

export const TabScreen = createBottomTabNavigator({

  
    Home: {
        screen: HomeScreen, 
        navigationOptions: {
            tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
                return <Image
                  source={require('../assets/planb.png')}
                  style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
              }
        }
    },
    Map: {
      screen: MapScreen, 
      navigationOptions: {
          tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
              return <Image
                source={require('../assets/skatee.png')}
                style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
              }
          }
        },

        },
        
        {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: true, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
          }
        }
      )
      

    const styles = StyleSheet.create({
        icon: {
          width: 35,
          height: 35
        }
      })