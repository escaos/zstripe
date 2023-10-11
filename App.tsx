/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StripeProvider} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from './src/domain/models/Navigation.types';
import {CheckoutScreen} from './src/screens/Checkout';
import {HomeScreen} from './src/screens/Home';
import {ThanksScreen} from './src/screens/Thanks';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const key =
      'pk_test_51NzNMAGxt6lzp6BUXpfILgQjqR4Q2WwXjFiocy1cZuhGppURudThj28tH32a3OWORmMfQ2Mgr0kmiCXPNMmrZ0SS000dilephM';
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.com.stripe.react.native" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Thanks">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Thanks" component={ThanksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

export default App;
