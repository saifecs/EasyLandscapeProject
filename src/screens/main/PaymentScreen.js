import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Card, Button, TextInput, SegmentedButtons, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit Card', icon: 'credit-card' },
  { value: 'paypal', label: 'PayPal', icon: 'account-balance-wallet' },
  { value: 'bank', label: 'Bank Transfer', icon: 'account-balance' },
];

const PaymentScreen = () => {
  const { theme } = useTheme();
  
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv || !cardholderName)) {
      Alert.alert('Error', 'Please fill in all card details');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Payment Successful',
        `Payment of $${amount} has been processed successfully!`,
        [{ text: 'OK', onPress: () => {
          // Reset form
          setAmount('');
          setCardNumber('');
          setExpiryDate('');
          setCvv('');
          setCardholderName('');
        }}]
      );
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <View style={styles.paymentForm}>
            <TextInput
              label="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              maxLength={16}
              left={<TextInput.Icon icon="credit-card" />}
            />
            <View style={styles.row}>
              <TextInput
                label="Expiry Date (MM/YY)"
                value={expiryDate}
                onChangeText={setExpiryDate}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                maxLength={5}
                placeholder="MM/YY"
              />
              <TextInput
                label="CVV"
                value={cvv}
                onChangeText={setCvv}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
            <TextInput
              label="Cardholder Name"
              value={cardholderName}
              onChangeText={setCardholderName}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="account" />}
            />
          </View>
        );
      case 'paypal':
        return (
          <View style={styles.paymentForm}>
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              You will be redirected to PayPal to complete your payment.
            </Text>
          </View>
        );
      case 'bank':
        return (
          <View style={styles.paymentForm}>
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              Bank transfer details will be sent to your email.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.text }]}>Make Payment</Text>
          
          <View style={styles.amountSection}>
            <Text style={[styles.amountLabel, { color: theme.colors.text }]}>Amount</Text>
            <TextInput
              label="Enter Amount ($)"
              value={amount}
              onChangeText={setAmount}
              style={styles.amountInput}
              mode="outlined"
              keyboardType="numeric"
              left={<TextInput.Icon icon="attach-money" />}
            />
          </View>

          <Divider style={styles.divider} />

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Payment Method</Text>
          
          <SegmentedButtons
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            buttons={PAYMENT_METHODS.map(method => ({
              value: method.value,
              label: method.label,
              icon: method.icon,
            }))}
            style={styles.segmentedButtons}
          />

          {renderPaymentForm()}

          <Button
            mode="contained"
            onPress={handlePayment}
            loading={isProcessing}
            disabled={isProcessing}
            style={[styles.payButton, { backgroundColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}>
            {isProcessing ? 'Processing...' : `Pay $${amount || '0'}`}
          </Button>

          <Text style={[styles.securityNote, { color: theme.colors.textSecondary }]}>
            🔒 Your payment information is secure and encrypted
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  amountSection: {
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  amountInput: {
    fontSize: 18,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  segmentedButtons: {
    marginBottom: 24,
  },
  paymentForm: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  payButton: {
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  securityNote: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PaymentScreen; 