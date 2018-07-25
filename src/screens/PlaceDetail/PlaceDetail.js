import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { deletePlace } from '../../store/actions';


const mapDispatchToProps = dispatch => ({
  onDeletePlace: key => dispatch(deletePlace(key))
});

@connect(null, mapDispatchToProps)
class PlaceDetailScreen extends Component {
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={this.props.selectedPlace.image}
                 style={styles.placeImage} />
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    size={30}
                    color='red' />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  }
});

export default PlaceDetailScreen;
