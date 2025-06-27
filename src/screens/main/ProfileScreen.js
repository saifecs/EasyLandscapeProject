import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Card, Button, Avatar, List, Switch, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const ProfileScreen = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Profile Header */}
      <Card style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text
            size={80}
            label={user?.name?.charAt(0) || 'U'}
            style={{ backgroundColor: theme.colors.primary }}
            labelStyle={{ color: theme.colors.white }}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {user?.name || 'User Name'}
            </Text>
            <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
              {user?.email || 'user@example.com'}
            </Text>
            <Text style={[styles.userPhone, { color: theme.colors.textSecondary }]}>
              {user?.phone || '+1 (234) 567-8900'}
            </Text>
          </View>
          <Button
            mode="outlined"
            onPress={handleEditProfile}
            style={styles.editButton}>
            Edit
          </Button>
        </Card.Content>
      </Card>

      {/* Settings */}
      <Card style={[styles.settingsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings</Text>
          
          <List.Item
            title="Dark Mode"
            description="Toggle dark/light theme"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Push Notifications"
            description="Receive app notifications"
            left={(props) => <List.Icon {...props} icon="notifications" />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Email Updates"
            description="Receive email notifications"
            left={(props) => <List.Icon {...props} icon="email" />}
            right={() => (
              <Switch
                value={emailUpdates}
                onValueChange={setEmailUpdates}
                color={theme.colors.primary}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Account Actions */}
      <Card style={[styles.actionsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account</Text>
          
          <List.Item
            title="Payment Methods"
            description="Manage your payment options"
            left={(props) => <List.Icon {...props} icon="credit-card" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Payment Methods', 'Feature coming soon!')}
          />
          
          <Divider />
          
          <List.Item
            title="Service History"
            description="View your past services"
            left={(props) => <List.Icon {...props} icon="history" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Service History', 'Feature coming soon!')}
          />
          
          <Divider />
          
          <List.Item
            title="Help & Support"
            description="Get help and contact support"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Help & Support', 'Feature coming soon!')}
          />
          
          <Divider />
          
          <List.Item
            title="About"
            description="App version and information"
            left={(props) => <List.Icon {...props} icon="information" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('About', 'Landscape Pro v1.0.0\nProfessional Landscape Services App')}
          />
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <Button
        mode="outlined"
        onPress={handleLogout}
        style={[styles.logoutButton, { borderColor: theme.colors.error }]}
        labelStyle={{ color: theme.colors.error }}>
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
  },
  editButton: {
    marginTop: 8,
  },
  settingsCard: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  actionsCard: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logoutButton: {
    borderRadius: 8,
    marginTop: 8,
  },
});

export default ProfileScreen; 