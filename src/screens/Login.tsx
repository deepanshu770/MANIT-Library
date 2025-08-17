import {
  Text,
  StatusBar,
  Pressable,
  TextInput,
  View,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { storage, StorageKeys } from '../services/storage.service';
import { userData } from '../assets/data/data';
import Container from '../components/Container';
const manitLogo = require('../assets/img/manit_logo.png');

const Login = () => {
  const { theme } = useUnistyles();
  const [scholarId, setScholarId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async () => {
    // In a real app, you would add authentication logic here
    console.log('sign in with ', { scholarId, password });

    storage.set(
      StorageKeys.USER,
      JSON.stringify({
        full_name: name,
        program_name: 'MCA',
        institute_email_id: 'example@gmail.com',
        phone_number: '9242592425',
        roll_no: scholarId,
        hostel: 'H9',
      }),
    );
    storage.set(StorageKeys.TOKEN, userData.token);
    console.log(storage.getString(StorageKeys.TOKEN));
  };

  return (
    <Container style={styles.container}>
      <StatusBar
        barStyle={
          UnistylesRuntime.themeName === 'dark'
            ? 'light-content'
            : 'dark-content'
        }
      />
    
        <View style={styles.card}>
          <Image style={styles.logo} resizeMode="contain" source={manitLogo} />
          <Text style={styles.title}>MANIT Library</Text>
          <Text style={styles.subtitle}>Welcome back, please sign in.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Firstname Surename"
              placeholderTextColor={theme.colors.placeholder}
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Scholar ID</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 24203031269"
              placeholderTextColor={theme.colors.placeholder}
              value={scholarId}
              onChangeText={setScholarId}
              autoCapitalize="none"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>

          <Pressable onPress={() => console.log('Forgot Password pressed')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </Pressable>
        </View>

    </Container>
  );
};

export default Login;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: rt.insets.top,
    transform: [
      {
        translateY: rt.insets.ime * -1,
      },
    ],
  },

  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: 12,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  // App title
  title: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  // Subtitle
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '400',
    color: theme.colors.subtleText,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  // Input fields container
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  // Input field label
  label: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: '600',
    color: theme.colors.subtleText,
    marginBottom: theme.spacing.sm,
  },
  // The text input itself
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.text,
  },
  // Login button
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  // Login button text
  buttonText: {
    color: theme.colors.primaryContrast,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
  },
  // "Forgot Password?" link
  forgotPassword: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.link,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: '500',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
    borderRadius: 12,
  },
}));
