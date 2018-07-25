import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = props => {
  return (
    <FlatList
      data={props.places}
      renderItem={info => (
        <ListItem placeName={info.item.name}
                  placeImage={info.item.image}
                  onItemPressed={() => props.onItemSelected(info.item.key)}
                  onItemDeleted={() => props.onItemDeleted(info.item.key)}
                  onModalClosed={props.modalClosedHandler}/>
      )}
      style={styles.listContainer} />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
});

export default placeList;
