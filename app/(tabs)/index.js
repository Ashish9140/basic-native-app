import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator,Easing } from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import icons from '../../constants/icons';

const SnapScreen = () => {
  const [showLayerOptions, setShowLayerOptions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapType, setMapType] = useState('standard');
  const [polygons, setPolygons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    if (!loading && polygons.length > 0) {
      zoomToFitPolygons(polygons);
    }
  }, [polygons, loading]);

  const getLocationAsync = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);

    let regionCode = '';
    if (location.coords.latitude >= 36.0) {
      regionCode = 'rg3';
    } else if (location.coords.latitude < -36.0) {
      regionCode = 'rg9';
    } else {
      regionCode = 'rg7';
    }

    const postData = {
      function: 'point-to-grid',
      order: '1',
      position: '1',
      region_code: regionCode,
      column1: '6',
      rings: '2',
      separator: 'SEMICOLON',
      size: '10',
      srid: '3035',
      json_data: [{
        "Int-Nr": "6808",
        "Name": "snapper point",
        "Modell": "Snap",
        "Kennzeichen": "Test01",
        "Datum": "01.05.2024",
        "lat+long": `${location.coords.latitude},${location.coords.longitude}`,
        "Uhrzeit": "00:01"
      }],
      'with Centroid': true,
      'with square': true
    };

    fetch('http://dvggconnector.tgb.software:8080/api/client_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        const squares = data.csv_data_result.map(item => ({
          coordinates: [
            { latitude: parseFloat(item.blywsg), longitude: parseFloat(item.blxwsg) },
            { latitude: parseFloat(item.tlywsg), longitude: parseFloat(item.tlxwsg) },
            { latitude: parseFloat(item.trywsg), longitude: parseFloat(item.trxwsg) },
            { latitude: parseFloat(item.brywsg), longitude: parseFloat(item.brxwsg) }
          ]
        }));
        setPolygons(squares);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setLoading(false);
      });
  };


  const zoomToFitPolygons = (squares) => {
    if (mapRef.current && squares.length > 0) {
      const allCoordinates = squares.reduce((coords, square) => coords.concat(square.coordinates), []);
      mapRef.current.fitToCoordinates(allCoordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
        duration: 2000, // Adjust duration as needed
        easing: Easing.linear()
      });
    }
  };

  const toggleLayerOptions = () => {
    setShowLayerOptions(!showLayerOptions);
  };

  const changeMapType = (newMapType) => {
    setMapType(newMapType);
    setShowLayerOptions(false);
  };

  const handleRecenter = () => {
    getLocationAsync();
    setSelectedPolygonIndex(null);
  };

  const handlePolygonPress = (index) => {
    console.log('Selected Polygon Index:', index);
    setSelectedPolygonIndex(index);

    // Zoom to the selected polygon's coordinates
    const selectedPolygon = polygons[index];
    if (selectedPolygon && mapRef.current) {
      mapRef.current.fitToCoordinates(selectedPolygon.coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  if (loading || !currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={mapType}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {polygons.map((polygon, index) => (
          <Polygon
            key={index}
            coordinates={polygon.coordinates}
            strokeColor={selectedPolygonIndex === index ? 'rgba(144, 238, 144, 0.7)' : 'rgba(0, 191, 255, 0.3)'}
            fillColor={selectedPolygonIndex === index ? 'rgba(144, 238, 144, 0.7)' : 'rgba(255, 255, 255, 0.7)'}
            strokeWidth={2}
            onPress={()=>{handlePolygonPress(index)}}
            tappable={true}
          />
        ))}
      </MapView>
      <View style={styles.topRightButtons}>
        <TouchableOpacity style={styles.layerOptionButton}>
          <Image
            source={icons.more}
            style={{
              height: 24,
              width: 24
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.layerOptionButton} onPress={toggleLayerOptions}>
          <Image
            source={icons.layers}
            style={{
              height: 24,
              width: 24
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.layerOptionButton} onPress={handleRecenter}>
          <Image
            source={icons.recenter}
            style={{
              height: 24,
              width: 24
            }}
          />
        </TouchableOpacity>
      </View>
      {showLayerOptions && (
        <View style={styles.layerOptionsContainer}>
          <TouchableOpacity style={styles.layerOption} onPress={() => changeMapType('standard')}>
            <Image
              source={icons.defaultm}
              style={{
                height: 30,
                width: 30,
                borderRadius: 4
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.layerOption} onPress={() => changeMapType('satellite')}>
            <Image
              source={icons.satellite}
              style={{
                height: 30,
                width: 30,
                borderRadius: 4
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.layerOption} onPress={() => changeMapType('hybrid')}>
            <Image
              source={icons.hybrid}
              style={{
                height: 30,
                width: 30,
                borderRadius: 4
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topRightButtons: {
    position: 'absolute',
    top: 40,
    right: 0,
    alignItems: 'center',
    zIndex: 10
  },
  layerOptionButton: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  layerOptionsContainer: {
    position: 'absolute',
    top: 95,
    right: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 2,
    zIndex: 20,
    flexDirection: 'row'
  },
  layerOption: {
    padding: 5,
  }
});

export default SnapScreen;
