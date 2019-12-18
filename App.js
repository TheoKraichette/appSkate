import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyD1UcTeqFQJimRON0_2iKGCusrHvc3MObQ",
  authDomain: "appskate-249e5.firebaseapp.com",
  databaseURL: "https://appskate-249e5.firebaseio.com",
  projectId: "appskate-249e5",
  storageBucket: "appskate-249e5.appspot.com",
  messagingSenderId: "346184069412",
  appId: "1:346184069412:web:3c857e66cae74872f383b1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home : HomeScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)