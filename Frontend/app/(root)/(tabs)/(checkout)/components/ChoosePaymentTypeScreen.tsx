import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const visaMastercardIcon = require('../../../../../assets/images/visa-mastercard.png');
const mobileMoneyIcon = require('../../../../../assets/images/mobile-money.png');

type ChoosePaymentTypeScreenProps = {
  onSelectType: (type: 'card' | 'mobile') => void;
  onCancel: () => void;
};

const ChoosePaymentTypeScreen: React.FC<ChoosePaymentTypeScreenProps> = ({ onSelectType, onCancel }) => {
  const router = useRouter();
  const [selected, setSelected] = useState<'card' | 'mobile' | null>(null);

  return (
    <View className="flex-1 bg-white">
      

      {/* Payment Option Cards */}
      <View className="px-4">
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 18,
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 6,
            borderWidth: 0, // No border, even when selected
            borderColor: 'transparent',
            minHeight: 100, // Increased height
          }}
          onPress={() => setSelected('card')}
        >
          <Image source={visaMastercardIcon} style={{ width: 48, height: 32, marginRight: 16 }} />
          <Text style={{ flex: 1, fontFamily: 'Manrope-Bold', fontSize: 18 }}>VISA/MasterCard</Text>
          {/* Square Checkbox */}
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: '#156651',
              backgroundColor: selected === 'card' ? '#156651' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selected === 'card' && (
              // White checkmark
              <View
                style={{
                  width: 10,
                  height: 6,
                  borderLeftWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: '#fff',
                  transform: [{ rotate: '-45deg' }],
                }}
              />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 18,
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 6,
            borderWidth: 0, // No border, even when selected
            borderColor: 'transparent',
            minHeight: 100, // Increased height
          }}
          onPress={() => setSelected('mobile')}
        >
          <Image source={mobileMoneyIcon} style={{ width: 48, height: 32, marginRight: 16 }} />
          <Text style={{ flex: 1, fontFamily: 'Manrope-Bold', fontSize: 18 }}>Mobile Money</Text>
          {/* Square Checkbox for Mobile Money */}
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: '#156651',
              backgroundColor: selected === 'mobile' ? '#156651' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selected === 'mobile' && (
              // White checkmark
              <View
                style={{
                  width: 10,
                  height: 6,
                  borderLeftWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: '#fff',
                  transform: [{ rotate: '-45deg' }],
                }}
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Continue Button */}
        {selected ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#156651',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              marginTop: 48,
            }}
            onPress={() => {
              if (selected === 'card') onSelectType('card');
              if (selected === 'mobile') onSelectType('mobile');
            }}
          >
            <Text style={{ color: '#fff', fontFamily: 'Manrope-Bold', fontSize: 16 }}>
              Continue
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ alignItems: 'center', marginTop: 48 }}>
            <Text style={{ color: '#156651', fontFamily: 'Manrope-Bold', fontSize: 16 }}>
              Continue
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChoosePaymentTypeScreen;