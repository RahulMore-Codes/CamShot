import {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Colors from '../constants/Colors';

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.current.takePhoto({
      flash: 'on',
    });

    console.log(photo);
  };

  const renderCameraOverlay = () => {
    return (
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={takePicture}
          style={{
            backgroundColor: 'transparent',
            height: 80,
            width: 80,
            borderWidth: 6,
            borderColor: Colors.primary,
            borderRadius: 40,
            marginBottom: 15,
            padding: 2,
          }}>
          <View
            style={{flex: 1, backgroundColor: '#fff', borderRadius: 40}}></View>
        </TouchableOpacity>
        <View
          style={{
            height: 60,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text>QR</Text>
            <Text>AR</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      {device == null ? (
        <ActivityIndicator color="#000" />
      ) : (
        <View style={{flex: 1}}>
          <Camera
            ref={cameraRef}
            photo={true}
            orientation="portrait"
            lowLightBoost
            enableZoomGesture
            style={{...StyleSheet.absoluteFill}}
            device={device}
            isActive={true}
          />
          {renderCameraOverlay()}
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
