/* eslint-disable react-native/no-inline-styles */
import {CommonActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../domain/models/Navigation.types';

type Props = NativeStackScreenProps<RootStackParamList, 'Thanks'>;

export const ThanksScreen = ({navigation}: Props) => {
  const goToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={{
          width: '100%',
          height: '20%',
          resizeMode: 'contain',
        }}
        source={{
          uri: 'https://w7.pngwing.com/pngs/442/715/png-transparent-check-mark-computer-icons-icon-design-cheque-successful-angle-logo-grass.png',
        }}
      />
      <Text style={{fontSize: 24, fontWeight: 'bold', padding: 10}}>
        Thanks for your purchase
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'dodgerblue',
          padding: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#ddd',
        }}
        onPress={goToHome}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThanksScreen;
