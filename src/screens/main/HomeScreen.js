import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Card, Button, Avatar, Chip, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingServices, setUpcomingServices] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  const [quickStats, setQuickStats] = useState({});
  
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    // Simulate loading data
    setUpcomingServices([
      {
        id: '1',
        type: 'Lawn Maintenance',
        date: '2024-01-15',
        time: '09:00 AM',
        status: 'scheduled',
        address: '123 Main St, City, State',
      },
      {
        id: '2',
        type: 'Tree Trimming',
        date: '2024-01-18',
        time: '02:00 PM',
        status: 'scheduled',
        address: '123 Main St, City, State',
      },
    ]);

    setRecentServices([
      {
        id: '3',
        type: 'Garden Design',
        date: '2024-01-10',
        status: 'completed',
        rating: 5,
        amount: 450,
      },
      {
        id: '4',
        type: 'Irrigation Repair',
        date: '2024-01-08',
        status: 'completed',
        rating: 4,
        amount: 180,
      },
    ]);

    setQuickStats({
      totalServices: 24,
      totalSpent: 2840,
      averageRating: 4.8,
      upcomingServices: 2,
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'book':
        navigation.navigate('Book');
        break;
      case 'services':
        navigation.navigate('Services');
        break;
      case 'history':
        navigation.navigate('History');
        break;
      case 'offers':
        navigation.navigate('Offers');
        break;
      case 'serviceCall':
        navigation.navigate('ServiceCall');
        break;
      case 'quote':
        navigation.navigate('RequestQuote');
        break;
      case 'payment':
        navigation.navigate('Payment');
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return theme.colors.info;
      case 'completed':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.gray;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        
        {/* Header Section */}
        <LinearGradient
          colors={theme.colors.gradient.primary}
          style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Avatar.Text
                size={50}
                label={user?.name?.charAt(0) || 'U'}
                style={{ backgroundColor: theme.colors.white }}
                labelStyle={{ color: theme.colors.primary }}
              />
              <View style={styles.userText}>
                <Text style={styles.greeting}>Good morning!</Text>
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              style={styles.notificationButton}>
              <Icon name="notifications" size={24} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.statsContent}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                  {quickStats.totalServices}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                  Total Services
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: theme.colors.secondary }]}>
                  ${quickStats.totalSpent}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                  Total Spent
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: theme.colors.success }]}>
                  {quickStats.averageRating}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                  Avg Rating
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {[
              { icon: 'add-circle', label: 'Book Service', action: 'book', color: theme.colors.primary },
              { icon: 'landscape', label: 'Browse Services', action: 'services', color: theme.colors.secondary },
              { icon: 'history', label: 'Past Services', action: 'history', color: theme.colors.info },
              { icon: 'local-offer', label: 'Offers', action: 'offers', color: theme.colors.warning },
              { icon: 'phone', label: 'Service Call', action: 'serviceCall', color: theme.colors.success },
              { icon: 'description', label: 'Request Quote', action: 'quote', color: theme.colors.error },
              { icon: 'payment', label: 'Make Payment', action: 'payment', color: theme.colors.primary },
              { icon: 'person', label: 'Profile', action: 'profile', color: theme.colors.secondary },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickActionItem, { backgroundColor: theme.colors.surface }]}
                onPress={() => handleQuickAction(item.action)}>
                <View style={[styles.actionIcon, { backgroundColor: item.color }]}>
                  <Icon name={item.icon} size={24} color={theme.colors.white} />
                </View>
                <Text style={[styles.actionLabel, { color: theme.colors.text }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Upcoming Services
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          {upcomingServices.map((service) => (
            <Card
              key={service.id}
              style={[styles.serviceCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => navigation.navigate('History')}>
              <Card.Content style={styles.serviceCardContent}>
                <View style={styles.serviceInfo}>
                  <Text style={[styles.serviceType, { color: theme.colors.text }]}>
                    {service.type}
                  </Text>
                  <Text style={[styles.serviceDate, { color: theme.colors.textSecondary }]}>
                    {service.date} at {service.time}
                  </Text>
                  <Text style={[styles.serviceAddress, { color: theme.colors.textSecondary }]}>
                    {service.address}
                  </Text>
                </View>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getStatusColor(service.status) }}
                  style={{ borderColor: getStatusColor(service.status) }}>
                  {getStatusText(service.status)}
                </Chip>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Recent Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Recent Services
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          {recentServices.map((service) => (
            <Card
              key={service.id}
              style={[styles.serviceCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => navigation.navigate('History')}>
              <Card.Content style={styles.serviceCardContent}>
                <View style={styles.serviceInfo}>
                  <Text style={[styles.serviceType, { color: theme.colors.text }]}>
                    {service.type}
                  </Text>
                  <Text style={[styles.serviceDate, { color: theme.colors.textSecondary }]}>
                    {service.date}
                  </Text>
                  <View style={styles.serviceRating}>
                    <Icon name="star" size={16} color={theme.colors.warning} />
                    <Text style={[styles.ratingText, { color: theme.colors.textSecondary }]}>
                      {service.rating}/5
                    </Text>
                  </View>
                </View>
                <View style={styles.serviceAmount}>
                  <Text style={[styles.amountText, { color: theme.colors.primary }]}>
                    ${service.amount}
                  </Text>
                  <Chip
                    mode="outlined"
                    textStyle={{ color: getStatusColor(service.status) }}
                    style={{ borderColor: getStatusColor(service.status) }}>
                    {getStatusText(service.status)}
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Special Offers */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Special Offers
          </Text>
          <Card style={[styles.offerCard, { backgroundColor: theme.colors.secondaryLight }]}>
            <Card.Content style={styles.offerContent}>
              <View style={styles.offerInfo}>
                <Text style={styles.offerTitle}>Spring Cleanup Special</Text>
                <Text style={styles.offerDescription}>
                  Get 20% off on all spring cleanup services. Limited time offer!
                </Text>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('Offers')}
                  style={styles.offerButton}>
                  View Offer
                </Button>
              </View>
              <Icon name="local-offer" size={60} color={theme.colors.secondary} />
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="add"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('Book')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerGradient: {
    padding: 20,
    paddingTop: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationButton: {
    padding: 8,
  },
  statsContainer: {
    margin: 20,
    marginTop: -30,
  },
  statsCard: {
    borderRadius: 12,
    elevation: 4,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  serviceCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  serviceCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDate: {
    fontSize: 14,
    marginBottom: 2,
  },
  serviceAddress: {
    fontSize: 12,
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  serviceAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  offerCard: {
    borderRadius: 12,
    elevation: 2,
  },
  offerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerInfo: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    color: '#E65100',
    marginBottom: 12,
  },
  offerButton: {
    backgroundColor: '#E65100',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen; 