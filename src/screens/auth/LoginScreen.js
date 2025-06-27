import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { theme } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.error);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@example.com');
    setPassword('password');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <LinearGradient
            colors={theme.colors.gradient.primary}
            style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <Icon name="landscape" size={80} color={theme.colors.white} />
              <Text style={styles.appTitle}>Landscape Pro</Text>
              <Text style={styles.appSubtitle}>Professional Landscape Services</Text>
            </View>
          </LinearGradient>

          <Card style={[styles.loginCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.cardContent}>
              <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
                Welcome Back
              </Text>
              <Text style={[styles.subtitleText, { color: theme.colors.textSecondary }]}>
                Sign in to your account
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  left={<TextInput.Icon icon="email" />}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: theme.colors.primary,
                      background: theme.colors.surface,
                    },
                  }}
                />

                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: theme.colors.primary,
                      background: theme.colors.surface,
                    },
                  }}
                />

                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                  style={styles.forgotPasswordContainer}>
                  <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                <Button
                  mode="contained"
                  onPress={handleLogin}
                  loading={isLoading}
                  disabled={isLoading}
                  style={[styles.loginButton, { backgroundColor: theme.colors.primary }]}
                  contentStyle={styles.buttonContent}>
                  Sign In
                </Button>

                <Button
                  mode="outlined"
                  onPress={handleDemoLogin}
                  style={[styles.demoButton, { borderColor: theme.colors.secondary }]}
                  contentStyle={styles.buttonContent}
                  labelStyle={{ color: theme.colors.secondary }}>
                  Try Demo Account
                </Button>

                <View style={styles.dividerContainer}>
                  <View style={[styles.divider, { backgroundColor: theme.colors.lightGray }]} />
                  <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>
                    OR
                  </Text>
                  <View style={[styles.divider, { backgroundColor: theme.colors.lightGray }]} />
                </View>

                <View style={styles.registerContainer}>
                  <Text style={[styles.registerText, { color: theme.colors.textSecondary }]}>
                    Don't have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.registerLink, { color: theme.colors.primary }]}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 8,
  },
  loginCard: {
    margin: 20,
    marginTop: -30,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  demoButton: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen; 