import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';
import configureStore from './src/store/configureStore';


const store = configureStore();

// Register Screens
Navigation.registerComponent('udemy-native-app.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('udemy-native-app.SharePlaceScreen', () => SharePlaceScreen, store, Provider);
Navigation.registerComponent('udemy-native-app.FindPlaceScreen', () => FindPlaceScreen, store, Provider);
Navigation.registerComponent('udemy-native-app.PlaceDetailScreen', () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent('udemy-native-app.SideDrawerScreen', () => SideDrawerScreen);

// Start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'udemy-native-app.AuthScreen',
    title: 'Login'
  }
});
