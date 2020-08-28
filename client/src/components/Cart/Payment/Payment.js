import React, { useState } from 'react';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import SecondaryButton from '../../UI/SecondaryButton/SecondaryButton';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Payment.module.css';

const Payment = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendPayment = async () => {
    setError(null);
    setIsProcessing(true);
    const billingDetails = {
      name: props.firstName + ' ' + props.lastName,
      email: props.email,
      address: {
        city: props.city,
        line1: props.address,
        state: props.state,
        postal_code: props.zip,
      },
    };

    try {
      const response = await axios.post('/api/orders/paymentIntent', {
        amount: props.amount * 100,
      });
      const clientSecret = response.data.data;

      const cardElement = elements.getElement(CardElement);
      const paymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethod.error) {
        setError(paymentMethod.error.message);
        setIsProcessing(false);
        return;
      }
      const confirmedCardPayment = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.paymentMethod.id,
        }
      );

      if (confirmedCardPayment.error) {
        setError(confirmedCardPayment.error.message);
        setIsProcessing(false);
        return;
      }
      setIsProcessing(false);
      props.onSuccess();
    } catch (error) {
      setIsProcessing(false);
      setError(error.message);
    }
  };
  return (
    <div className={classes.Payment}>
      <CardElement
        options={{
          style: {
            base: {
              color: '#f2f2f2',
              fontSize: '1.2rem',
            },
            invalid: {
              color: '#f91100',
            },
          },
          hidePostalCode: true,
        }}
      />
      <p className={classes.Error}>{error}</p>
      <p className={classes.Info}>
        This is a test version. Your card won't be charged if you try it, but it
        is hardly recommended by Stripe to user their test cards. You can find
        them <a href='https://stripe.com/docs/testing'>here</a>.
      </p>
      <div className={classes.Action}>
        {props.disableButton || isProcessing ? (
          <Spinner />
        ) : (
          <SecondaryButton onClick={sendPayment} title='Send Order' />
        )}
      </div>
    </div>
  );
};

export default Payment;
