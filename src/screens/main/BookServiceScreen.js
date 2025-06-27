import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card, HelperText } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';

const BookServiceScreen = () => {
  const { theme } = useTheme();
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBook = () => {
    if (!service || !date || !time) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Service booked successfully!');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}> 
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.text }]}>Book a Service</Text>
          <TextInput label="Service" value={service} onChangeText={setService} style={styles.input} mode="outlined" />
          <TextInput label="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} mode="outlined" />
          <TextInput label="Time (e.g. 09:00 AM)" value={time} onChangeText={setTime} style={styles.input} mode="outlined" />
          <Button mode="contained" onPress={handleBook} style={styles.button}>Book</Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  card: { borderRadius: 16, elevation: 8 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { marginBottom: 16 },
  button: { marginTop: 8, borderRadius: 8 },
});

export default BookServiceScreen; 