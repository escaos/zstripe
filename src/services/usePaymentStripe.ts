import {useStripe} from '@stripe/stripe-react-native';
import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';

const customAppearance = {
  font: {
    family:
      Platform.OS === 'android' ? 'avenirnextregular' : 'AvenirNext-Regular',
  },
  shapes: {
    borderRadius: 12,
    borderWidth: 0.5,
  },
  primaryButton: {
    shapes: {
      borderRadius: 20,
    },
  },
  colors: {
    primary: '#fcfdff',
    background: '#ffffff',
    componentBackground: '#f3f8fa',
    componentBorder: '#f3f8fa',
    componentDivider: '#000000',
    primaryText: '#000000',
    secondaryText: '#000000',
    componentText: '#000000',
    placeholderText: '#73757b',
  },
};

export const usePaymentStripe = () => {
  const [stripeInitialized, setStripeInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const createPaymentIntent = async () => {
    const stripeSecretKey =
      'sk_test_51NzNMAGxt6lzp6BURiTLIFSH3VB8YSIHzkWhPrB0krXqfWIs0aI59bppYnQhGkC5uuhhzSo9R3NCUYf6PAAQlefB00w7Mn4XiB'; //  (DO NOT USE IN PRODUCTION)
    const apiUrl = 'https://api.stripe.com/v1/payment_intents';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `amount=1000&currency=usd`, // e.g., $10.00
    });

    const data = await response.json();

    if (data.error) {
      Alert.alert('Error creating PaymentIntent:', data.error);
      return null;
    }

    return data.client_secret;
  };

  useEffect(() => {
    const initalizePayment = async () => {
      setLoading(true);
      const clientSecret = await createPaymentIntent();

      const {error} = await initPaymentSheet({
        customerId: '1',
        merchantDisplayName: 'Zelt',
        paymentIntentClientSecret: clientSecret,
        // customerEphemeralKeySecret: ephemeralKey,
        allowsDelayedPaymentMethods: true,
        returnURL: 'stripe-example://stripe-redirect',
        appearance: customAppearance,
      });

      setLoading(false);

      if (error) {
        Alert.alert(
          `Error trying to initialize Stripe: ${error.code}`,
          error.message,
        );
        return;
      }

      setStripeInitialized(true);
    };

    initalizePayment();
  }, [initPaymentSheet]);

  return {presentPaymentSheet, stripeLoading: loading, stripeInitialized};
};
