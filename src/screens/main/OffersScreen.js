import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const OFFERS = [
  {
    id: '1',
    title: 'Spring Cleanup Special',
    description: 'Get 20% off on all spring cleanup services',
    discount: '20% OFF',
    validUntil: '2024-03-31',
    code: 'SPRING20',
  },
  {
    id: '2',
    title: 'New Customer Discount',
    description: 'First-time customers get 15% off any service',
    discount: '15% OFF',
    validUntil: '2024-12-31',
    code: 'NEW15',
  },
  {
    id: '3',
    title: 'Bundle Package',
    description: 'Book 3 services together and save 25%',
    discount: '25% OFF',
    validUntil: '2024-06-30',
    code: 'BUNDLE25',
  },
];

const OffersScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const handleUseOffer = (offer) => {
    // Navigate to booking with offer code
    navigation.navigate('Book', { offerCode: offer.code });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Special Offers</Text>
      
      {OFFERS.map((offer) => (
        <Card key={offer.id} style={[styles.offerCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.offerHeader}>
              <View style={styles.offerInfo}>
                <Text style={[styles.offerTitle, { color: theme.colors.text }]}>
                  {offer.title}
                </Text>
                <Text style={[styles.offerDescription, { color: theme.colors.textSecondary }]}>
                  {offer.description}
                </Text>
                <Text style={[styles.validUntil, { color: theme.colors.textSecondary }]}>
                  Valid until: {offer.validUntil}
                </Text>
              </View>
              <View style={[styles.discountBadge, { backgroundColor: theme.colors.secondary }]}>
                <Text style={styles.discountText}>{offer.discount}</Text>
              </View>
            </View>
            
            <View style={styles.offerActions}>
              <Chip style={styles.codeChip}>
                <Text style={[styles.codeText, { color: theme.colors.primary }]}>
                  Code: {offer.code}
                </Text>
              </Chip>
              <Button
                mode="contained"
                onPress={() => handleUseOffer(offer)}
                style={[styles.useButton, { backgroundColor: theme.colors.primary }]}>
                Use Offer
              </Button>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  offerCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  offerInfo: {
    flex: 1,
    marginRight: 12,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  validUntil: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  discountBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  offerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeChip: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  codeText: {
    fontWeight: '600',
  },
  useButton: {
    borderRadius: 8,
  },
});

export default OffersScreen; 