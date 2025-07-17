import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';

type PaymentMethod = {
  type: string;
  last4: string;
};

type PaymentMethodCardProps = {
  paymentMethod?: PaymentMethod;
  onEdit?: () => void;
};

export const PaymentMethodCard = ({ paymentMethod, onEdit }: PaymentMethodCardProps) => {
  // Helper to mask card numbers
  const renderPaymentInfo = () => {
    if (!paymentMethod) return null;
    if (paymentMethod.type.toLowerCase().includes('mobile')) {
      // Show full phone number for mobile money
      return <Text className="text-base">{paymentMethod.last4}</Text>;
    } else {
      // Mask card numbers except last 4
      return <Text className="text-base">{paymentMethod.type} **** **** **** {paymentMethod.last4}</Text>;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onEdit}>
      <View
        className="bg-white rounded-lg p-4 mb-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.18,
          shadowRadius: 16,
          elevation: 12, // Android
        }}
      >
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold">Payment method</Text>
          {paymentMethod && (
            <TouchableOpacity onPress={onEdit}>
              <Text className="text-primary text-base">Edit</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {paymentMethod ? (
          <View className="mt-2">
            {renderPaymentInfo()}
          </View>
        ) : (
          <Text className="text-base text-gray-500 italic">No payment method has been chosen.</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};


export default PaymentMethodCard;