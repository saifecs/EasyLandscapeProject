import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Card, SegmentedButtons, Checkbox } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const SERVICE_TYPES = [
  'Lawn Maintenance',
  'Tree Trimming',
  'Garden Design',
  'Irrigation System',
  'Landscaping',
  'Hardscaping',
  'Other',
];

const BUDGET_RANGES = [
  { value: 'under-500', label: 'Under $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2500', label: '$1,000 - $2,500' },
  { value: '2500-5000', label: '$2,500 - $5,000' },
  { value: 'over-5000', label: 'Over $5,000' },
];

const RequestQuoteScreen = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [serviceType, setServiceType] = useState('');
  const [propertySize, setPropertySize] = useState('');
  const [propertyAddress, setPropertyAddress] = useState(user?.address || '');
  const [budgetRange, setBudgetRange] = useState('');
  const [description, setDescription] = useState('');
  const [contactName, setContactName] = useState(user?.name || '');
  const [contactPhone, setContactPhone] = useState(user?.phone || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [urgent, setUrgent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!serviceType || !propertyAddress || !description || !contactName || !contactPhone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Quote Request Submitted',
        'We will review your request and send you a detailed quote within 24-48 hours.',
        [{ text: 'OK', onPress: () => {
          // Reset form
          setServiceType('');
          setPropertySize('');
          setPropertyAddress('');
          setBudgetRange('');
          setDescription('');
          setUrgent(false);
        }}]
      );
    }, 1500);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.text }]}>Request a Quote</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Get a detailed estimate for your landscaping project
          </Text>

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Service Details</Text>
          
          <TextInput
            label="Service Type *"
            value={serviceType}
            onChangeText={setServiceType}
            style={styles.input}
            mode="outlined"
            placeholder="e.g., Lawn Maintenance, Garden Design"
            left={<TextInput.Icon icon="landscape" />}
          />

          <TextInput
            label="Property Size (sq ft)"
            value={propertySize}
            onChangeText={setPropertySize}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            left={<TextInput.Icon icon="straighten" />}
          />

          <TextInput
            label="Property Address *"
            value={propertyAddress}
            onChangeText={setPropertyAddress}
            style={styles.input}
            mode="outlined"
            multiline
            left={<TextInput.Icon icon="location-on" />}
          />

          <Text style={[styles.label, { color: theme.colors.text }]}>Budget Range</Text>
          <SegmentedButtons
            value={budgetRange}
            onValueChange={setBudgetRange}
            buttons={BUDGET_RANGES}
            style={styles.segmentedButtons}
            multiSelect={false}
          />

          <TextInput
            label="Project Description *"
            value={description}
            onChangeText={setDescription}
            style={styles.textArea}
            mode="outlined"
            multiline
            numberOfLines={4}
            placeholder="Describe your project requirements, timeline, and any specific needs..."
            left={<TextInput.Icon icon="description" />}
          />

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contact Information</Text>

          <TextInput
            label="Contact Name *"
            value={contactName}
            onChangeText={setContactName}
            style={styles.input}
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Phone Number *"
            value={contactPhone}
            onChangeText={setContactPhone}
            style={styles.input}
            mode="outlined"
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
          />

          <TextInput
            label="Email Address"
            value={contactEmail}
            onChangeText={setContactEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            left={<TextInput.Icon icon="email" />}
          />

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={urgent ? 'checked' : 'unchecked'}
              onPress={() => setUrgent(!urgent)}
            />
            <Text style={[styles.checkboxLabel, { color: theme.colors.text }]}>
              This is an urgent request
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}>
            Request Quote
          </Button>

          <Text style={[styles.note, { color: theme.colors.textSecondary }]}>
            * Required fields. We typically respond within 24-48 hours.
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
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
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
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

export default RequestQuoteScreen; 