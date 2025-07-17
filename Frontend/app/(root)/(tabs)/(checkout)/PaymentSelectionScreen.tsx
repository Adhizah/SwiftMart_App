import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import SavedPaymentCard from './components/SavedPaymentCard';
import PaymentFormScreen from './components/PaymentFormScreen';
// import ChoosePaymentTypeScreen from './components/ChoosePaymentTypeScreen';
import { PlusIcon } from 'react-native-heroicons/outline';
import ChoosePaymentTypeScreen from './components/ChoosePaymentTypeScreen';
import { useCheckout } from '../../../context/_CheckoutContext';

type PaymentMethod = {
  id: string;
  type: 'VISA' | 'MasterCard' | 'VISA/MasterCard' | 'MobileMoney';
  last4: string;
  network?: 'MTN' | 'Vodafone' | 'AirtelTigo';
  isDefault?: boolean;
  phone?: string; // Add phone as optional for MobileMoney
};

const PaymentSelectionScreen = () => {
  const router = useRouter();
  const { setPaymentMethod } = useCheckout();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'card' | 'mobile'>('card');
  const [showChooser, setShowChooser] = useState(false);

  const handleAddPayment = (type: 'card' | 'mobile') => {
    setFormType(type);
    setShowForm(true);
  };

  const handleSavePayment = (newMethod: PaymentMethod) => {
    setPaymentMethods([
      ...paymentMethods,
      {
        ...newMethod,
        id: Date.now().toString(),
        phone: newMethod.type === 'MobileMoney' ? newMethod.phone : undefined,
        network: newMethod.type === 'MobileMoney' ? newMethod.network : undefined,
        last4: newMethod.type === 'MobileMoney'
          ? newMethod.phone ?? ''
          : newMethod.last4 ?? '',
      }
    ]);
    
    // Save to context
    const paymentForCheckout = {
      type: newMethod.type,
      last4: newMethod.type === 'MobileMoney'
        ? newMethod.phone ?? ''
        : newMethod.last4 ?? '',
      fullNumber: newMethod.type !== 'MobileMoney' ? (newMethod as any).number : undefined,
      network: newMethod.type === 'MobileMoney' ? newMethod.network : undefined,
      phone: newMethod.type === 'MobileMoney' ? newMethod.phone : undefined,
      expiry: newMethod.type !== 'MobileMoney' ? (newMethod as any).expiry : undefined,
      cvv: newMethod.type !== 'MobileMoney' ? (newMethod as any).cvv : undefined,
    };
    setPaymentMethod(paymentForCheckout);
    
    setShowForm(false);
    router.push('/(root)/(tabs)/(checkout)/CheckoutScreen');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Back Button */}
      <View className="flex-row items-center p-4 mt-16">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => {
            if (showForm) {
              setShowForm(false);
            } else if (showChooser) {
              setShowChooser(false);
            } else {
              router.back();
            }
          }}
        >
          <ChevronLeft size={24} color="#156651" />
          <Text className="text-BodyRegular font-Manrope text-primary ml-2">Back</Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Centered Heading */}
      <View className="items-center mb-6">
        <Text className="text-Heading3 font-Manrope text-text">
          {showForm
            ? formType === 'mobile'
              ? 'Add Mobile Money'
              : 'Add New Card'
            : 'Payment Method'}
        </Text>
      </View>

      {showChooser ? (
        <ChoosePaymentTypeScreen
          onSelectType={(type) => {
            setFormType(type);
            setShowChooser(false);
            setShowForm(true);
          }}
          onCancel={() => setShowChooser(false)}
        />
      ) : showForm ? (
        <PaymentFormScreen
          type={formType}
          onSave={handleSavePayment}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <ScrollView className="px-4 pb-4 flex-1">
          {paymentMethods.length > 0 ? (
            <View className="mt-4">
              {paymentMethods.map((method) => (
                <SavedPaymentCard 
                  key={method.id}
                  method={method}
                  onEdit={() => {
                    setFormType(method.type === 'MobileMoney' ? 'mobile' : 'card');
                    setShowForm(true);
                  }}
                />
              ))}
            </View>
          ) : (
            <View className="flex-1 justify-center items-center py-16">
              <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-6">
                No saved payment method.
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#156651',
                  borderRadius: 12,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: 32, // space below the text
                }}
                onPress={() => setShowChooser(true)}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: '#156651',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    backgroundColor: '#fff',
                  }}
                >
                  <PlusIcon color="#156651" size={18} />
                </View>
                <Text style={{ color: '#156651', fontFamily: 'Manrope-Regular', fontSize: 16 }}>
                  Add Payment Option
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default PaymentSelectionScreen;