import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native';

// Image imports
import visaIcon from '../../../../../assets/images/visa.png';
import mastercardIcon from '../../../../../assets/images/mastercard.png';
import visaMastercardIcon from '../../../../../assets/images/visa-mastercard.png';
import mobileMoneyIcon from '../../../../../assets/images/mobile-money.png';
import mtnIcon from '../../../../../assets/images/mtn.png';
import vodafoneIcon from '../../../../../assets/images/vodafone.png';
import airteltigoIcon from '../../../../../assets/images/airteltigo.png';

type PaymentMethod = {
  id: string;
  type: 'VISA' | 'MasterCard' | 'VISA/MasterCard' | 'MobileMoney';
  last4: string;
  phone?: string; // <-- Add this line
  network?: 'MTN' | 'Vodafone' | 'AirtelTigo';
  isDefault?: boolean;
};

const SavedPaymentCard = ({ method, onEdit }: { method: PaymentMethod, onEdit?: () => void }) => {
  const getPaymentIcon = () => {
    if (method.type === 'VISA') return visaIcon;
    if (method.type === 'MasterCard') return mastercardIcon;
    if (method.type === 'VISA/MasterCard') return visaMastercardIcon;
    if (method.type === 'MobileMoney') {
      switch (method.network) {
        case 'MTN': return mtnIcon;
        case 'Vodafone': return vodafoneIcon;
        case 'AirtelTigo': return airteltigoIcon;
        default: return mobileMoneyIcon;
      }
    }
    return null;
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F4EDD8', // or your neutral-200
      }}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-row items-center">
          <Image 
            source={getPaymentIcon()} 
            className="w-12 h-8 mr-3" 
            resizeMode="contain"
          />
          <Text className="text-BodyBold font-Manrope text-text">
            {method.type === 'MobileMoney' 
              ? `${method.network} Mobile Money` 
              : method.type}
          </Text>
        </View>
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Text className="text-BodyRegular font-Manrope text-primary">Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Text className="text-BodyRegular font-Manrope text-text">
        {method.type === 'MobileMoney'
          ? method.phone // Show full phone number
          : `**** **** **** ${method.last4}`}
      </Text>
      
      {method.isDefault && (
        <View className="mt-2 pt-2 border-t border-neutral-100">
          <Text className="text-BodySmallRegular font-Manrope text-primary">
            Default Payment
          </Text>
        </View>
      )}
    </View>
  );
};

export default SavedPaymentCard;