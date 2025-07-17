import { Stack } from 'expo-router';
import { CheckoutProvider } from '../../../context/_CheckoutContext';

export default function Layout() {
  return (
    <CheckoutProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CheckoutProvider>
  );
}
