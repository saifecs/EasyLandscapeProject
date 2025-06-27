import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';

const PAST_SERVICES = [
  { id: '1', name: 'Lawn Maintenance', date: '2024-01-10', status: 'Completed' },
  { id: '2', name: 'Tree Trimming', date: '2024-01-05', status: 'Completed' },
  { id: '3', name: 'Garden Design', date: '2023-12-20', status: 'Completed' },
];

const PastServicesScreen = () => {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Text style={[styles.title, { color: theme.colors.text }]}>Past Services</Text>
      {PAST_SERVICES.map(service => (
        <Card key={service.id} style={[styles.card, { backgroundColor: theme.colors.surface }]}> 
          <Card.Title title={service.name} subtitle={service.date} />
          <Card.Content>
            <Chip style={styles.chip}>{service.status}</Chip>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { marginBottom: 16, borderRadius: 12 },
  chip: { alignSelf: 'flex-start', marginTop: 8 },
});

export default PastServicesScreen; 