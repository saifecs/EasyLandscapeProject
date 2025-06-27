import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const { theme } = useTheme();

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    setIsLoading(true);
    const result = await forgotPassword(email);
    setIsLoading(false);
    if (result.success) {
      Alert.alert('Success', result.message);
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}> 
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.text }]}>Reset Password</Text>
          <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" keyboardType="email-address" />
          <Button mode="contained" onPress={handleReset} loading={isLoading} style={styles.button}>Reset Password</Button>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backToLogin}>
            <Text style={[styles.backToLoginText, { color: theme.colors.primary }]}>Back to Login</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  card: { borderRadius: 16, elevation: 8 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { marginBottom: 16 },
  button: { marginTop: 8, borderRadius: 8 },
  backToLogin: { marginTop: 16, alignItems: 'center' },
  backToLoginText: { fontWeight: 'bold' },
});

export default ForgotPasswordScreen; 