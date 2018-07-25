import React, { Component } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';


const mapStateToProps = state => ({
  places: state.places.places
});

@connect(mapStateToProps)
class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  state = {
    placesLoaded: false,
    removeAnimation: new Animated.Value(1)
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      }
    }
  };

  placesLoadedHandler = () => {
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => place.key === key);

    this.props.navigator.push({
      screen: 'udemy-native-app.PlaceDetailScreen',
      title: selectedPlace.name,
      passProps: { selectedPlace }
    });
  };

  render() {
    let content = (
      <Animated.View style={{
        opacity: this.state.removeAnimation,
        transform: [{
          scale: this.state.removeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 1]
          })
        }]
      }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if (this.state.placesLoaded) {
      content = (
        <PlaceList places={this.props.places}
                   onItemSelected={this.itemSelectedHandler} />
      );
    }

    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const
  styles = StyleSheet.create({
    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchButton: {
      borderColor: 'orange',
      borderWidth: 3,
      borderRadius: 50,
      padding: 20
    },
    searchButtonText: {
      color: 'orange',
      fontWeight: 'bold',
      fontSize: 26
    }
  });

export default FindPlaceScreen;
