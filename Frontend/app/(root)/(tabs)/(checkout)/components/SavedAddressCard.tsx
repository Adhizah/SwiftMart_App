import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Trash2 } from 'lucide-react-native';

type SavedAddress = {
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

type SavedAddressCardProps = {
  address: SavedAddress;
  onEdit?: () => void;
  onDelete?: () => void;
  isSelected?: boolean;
  onPress?: () => void;
};

const SavedAddressCard = ({ address, onEdit, onDelete, isSelected, onPress }: SavedAddressCardProps) => {
  const handleDeletePress = () => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: onDelete }
      ]
    );
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
        style={{
          borderRadius: 36,
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? '#F9B023' : '#E5E7EB',
          width: '96%',
          alignSelf: 'center',
          marginTop: 24,
          marginBottom: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
          backgroundColor: '#fff',
          padding: 18,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text className="text-BodyBold font-Manrope text-text">
            {address.name}
            <Text className="text-BodyRegular font-Manrope text-neutral-60">  {address.phone}</Text>
          </Text>
          {address.zipCode && (
            <Text className="text-BodyRegular font-Manrope text-neutral-60" style={{ marginTop: 2 }}>
              ZIP: {address.zipCode}
            </Text>
          )}
          <Text className="text-BodyRegular font-Manrope text-text" style={{ marginTop: 2 }}>
            {address.street}, {address.city}
          </Text>
          <Text className="text-BodyRegular font-Manrope text-text" style={{ marginTop: 2 }}>
            {address.region}, {address.country}
          </Text>
          {address.isDefault && (
            <View className="mt-2 bg-primary/10 self-start px-2 py-1 rounded-full">
              <Text className="text-primary text-sm">Default Address</Text>
            </View>
          )}
          <TouchableOpacity onPress={onEdit}>
            <Text className="text-primary mt-1">Edit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 12,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: '#156651',
              backgroundColor: '#F6F6F6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../../../../../assets/images/saved-address.png')}
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
            />
          </View>
          {/* Trash icon below the image */}
          <TouchableOpacity onPress={handleDeletePress} style={{ marginTop: 6 }}>
            <Trash2 size={22} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SavedAddressCard;