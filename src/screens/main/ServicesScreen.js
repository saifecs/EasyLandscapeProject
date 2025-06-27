import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';

const SERVICES = [
  { id: '1', name: 'Lawn Maintenance', description: 'Regular mowing, edging, and care.' },
  { id: '2', name: 'Tree Trimming', description: 'Professional tree and shrub trimming.' },
  { id: '3', name: 'Garden Design', description: 'Custom garden planning and installation.' },
  { id: '4', name: 'Irrigation Repair', description: 'Fix and maintain irrigation systems.' },
];

const ServicesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Text style={[styles.title, { color: theme.colors.text }]}>Available Services</Text>
      {SERVICES.map(service => (
        <Card key={service.id} style={[styles.card, { backgroundColor: theme.colors.surface }]}> 
          <Card.Title title={service.name} />
          <Card.Content><Text style={{ color: theme.colors.textSecondary }}>{service.description}</Text></Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => navigation.navigate('Book', { serviceId: service.id })}>Book</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { marginBottom: 16, borderRadius: 12 },
});

export default ServicesScreen; 