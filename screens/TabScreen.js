import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';

export const TabScreen = createBottomTabNavigator({
    Home: {
        screen: HomeScreen, 
        navigationOptions: {
            tabBarLabel: 'Home', 
        }
    },
    Map: {
        screen: MapScreen, 
        navigationOptions: {
            tabBarLabel: 'Map', 
        }
    },
});