import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CountryPicker from './CountryPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddressScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const editMode = params.editMode === 'true';
  
  const [formData, setFormData] = useState({
    country: 'Ghana',
    countryCode: '+233', // <-- add this
    name: '',
    phone: '',
    street: '',
    city: '',
    region: '',
    zipCode: '',
    isDefault: false
  });

  // Load address data if in edit mode
  useEffect(() => {
    if (editMode && params.addressId) {
      // Fetch address data here or pass via params
      setFormData({
        country: 'Ghana',
        countryCode: '+233',
        name: 'Qad Media',
        phone: '+233.55.8970.004',
        street: 'GC-010-7322',
        city: 'Accra',
        region: 'Obama',
        zipCode: '00233',
        isDefault: true
      });
    }
  }, [editMode, params.addressId]);

  const handleSave = async () => {
    try {
      // Get existing addresses
      const existing = await AsyncStorage.getItem('addresses');
      const addresses = existing ? JSON.parse(existing) : [];

      // Create new address object
      const newAddress = {
        ...formData,
        code: formData.zipCode, // Map zipCode to code for compatibility
        id: Date.now().toString(), // unique id
      };

      // Add or update address
      let updatedAddresses;
      if (editMode && params.addressId) {
        updatedAddresses = addresses.map((addr: any) =>
          addr.id === params.addressId ? { ...newAddress, id: params.addressId } : addr
        );
      } else {
        updatedAddresses = [...addresses, newAddress];
      }

      // Save back to storage
      await AsyncStorage.setItem('addresses', JSON.stringify(updatedAddresses));

      // Navigate to Address Selection screen
      router.replace('/(checkout)/AddressSelectionScreen');
    } catch (e) {
      // Handle error (show toast, etc.)
      console.error('Failed to save address', e);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* Header */}
      <View className="flex-row items-center p-4 mt-16">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#156651" />
          <Text className="text-BodyRegular font-Manrope text-primary ml-2">Back</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center mb-6">
        <Text className="text-Heading3 font-Manrope text-text">
          {editMode ? 'Edit Address' : 'Add New Address'}
        </Text>
      </View>

      <ScrollView className="px-4 pt-4 pb-40" keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Country/Region */}
        <View className="mb-1">
          <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-1">
            Country/Region
          </Text>
          <CountryPicker
            selectedCountry={formData.country}
            onSelect={(country, code, flag) =>
              setFormData({ ...formData, country, countryCode: code })
            }
          />
        </View>

        {/* Contact Information */}
        <Text className="text-BodyBold font-Manrope text-neutral-80 mb-2">
          Contact Information
        </Text>
        
        <View className="mb-3">
          <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-1">
            Contact name*
          </Text>
          <TextInput
            className="border border-neutral-200 rounded-lg p-4 font-Manrope"
            placeholder="Enter contact name"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
          />
        </View>

        <View className="mb-3">
          <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-1">
            Phone number*
          </Text>
          <View className="flex-row">
            <View className="border border-neutral-200 rounded-l-lg p-4 justify-center w-20">
              <Text className="font-Manrope">{formData.countryCode}</Text>
            </View>
            <TextInput
              className="flex-1 border border-neutral-200 rounded-r-lg p-4 font-Manrope border-l-0"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />
          </View>
        </View>

        {/* Address */}
        <Text className="text-BodyBold font-Manrope text-neutral-80 mb-2">
          Address
        </Text>
        
        <View className="mb-3">
          <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-1">
            Street, house/apartment/unit*
          </Text>
          <TextInput
            className="border border-neutral-200 rounded-lg p-4 font-Manrope"
            placeholder="Enter street address"
            value={formData.street}
            onChangeText={(text) => setFormData({...formData, street: text})}
          />
        </View>

        <View className="mb-3">
          <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-1">
            City*
          </Text>
          <TextInput
            className="border border-neutral-200 rounded-lg p-4 font-Manrope"
            placeholder="Enter city"
            value={formData.city}
            onChangeText={(text) => setFormData({...formData, city: text})}
          />
        </View>

        <View className="mb-3">
          <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-1">
            State/Province*
          </Text>
          <TextInput
            className="border border-neutral-200 rounded-lg p-4 font-Manrope"
            placeholder="Enter state/province"
            value={formData.region}
            onChangeText={(text) => setFormData({...formData, region: text})}
          />
        </View>

        <View className="mb-4">
          <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-1">
            ZIP code*
          </Text>
          <TextInput
            className="border border-neutral-200 rounded-lg p-4 font-Manrope"
            placeholder="Enter ZIP code"
            keyboardType="numeric"
            value={formData.zipCode}
            onChangeText={(text) => setFormData({...formData, zipCode: text})}
          />
        </View>

        {/* Set as Default */}
        <TouchableOpacity
          className="flex-row items-center mb-6"
          onPress={() => setFormData({...formData, isDefault: !formData.isDefault})}
        >
          <View className={`w-5 h-5 rounded-full border-2 mr-3 ${
            formData.isDefault ? 'bg-primary border-primary' : 'border-neutral-400'
          }`}>
            {formData.isDefault && (
              <View className="w-2 h-2 rounded-full bg-white m-auto" />
            )}
          </View>
          <Text className="text-BodyRegular font-Manrope text-text">
            Set as default address
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Save Button */}
      <View className="p-4 bg-white border-t border-neutral-200">
        <TouchableOpacity
          className="bg-primary rounded-lg p-4 items-center"
          onPress={handleSave}
        >
          <Text className="text-BodyBold font-Manrope text-neutral-10">
            {editMode ? 'Update Address' : 'Save Address'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddAddressScreen;