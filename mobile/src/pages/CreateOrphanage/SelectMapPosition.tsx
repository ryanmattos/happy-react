import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'

import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Marker, MapEvent } from 'react-native-maps'

import mapMarkerImg from '../../images/map-marker.png'

interface UserLocation {
   coords: {
      latitude: number;
      longitude: number;
   }
}

export default function SelectMapPosition() {
   const [errorMsg, setErrorMsg] = useState('');
   const [location, setLocation] = useState<UserLocation>({
      coords: {
         latitude: 0,
         longitude: 0
      }
   })
   const navigation = useNavigation();
   const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }

      const getCurrentPosition = await Location.getCurrentPositionAsync({});
      setLocation(getCurrentPosition);
      console.log(getCurrentPosition)
    })();
  }, []);

   function handleNextStep() {
      navigation.navigate('OrphanageData', { position });
   }

   function handleSelectMapPosition(event: MapEvent){
      setPosition(event.nativeEvent.coordinate)
   }

   if (errorMsg !== '') {
      return <Text>You need to give location permission to the app</Text>
   }

   return (
      <View style={styles.container}>
         {location.coords.latitude !== 0 && (
            <MapView 
               initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.008,
               }}
               style={styles.mapStyle}
               onPress={handleSelectMapPosition}
            >
               { position.latitude !== 0 && (
                  <Marker 
                     icon={mapMarkerImg}
                     coordinate={{ 
                        latitude: position.latitude,
                        longitude: position.longitude
                     }}
                  />
               )}
            </MapView>
         )}
         { position.latitude !== 0 && (
            <RectButton style={styles.nextButton} onPress={handleNextStep}>
               <Text style={styles.nextButtonText}>Próximo</Text>
            </RectButton>
         )}
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      position: 'relative'
   },

   mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },

   nextButton: {
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,

      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 40,
      elevation: 15
   },

   nextButtonText: {
      fontFamily: 'Nunito_800ExtraBold',
      fontSize: 16,
      color: '#FFF'
   }
})