import 'react-native-reanimated';
import {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const HomeScreen = () => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [sensitivity, setSensitivity] = useState(0.4);
  const devices = useCameraDevices('wide-angle-camera');
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

  const focusOnPoint = async (pointX, pointY) => {
    console.log(pointX);
    await cameraRef.current.focus({x: pointX, y: pointY});
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';

    console.log(frame);
  }, []);

  const renderCameraOverlay = () => {
    return (
      <View
        onTouchEnd={({nativeEvent}) =>
          focusOnPoint(nativeEvent.pageX, nativeEvent.pageY)
        }
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
          <View style={{flex: 1, backgroundColor: '#fff', borderRadius: 40}} />
        </TouchableOpacity>
        <View />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {device != null && hasPermission ? (
        <>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            isActive={true}
            device={device}
            photo={true}
            enableZoomGesture
            frameProcessor={frameProcessor}
            onTouchEnd={({nativeEvent}) =>
              focusOnPoint(nativeEvent.pageX, nativeEvent.pageY)
            }
          />
          {renderCameraOverlay()}
        </>
      ) : (
        <Text>No camera</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
