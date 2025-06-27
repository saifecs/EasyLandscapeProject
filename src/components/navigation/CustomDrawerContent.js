import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Avatar, Divider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const CustomDrawerContent = (props) => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}> 
        <Avatar.Text
          size={60}
          label={user?.name?.charAt(0) || 'U'}
          style={{ backgroundColor: theme.colors.white }}
          labelStyle={{ color: theme.colors.primary }}
        />
        <Text style={[styles.userName, { color: theme.colors.white }]}>{user?.name || 'User'}</Text>
        <Text style={[styles.userEmail, { color: theme.colors.white, opacity: 0.8 }]}>{user?.email || 'user@example.com'}</Text>
      </View>
      <View style={styles.drawerList}>
        <DrawerItemList {...props} />
      </View>
      <Divider style={{ marginVertical: 8 }} />
      <Button
        mode="outlined"
        icon="logout"
        onPress={logout}
        style={[styles.logoutButton, { borderColor: theme.colors.error }]}
        labelStyle={{ color: theme.colors.error }}>
        Logout
      </Button>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  userEmail: {
    fontSize: 14,
    marginTop: 2,
  },
  drawerList: {
    flex: 1,
    paddingTop: 8,
  },
  logoutButton: {
    margin: 16,
    borderRadius: 8,
  },
});

export default CustomDrawerContent; 