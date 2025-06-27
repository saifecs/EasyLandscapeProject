import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, List, Badge, Divider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'service',
    title: 'Service Scheduled',
    message: 'Your lawn maintenance service is scheduled for tomorrow at 9:00 AM',
    time: '2 hours ago',
    read: false,
    icon: 'calendar-check',
  },
  {
    id: '2',
    type: 'offer',
    title: 'Special Offer',
    message: 'Get 20% off on spring cleanup services. Limited time offer!',
    time: '1 day ago',
    read: false,
    icon: 'local-offer',
  },
  {
    id: '3',
    type: 'service',
    title: 'Service Completed',
    message: 'Your tree trimming service has been completed. Please rate your experience.',
    time: '2 days ago',
    read: true,
    icon: 'check-circle',
  },
  {
    id: '4',
    type: 'system',
    title: 'Payment Received',
    message: 'Payment of $150 for lawn maintenance has been received. Thank you!',
    time: '3 days ago',
    read: true,
    icon: 'payment',
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Service Reminder',
    message: 'Don\'t forget your upcoming garden design consultation on Friday.',
    time: '1 week ago',
    read: true,
    icon: 'notifications',
  },
];

const NotificationsScreen = () => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'service':
        return theme.colors.primary;
      case 'offer':
        return theme.colors.secondary;
      case 'system':
        return theme.colors.info;
      case 'reminder':
        return theme.colors.warning;
      default:
        return theme.colors.gray;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Notifications</Text>
        {unreadCount > 0 && (
          <Button
            mode="text"
            onPress={markAllAsRead}
            style={styles.markAllButton}>
            Mark all as read
          </Button>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {notifications.length === 0 ? (
          <Card style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.emptyContent}>
              <Icon name="notifications-off" size={64} color={theme.colors.gray} />
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                No notifications yet
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
                You'll see service updates, offers, and important messages here
              </Text>
            </Card.Content>
          </Card>
        ) : (
          notifications.map((notification, index) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => markAsRead(notification.id)}
              activeOpacity={0.7}>
              <Card 
                style={[
                  styles.notificationCard, 
                  { 
                    backgroundColor: theme.colors.surface,
                    opacity: notification.read ? 0.7 : 1,
                  }
                ]}>
                <Card.Content style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <View style={[
                      styles.iconContainer, 
                      { backgroundColor: getNotificationColor(notification.type) }
                    ]}>
                      <Icon 
                        name={notification.icon} 
                        size={20} 
                        color={theme.colors.white} 
                      />
                    </View>
                    <View style={styles.notificationInfo}>
                      <Text style={[styles.notificationTitle, { color: theme.colors.text }]}>
                        {notification.title}
                      </Text>
                      <Text style={[styles.notificationTime, { color: theme.colors.textSecondary }]}>
                        {notification.time}
                      </Text>
                    </View>
                    {!notification.read && (
                      <Badge style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]} />
                    )}
                  </View>
                  <Text style={[styles.notificationMessage, { color: theme.colors.textSecondary }]}>
                    {notification.message}
                  </Text>
                </Card.Content>
              </Card>
              {index < notifications.length - 1 && (
                <Divider style={styles.divider} />
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  markAllButton: {
    marginLeft: 'auto',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationCard: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 8,
  },
  notificationContent: {
    paddingVertical: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 52,
  },
  divider: {
    marginVertical: 4,
  },
  emptyCard: {
    borderRadius: 16,
    elevation: 4,
    marginTop: 32,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default NotificationsScreen; 