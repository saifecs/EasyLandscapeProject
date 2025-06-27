import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Card, SegmentedButtons } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const ServiceCallScreen = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [issue, setIssue] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !issue) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Service Call Requested',
        'We will contact you within 2 hours to discuss your issue.',
        [{ text: 'OK', onPress: () => {
          setName('');
          setPhone('');
          setIssue('');
          setUrgency('normal');
        }}]
      );
    }, 1000);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.text }]}>Request Service Call</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            We'll call you back to discuss your landscaping needs
          </Text>

          <TextInput
            label="Full Name *"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Phone Number *"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            mode="outlined"
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
          />

          <Text style={[styles.label, { color: theme.colors.text }]}>Urgency Level</Text>
          <SegmentedButtons
            value={urgency}
            onValueChange={setUrgency}
            buttons={[
              { value: 'low', label: 'Low' },
              { value: 'normal', label: 'Normal' },
              { value: 'high', label: 'High' },
            ]}
            style={styles.segmentedButtons}
          />

          <TextInput
            label="Describe your issue or request *"
            value={issue}
            onChangeText={setIssue}
            style={styles.textArea}
            mode="outlined"
            multiline
            numberOfLines={4}
            left={<TextInput.Icon icon="message-text" />}
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}>
            Request Call
          </Button>

          <Text style={[styles.note, { color: theme.colors.textSecondary }]}>
            * We typically respond within 2 hours during business hours
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  textArea: {
    marginBottom: 24,
  },
  submitButton: {
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ServiceCallScreen; 