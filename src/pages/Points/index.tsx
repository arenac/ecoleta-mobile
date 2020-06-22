import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {SvgUri} from 'react-native-svg';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

const Points: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate>({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigation();

  useEffect(() => {
    async function retrieveCoords() {
      let coords: {latitude: string; longitude: string} | null;
      try {
        coords = await AsyncStorage.getItem('@ecoleta/coords');
      } catch (err) {
        Alert.prompt('Error while retrieving the coordinates');
      }

      if (coords && coordinates.latitude === 0) {
        const {latitude, longitude} = JSON.parse(coords);
        setCoordinates({
          latitude: Number(latitude),
          longitude: Number(longitude),
        });
      }
    }
    retrieveCoords();

    async function saveCoords() {
      try {
        await AsyncStorage.setItem(
          '@ecoleta/coords',
          JSON.stringify(coordinates),
        );
      } catch (err) {
        Alert.prompt('Error while saving the coordinates');
      }
    }

    return () => {
      saveCoords();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  useEffect(() => {
    async function loadInitialPosition() {
      Geolocation.getCurrentPosition(({coords}) => {
        setCoordinates(coords);
        setLoading(false);
      });
    }
    loadInitialPosition();
  }, []);

  useEffect(() => {
    api.get('items').then((response) => {
      setItems(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigate.goBack();
  }

  function handleNavigateToDetail() {
    navigate.navigate('Detail');
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((itemId) => itemId === id);
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((itemId) => itemId !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handleRegionChange(region: Coordinate) {
    setCoordinates(region);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="angle-left" size={25} color="#34cb29" />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.description}>Find a collect point in the map.</Text>

        <View style={styles.mapContainer}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                longitudeDelta: 0.014,
                latitudeDelta: 0.014,
              }}
              onRegionChangeComplete={handleRegionChange}>
              {/*
              TODO: 1:38 */}
              <Marker
                style={styles.mapMarker}
                onPress={handleNavigateToDetail}
                coordinate={{
                  latitude: 59.189274,
                  longitude: 17.619522,
                }}>
                <View style={styles.mapMarkerContainer}>
                  <Image
                    style={styles.mapMarkerImage}
                    source={{
                      uri:
                        'https://ak.picdn.net/shutterstock/videos/20502442/thumb/5.jpg',
                    }}
                  />
                  <Text style={styles.mapMarkerTitle}>Recycler</Text>
                </View>
              </Marker>
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {},
              ]}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}>
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + (StatusBar.currentHeight ? StatusBar.currentHeight : 0),
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto-Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;
