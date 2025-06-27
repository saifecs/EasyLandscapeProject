import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { theme } = useTheme();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setIsLoading(true);
    const result = await register({ name, email, password });
    setIsLoading(false);
    if (!result.success) {
      Alert.alert('Registration Failed', result.error);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}> 
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.text }]}>Create Account</Text>
          <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" />
          <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" keyboardType="email-address" />
          <TextInput label="Password" value={password} onChangeText={setPassword} style={styles.input} mode="outlined" secureTextEntry />
          <Button mode="contained" onPress={handleRegister} loading={isLoading} style={styles.button}>Register</Button>
          <View style={styles.loginRow}>
            <Text style={{ color: theme.colors.textSecondary }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={[styles.loginLink, { color: theme.colors.primary }]}> Sign In</Text></TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  card: { borderRadius: 16, elevation: 8 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { marginBottom: 16 },
  button: { marginTop: 8, borderRadius: 8 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  loginLink: { fontWeight: 'bold' },
});

export default RegisterScreen; 