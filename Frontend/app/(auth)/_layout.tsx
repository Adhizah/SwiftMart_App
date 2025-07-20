import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <View className='flex-1 font-Manrope  bg-white'>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} >
          <Stack.Screen name="GetStarted" />
            <Stack.Screen name="onboarding" />
          <Stack.Screen name="BuyerRegister" />
          <Stack.Screen name="SellerRegister1" />
          <Stack.Screen name="SellerRegister2" />
          <Stack.Screen name="Verification" />
          <Stack.Screen name="Login" />
          <Stack.Screen name="+not-found" />
          </Stack>
        
        </View>
  )
}

export default _layout