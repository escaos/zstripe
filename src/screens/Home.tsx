/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, Button, Image, View} from 'react-native';
import {RootStackParamList} from '../domain/models/Navigation.types';
import {usePaymentStripe} from '../services/usePaymentStripe';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({navigation}: Props) => {
  const [isPaymentForm, setPaymentForm] = useState(false);
  const {presentPaymentSheet} = usePaymentStripe();

  const pay = async () => {
    setPaymentForm(true);
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error connecting Stripe ${error?.code}`, error?.message);
      setPaymentForm(false);
      return;
    }

    navigation.navigate('Thanks');

    Alert.alert('Success', 'Your payment was processed successfully');
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: isPaymentForm ? 'flex-start' : 'center',
        padding: isPaymentForm ? 5 : 10,
      }}>
      <Image
        style={{
          width: '100%',
          height: isPaymentForm ? '30%' : '50%',
          resizeMode: isPaymentForm ? 'cover' : 'contain',
        }}
        source={{
          uri: 'https://bcfresh.ca/wp-content/uploads/2021/11/BCfresh-Potato.jpg',
        }}
      />
      {!isPaymentForm && <Button title="Buy" onPress={pay} />}
    </View>
  );
};

export default HomeScreen;
