import { View, Text, StyleSheet } from 'react-native';

/**
 * Home Screen - Story 1.1 "Hello World" Implementation
 *
 * This is a minimal home screen to verify the Expo app runs successfully.
 * This screen will be replaced with authentication flow in Story 1.2 and
 * the conversations list in Story 1.3.
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Text style={styles.subtitle}>Comm Messaging App</Text>
      <Text style={styles.description}>
        Expo Router is working! 🎉
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>✅ Expo SDK 54 installed</Text>
        <Text style={styles.infoText}>✅ React Native 0.81.5 running</Text>
        <Text style={styles.infoText}>✅ TypeScript configured</Text>
        <Text style={styles.infoText}>✅ Firebase SDK ready</Text>
        <Text style={styles.infoText}>✅ Expo Router 6 active</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f4511e',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
});
