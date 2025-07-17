import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

type Address = {
  country: string;
  countryCode: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  zipCode: string;
  isDefault: boolean;
  id?: string;
};

type AddressCardProps = {
  address?: Address;
  onEdit?: () => void;
};

export const AddressCard = ({ address, onEdit }: AddressCardProps) => {
  console.log('AddressCard details:', {
    name: address?.name,
    zipCode: address?.zipCode,
    fullAddress: address
  });

  if (!address) {
    return (
      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-gray-500">No address selected</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onEdit}>
      <View
        className="bg-white rounded-lg p-4 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.18,
          shadowRadius: 16,
          elevation: 12,
        }}
      >
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold">Delivery Address</Text>
          <TouchableOpacity onPress={onEdit}>
            <Text className="text-primary text-base">Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View>
          {/* Contact and ZIP Code */}
          <View className="mb-3">
            <View className="flex-row justify-between items-start mb-1">
              <Text className="text-lg font-bold flex-1">{address.name || 'No name provided'}</Text>
              {address.zipCode && (
                <View className="bg-gray-100 px-2 py-1 rounded">
                  <Text className="text-sm font-medium">ZIP: {address.zipCode}</Text>
                </View>
              )}
            </View>
            <Text className="text-base text-gray-600">{address.phone}</Text>
          </View>

          {/* Address Details */}
          <View className="border-t border-gray-200 pt-3">
            <Text className="text-base mb-1">{address.street}</Text>
            <Text className="text-base mb-1">
              {address.city}
              {address.region ? `, ${address.region}` : ''}
            </Text>
            <Text className="text-base text-gray-600">{address.country}</Text>
          </View>
          
          {/* Default Badge */}
          {address.isDefault && (
            <View className="mt-3 bg-primary/10 self-start px-2 py-1 rounded-full">
              <Text className="text-primary text-sm">Default Address</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddressCard;