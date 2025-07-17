import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AlignLeft, Calendar, Shield } from 'lucide-react-native'; // Update import
import { useRouter } from 'expo-router';
import { useCheckout } from '../../../../context/_CheckoutContext';

// Image imports
const visaIcon = require('../../../../../assets/images/visa.png');
const mastercardIcon = require('../../../../../assets/images/mastercard.png');
const visaMastercardIcon = require('../../../../../assets/images/visa-mastercard.png');
const mtnIcon = require('../../../../../assets/images/mtn.png');
const vodafoneIcon = require('../../../../../assets/images/vodafone.png');
const airteltigoIcon = require('../../../../../assets/images/airteltigo.png');

type PaymentFormProps = {
  type: 'card' | 'mobile';
  onSave: (data: any) => void;
  onCancel: () => void;
};

const PaymentFormScreen = ({ type, onSave, onCancel }: PaymentFormProps) => {
  const router = useRouter();
  const { setPaymentMethod } = useCheckout();
  const [card, setCard] = useState({
    type: 'VISA',
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [mobileMoney, setMobileMoney] = useState({
    network: 'MTN',
    phone: ''
  });

  // Function to format Ghanaian phone numbers
  const formatGhanaianPhoneNumber = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Handle different input formats
    let digits = cleaned;
    
    // If starts with +233, remove it
    if (digits.startsWith('233')) {
      digits = '0' + digits.slice(3);
    }
    
    // If doesn't start with 0, add it
    if (digits.length > 0 && !digits.startsWith('0')) {
      digits = '0' + digits;
    }
    
    // Limit to 10 digits (0 + 9 digits)
    digits = digits.slice(0, 10);
    
    // Format as XXX XXX XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }
  };

  // Function to validate phone number format for the selected network
  const validatePhoneNumberForNetwork = (phone: string, network: string) => {
    const cleaned = phone.replace(/\s+/g, '');
    
    switch (network) {
      case 'MTN':
        return /^0(24|25|53|54|55|59)\d{7}$/.test(cleaned);
      case 'Vodafone':
        return /^0(20|50|51|52|56)\d{7}$/.test(cleaned);
      case 'AirtelTigo':
        return /^0(26|27|28|57|58)\d{7}$/.test(cleaned);
      default:
        return false;
    }
  };

  // Function to validate card number using Luhn algorithm
  const validateCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s+/g, '').replace(/[^\d]/g, '');
    
    // Check if it's a valid length (13-19 digits)
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    
    // Luhn algorithm
    let sum = 0;
    let isEvenIndex = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      
      if (isEvenIndex) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEvenIndex = !isEvenIndex;
    }
    
    return sum % 10 === 0;
  };

  // Function to validate expiry date
  const validateExpiryDate = (expiry: string) => {
    if (!expiry || expiry.length !== 5) return false;
    
    const [month, year] = expiry.split('-');
    const monthNum = parseInt(month);
    const yearNum = parseInt('20' + year);
    
    // Check if month is valid
    if (monthNum < 1 || monthNum > 12) return false;
    
    // Check if date is not in the past
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return false;
    }
    
    return true;
  };

  // Function to validate CVV
  const validateCVV = (cvv: string, cardType: string) => {
    if (!cvv) return false;
    
    // American Express uses 4 digits, others use 3
    const expectedLength = cardType === 'AMEX' ? 4 : 3;
    return cvv.length === expectedLength && /^\d+$/.test(cvv);
  };

  // Function to detect card type from number
  const detectCardType = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s+/g, '').replace(/[^\d]/g, '');
    
    if (cleaned.startsWith('4')) return 'VISA';
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'MasterCard';
    if (cleaned.startsWith('34') || cleaned.startsWith('37')) return 'AMEX';
    
    return 'VISA'; // Default
  };

  const getCardIcon = () => {
    switch (card.type) {
      case 'VISA': return visaIcon;
      case 'MasterCard': return mastercardIcon;
      case 'VISA/MasterCard': return visaMastercardIcon;
      default: return null;
    }
  };

  const getNetworkIcon = (network: string) => {
    switch (network) {
      case 'MTN': return mtnIcon;
      case 'Vodafone': return vodafoneIcon;
      case 'AirtelTigo': return airteltigoIcon;
      default: return null;
    }
  };

  const handleSave = () => {
    if (type === 'card') {
      // Validate card before saving
      if (!isCardValid) {
        // Don't save if card is invalid
        return;
      }
      
      const cardData = {
        type: card.type,
        last4: card.number.slice(-4),
        number: card.number,
        expiry: card.expiry,
        cvv: card.cvv,
        fullNumber: card.number
      };
      
      // Save to checkout context
      setPaymentMethod(cardData);
      onSave && onSave(cardData);
      
      // Navigate to checkout screen
      router.push('/(root)/(tabs)/(checkout)/CheckoutScreen');
    } else {
      // Validate phone number before saving
      if (!validatePhoneNumberForNetwork(mobileMoney.phone, mobileMoney.network)) {
        // Don't save if phone number is invalid
        return;
      }
      
      const mobileData = {
        type: 'MobileMoney',
        network: mobileMoney.network,
        last4: mobileMoney.phone.slice(-4),
        phone: mobileMoney.phone,
      };
      
      // Save to checkout context
      setPaymentMethod(mobileData);
      onSave && onSave(mobileData);
      
      // Navigate to checkout screen
      router.push('/(root)/(tabs)/(checkout)/CheckoutScreen');
    }
  };

  const isCardValid = card.number && card.expiry && card.cvv && 
                   validateCardNumber(card.number) && 
                   validateExpiryDate(card.expiry) && 
                   validateCVV(card.cvv, card.type);
  const isMobileValid = mobileMoney.phone && validatePhoneNumberForNetwork(mobileMoney.phone, mobileMoney.network);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View className="flex-1">
        <ScrollView className="px-4 pt-4 pb-24">
          {type === 'card' ? (
            <>
              {/* Card Type Selector */}
              <View className="mb-4">
                <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-2">Card Type</Text>
                <View className="flex-row space-x-2">
                  {[
                    { type: 'VISA', icon: visaIcon },
                    { type: 'MasterCard', icon: mastercardIcon }
                  ].map(({ type: cardType, icon }) => (
                    <TouchableOpacity
                      key={cardType}
                      className={`p-3 rounded-lg flex-1 items-center ${
                        card.type === cardType ? 'bg-primary/10 border border-primary' : 'bg-neutral-10'
                      }`}
                      onPress={() => setCard({ ...card, type: cardType })}
                    >
                      <Image
                        source={icon}
                        className="w-12 h-8 mb-1"
                        resizeMode="contain"
                      />
                      <Text className={`font-Manrope ${
                        card.type === cardType ? 'text-primary' : 'text-text'
                      }`}>
                        {String(cardType)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Card Number */}
              <View className="mb-4">
                <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-2">Card Number</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(244, 237, 216, 0.5)',
                    borderColor: '#156651',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <AlignLeft color="#156651" size={20} style={{ marginRight: 8 }} />
                  <TextInput
                    style={{
                      flex: 1,
                      fontFamily: 'Manrope-Regular',
                      fontSize: 16,
                      color: '#222',
                      backgroundColor: 'transparent',
                      paddingVertical: 18, // Increased from 10 to 18
                      minHeight: 48,       // Ensures a minimum height
                    }}
                    placeholder="Enter Card Number"
                    placeholderTextColor="#B0B0B0"
                    keyboardType="numeric"
                    value={card.number}
                    onChangeText={(text) => {
                      const cleaned = text.replace(/\s+/g, '').replace(/[^\d]/g, '');
                      // Format card number with spaces (XXXX XXXX XXXX XXXX)
                      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
                      setCard({ 
                        ...card, 
                        number: formatted,
                        type: detectCardType(cleaned)
                      });
                    }}
                    maxLength={19} // 16 digits + 3 spaces
                  />
                </View>
                {/* Card validation message */}
                {card.number.length > 0 && !validateCardNumber(card.number) && (
                  <Text className="text-red-500 text-sm mt-1 font-Manrope">
                    Invalid card number
                  </Text>
                )}
              </View>

              {/* Expiry */}
              <View className="mb-4">
                <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-2">Expiry</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(244, 237, 216, 0.5)',
                    borderColor: '#156651',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Calendar color="#156651" size={20} style={{ marginRight: 8 }} /> {/* Changed icon */}
                  <TextInput
                    style={{
                      flex: 1,
                      fontFamily: 'Manrope-Regular',
                      fontSize: 16,
                      color: '#222',
                      backgroundColor: 'transparent',
                      paddingVertical: 18,
                      minHeight: 48,
                    }}
                    placeholder="MM-YY"
                    maxLength={5}
                    value={card.expiry}
                    onChangeText={(text) => {
                      // Remove any non-digit characters
                      const cleaned = text.replace(/\D/g, '');
                      
                      // Format as MM-YY
                      let formatted = cleaned;
                      if (cleaned.length >= 2) {
                        formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
                      }
                      
                      setCard({ ...card, expiry: formatted });
                    }}
                    keyboardType="numeric"
                    placeholderTextColor="#B0B0B0"
                  />
                </View>
                {/* Expiry validation message */}
                {card.expiry.length > 0 && !validateExpiryDate(card.expiry) && (
                  <Text className="text-red-500 text-sm mt-1 font-Manrope">
                    Invalid expiry date or card is expired
                  </Text>
                )}
              </View>

              {/* CVV */}
              <View className="mb-6">
                <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-2">CVV</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(244, 237, 216, 0.5)',
                    borderColor: '#156651',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Shield color="#156651" size={20} style={{ marginRight: 8 }} /> {/* Changed icon */}
                  <TextInput
                    style={{
                      flex: 1,
                      fontFamily: 'Manrope-Regular',
                      fontSize: 16,
                      color: '#222',
                      backgroundColor: 'transparent',
                      paddingVertical: 18, // Increased
                      minHeight: 48,       // Ensures a minimum height
                    }}
                    placeholder="CVV"
                    placeholderTextColor="#B0B0B0"
                    keyboardType="numeric"
                    secureTextEntry
                    value={card.cvv}
                    onChangeText={(text) => {
                      // Limit to 3 or 4 digits based on card type
                      const maxLength = card.type === 'AMEX' ? 4 : 3;
                      const cleaned = text.replace(/\D/g, '').slice(0, maxLength);
                      setCard({ ...card, cvv: cleaned });
                    }}
                    maxLength={card.type === 'AMEX' ? 4 : 3}
                  />
                </View>
                {/* CVV validation message */}
                {card.cvv.length > 0 && !validateCVV(card.cvv, card.type) && (
                  <Text className="text-red-500 text-sm mt-1 font-Manrope">
                    Invalid CVV ({card.type === 'AMEX' ? '4' : '3'} digits required)
                  </Text>
                )}
              </View>

            
              
            </>
          ) : (
            <>
              {/* Network Selector */}
              <View className="mb-4">
                <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-2">Network Type</Text>
                <View className="flex-row space-x-2">
                  {['MTN', 'Vodafone', 'AirtelTigo'].map(network => (
                    <TouchableOpacity
                      key={network}
                      className={`p-3 rounded-lg flex-1 items-center ${
                        mobileMoney.network === network ? 'bg-primary/10 border border-primary' : 'bg-neutral-10'
                      }`}
                      onPress={() => setMobileMoney({...mobileMoney, network})}
                    >
                      <Image 
                        source={getNetworkIcon(network)} // Pass network here
                        className="w-12 h-8 mb-1" 
                        resizeMode="contain"
                      />
                      <Text className={`font-Manrope ${
                        mobileMoney.network === network ? 'text-primary' : 'text-text'
                      }`}>
                        {String(network)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {/* Network format hints */}
                <Text className="text-xs text-neutral-60 mt-2 font-Manrope">
                  {mobileMoney.network === 'MTN' && 'MTN: 024, 025, 053, 054, 055, 059'}
                  {mobileMoney.network === 'Vodafone' && 'Vodafone: 020, 050, 051, 052, 056'}
                  {mobileMoney.network === 'AirtelTigo' && 'AirtelTigo: 026, 027, 028, 057, 058'}
                </Text>
              </View>

              {/* Phone Number */}
              <View className="mb-6">
                <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-2">Phone Number</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(244, 237, 216, 0.5)',
                    borderColor: '#156651',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <AlignLeft color="#156651" size={20} style={{ marginRight: 8 }} />
                  <TextInput
                    style={{
                      flex: 1,
                      fontFamily: 'Manrope-Regular',
                      fontSize: 16,
                      color: '#222',
                      backgroundColor: 'transparent',
                      paddingVertical: 10,
                    }}
                    placeholder="0XX XXX XXXX"
                    placeholderTextColor="#B0B0B0"
                    keyboardType="phone-pad"
                    value={mobileMoney.phone}
                    onChangeText={(text) => {
                      const formatted = formatGhanaianPhoneNumber(text);
                      setMobileMoney({ ...mobileMoney, phone: formatted });
                    }}
                    maxLength={12} // "0XX XXX XXXX" = 12 characters with spaces
                  />
                </View>
                {/* Validation message */}
                {mobileMoney.phone.length > 0 && !validatePhoneNumberForNetwork(mobileMoney.phone, mobileMoney.network) && (
                  <Text className="text-red-500 text-sm mt-1 font-Manrope">
                    Invalid {mobileMoney.network} phone number
                  </Text>
                )}
              </View>
            </>
          )}

          {/* Save Button */}
          <View style={{ marginTop: 32 }}>
            <TouchableOpacity
              className={`${(type === 'card' && isCardValid) || (type === 'mobile' && isMobileValid) ? 'bg-primary' : 'bg-gray-400'} rounded-lg p-4 items-center`}
              onPress={handleSave}
              disabled={type === 'card' ? !isCardValid : !isMobileValid}
            >
              <Text className="text-BodyBold font-Manrope text-neutral-10">
                {type === 'card' ? String('Add Card') : String('Confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PaymentFormScreen;