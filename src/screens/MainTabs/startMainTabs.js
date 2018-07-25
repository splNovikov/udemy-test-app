import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const startTabs = () => {
  const isAndroid = Platform.OS === 'android';

  Promise.all([
    Icon.getImageSource(isAndroid ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(isAndroid ? 'md-share-alt' : 'ios-share', 30),
    Icon.getImageSource(isAndroid ? 'md-menu' : 'ios-menu', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'udemy-native-app.FindPlaceScreen',
          label: 'Find Place',
          title: 'Find Place',
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [{
              icon: sources[2],
              title: 'Menu',
              id: 'sideDrawerToggle'
            }]
          }
        },
        {
          screen: 'udemy-native-app.SharePlaceScreen',
          label: 'Share Place',
          title: 'Share Place',
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [{
              icon: sources[2],
              title: 'Menu',
              id: 'sideDrawerToggle'
            }]
          }
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: 'orange'
      },
      drawer: {
        left: {
          screen: 'udemy-native-app.SideDrawerScreen'
        }
      },
      appStyle: {
        tabBarSelectedButtonColor: 'orange'
      }
    });
  });

};

export default startTabs;
