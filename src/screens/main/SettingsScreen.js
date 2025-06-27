import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, List, Switch, Divider, Button, Slider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear the app cache? This will free up storage space.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => Alert.alert('Success', 'Cache cleared successfully!') },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Your data will be exported to your email address.');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Account Deleted', 'Your account has been deleted.') },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Appearance Settings */}
      <Card style={[styles.settingsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
          
          <List.Item
            title="Dark Mode"
            description="Toggle between light and dark themes"
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
            title="Font Size"
            description="Adjust the text size in the app"
            left={(props) => <List.Icon {...props} icon="format-size" />}
          />
          <View style={styles.sliderContainer}>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              minimumValue={12}
              maximumValue={20}
              step={1}
              style={styles.slider}
              thumbStyle={{ backgroundColor: theme.colors.primary }}
              trackStyle={{ backgroundColor: theme.colors.lightGray }}
            />
            <Text style={[styles.sliderValue, { color: theme.colors.textSecondary }]}>
              {Math.round(fontSize)}px
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Notification Settings */}
      <Card style={[styles.settingsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notifications</Text>
          
          <List.Item
            title="Push Notifications"
            description="Receive notifications about services and updates"
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
            description="Receive updates via email"
            left={(props) => <List.Icon {...props} icon="email" />}
            right={() => (
              <Switch
                value={emailUpdates}
                onValueChange={setEmailUpdates}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="SMS Updates"
            description="Receive updates via text message"
            left={(props) => <List.Icon {...props} icon="sms" />}
            right={() => (
              <Switch
                value={smsUpdates}
                onValueChange={setSmsUpdates}
                color={theme.colors.primary}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Privacy & Security */}
      <Card style={[styles.settingsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy & Security</Text>
          
          <List.Item
            title="Location Services"
            description="Allow app to access your location for better service"
            left={(props) => <List.Icon {...props} icon="location-on" />}
            right={() => (
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Biometric Login"
            description="Use fingerprint or face ID to login"
            left={(props) => <List.Icon {...props} icon="fingerprint" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Biometric Login', 'Feature coming soon!')}
          />
          
          <Divider />
          
          <List.Item
            title="Two-Factor Authentication"
            description="Add an extra layer of security"
            left={(props) => <List.Icon {...props} icon="security" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('2FA', 'Feature coming soon!')}
          />
        </Card.Content>
      </Card>

      {/* Data & Storage */}
      <Card style={[styles.settingsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Data & Storage</Text>
          
          <List.Item
            title="Auto Refresh"
            description="Automatically refresh data when app opens"
            left={(props) => <List.Icon {...props} icon="refresh" />}
            right={() => (
              <Switch
                value={autoRefresh}
                onValueChange={setAutoRefresh}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Clear Cache"
            description="Free up storage space"
            left={(props) => <List.Icon {...props} icon="clear-all" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleClearCache}
          />
          
          <Divider />
          
          <List.Item
            title="Export Data"
            description="Download your data as a backup"
            left={(props) => <List.Icon {...props} icon="file-download" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleExportData}
          />
        </Card.Content>
      </Card>

      {/* Account Actions */}
      <Card style={[styles.settingsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account</Text>
          
          <List.Item
            title="Change Password"
            description="Update your account password"
            left={(props) => <List.Icon {...props} icon="lock" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Change Password', 'Feature coming soon!')}
          />
          
          <Divider />
          
          <List.Item
            title="Privacy Policy"
            description="Read our privacy policy"
            left={(props) => <List.Icon {...props} icon="policy" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Privacy Policy', 'Feature coming soon!')}
          />
          
          <Divider />
          
          <List.Item
            title="Terms of Service"
            description="Read our terms of service"
            left={(props) => <List.Icon {...props} icon="description" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Terms of Service', 'Feature coming soon!')}
          />
          
          <Divider />
          
          <List.Item
            title="Delete Account"
            description="Permanently delete your account"
            left={(props) => <List.Icon {...props} icon="delete-forever" color={theme.colors.error} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleDeleteAccount}
            titleStyle={{ color: theme.colors.error }}
          />
        </Card.Content>
      </Card>

      {/* App Info */}
      <Card style={[styles.settingsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>App Information</Text>
          
          <List.Item
            title="Version"
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="info" />}
          />
          
          <Divider />
          
          <List.Item
            title="Build Number"
            description="2024.01.001"
            left={(props) => <List.Icon {...props} icon="build" />}
          />
          
          <Divider />
          
          <List.Item
            title="Developer"
            description="Landscape Pro Team"
            left={(props) => <List.Icon {...props} icon="developer-mode" />}
          />
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
  settingsCard: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sliderContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  slider: {
    height: 40,
  },
  sliderValue: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
  },
});

export default SettingsScreen; 