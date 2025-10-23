import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Root Layout for Expo Router
 *
 * This is the top-level layout component that wraps all screens.
 * For Story 1.1 (Project Setup), this is a minimal implementation.
 * Auth checks and providers will be added in Story 1.2 (Authentication).
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Comm',
          }}
        />
      </Stack>
    </>
  );
}
