import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Dimensions, TouchableOpacity, Image, PanResponder, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Button from "@/components/Button";
import { useRouter } from 'expo-router';

type OrderStatusModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onTrackOrder?: () => void;
  onGoToHomePage?: () => void;
  onRetry?: () => void;
  onContactSupport?: () => void;
  // Payment validation
  paymentDetails?: {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    paymentMethod?: string;
    phone?: string;
    network?: string;
  };
  // Address validation
  addressDetails?: {
    country: string;
    countryCode: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    region: string;
    zipCode: string;
    isDefault: boolean;
  };
};

const { height } = Dimensions.get('window');

type OrderStatus = 'processing' | 'success' | 'failed';

// Removed ADDRESS constant as it's not needed in this modal

export default function OrderStatusModal({ 
  isVisible, 
  onClose,
  onTrackOrder,
  onGoToHomePage,
  onRetry,
  onContactSupport,
  paymentDetails,
  addressDetails
}: OrderStatusModalProps) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>('processing');

  const handleGoToHome = () => {
    onClose(); // Close the modal first
    router.replace('/(root)/(tabs)/Home'); // Navigate directly to the Home screen
  };
  const [pan] = useState(new Animated.ValueXY());
  const spinAnimation = useState(new Animated.Value(0))[0];

  // Create the spinning animation
  useEffect(() => {
    if (status === 'processing') {
      Animated.loop(
        Animated.timing(spinAnimation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnimation.setValue(0);
    }
  }, [status]);

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) { // Only allow downward swipe
        Animated.event([null, { dy: pan.y }], {
          useNativeDriver: false,
        })(e, gestureState);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 50) { // If swiped down more than 50 units
        onClose();
      } else {
        Animated.spring(pan.y, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Reset pan value when modal opens
  useEffect(() => {
    if (isVisible) {
      pan.setValue({ x: 0, y: 0 });
    }
  }, [isVisible]);

  const validatePaymentDetails = (payment?: OrderStatusModalProps['paymentDetails']) => {
    if (!payment || !payment.paymentMethod) return false;
    
    const { paymentMethod, cardNumber, phone, network, expiryDate, cvv } = payment;
    
    // For Mobile Money validation
    if (paymentMethod === 'MobileMoney') {
      if (!phone || !network) return false;
      
      // Validate Ghanaian mobile money numbers
      const cleanPhone = phone.replace(/\s+/g, '').replace(/[^\d]/g, '');
      
      // Check if phone number is valid for the selected network
      switch (network) {
        case 'MTN':
          // MTN numbers: 024, 025, 053, 054, 055, 059
          return /^0(24|25|53|54|55|59)\d{7}$/.test(cleanPhone);
        case 'Vodafone':
          // Vodafone numbers: 020, 050, 051, 052, 056
          return /^0(20|50|51|52|56)\d{7}$/.test(cleanPhone);
        case 'AirtelTigo':
          // AirtelTigo numbers: 026, 027, 028, 057, 058
          return /^0(26|27|28|57|58)\d{7}$/.test(cleanPhone);
        default:
          return false;
      }
    }
    
    // For Card payments
    if (paymentMethod === 'VISA' || paymentMethod === 'MasterCard' || paymentMethod === 'VISA/MasterCard') {
      if (!cardNumber) return false;
      
      const cleanCardNumber = cardNumber.replace(/\s+/g, '').replace(/[^\d]/g, '');
      
      // Basic card number validation (Luhn algorithm)
      const validateCardNumberLuhn = (number: string) => {
        let sum = 0;
        let isEvenIndex = false;
        
        for (let i = number.length - 1; i >= 0; i--) {
          let digit = parseInt(number[i]);
          
          if (isEvenIndex) {
            digit *= 2;
            if (digit > 9) digit -= 9;
          }
          
          sum += digit;
          isEvenIndex = !isEvenIndex;
        }
        
        return sum % 10 === 0;
      };
      
      // Check card number length and Luhn validation
      const isValidCardNumber = cleanCardNumber.length >= 13 && 
                               cleanCardNumber.length <= 19 && 
                               validateCardNumberLuhn(cleanCardNumber);
      
      // If expiry date is provided, validate it
      let isValidExpiry = true;
      if (expiryDate) {
        const [month, year] = expiryDate.split('-');
        const monthNum = parseInt(month);
        const yearNum = parseInt('20' + year);
        
        if (monthNum < 1 || monthNum > 12) {
          isValidExpiry = false;
        } else {
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1;
          
          if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
            isValidExpiry = false;
          }
        }
      }
      
      // If CVV is provided, validate it
      let isValidCVV = true;
      if (cvv) {
        // Most cards use 3 digits, American Express uses 4
        const expectedLength = 3; // Default to 3 for VISA/MasterCard
        isValidCVV = cvv.length === expectedLength && /^\d+$/.test(cvv);
      }
      
      return isValidCardNumber && isValidExpiry && isValidCVV;
    }
    
    return false;
  };

  const validateAddressDetails = (address?: OrderStatusModalProps['addressDetails']) => {
    if (!address) return false;
    
    // We just need the essential address fields
    const { street, city, country, name, phone } = address;
    
    // Basic validation - check if essential fields exist and aren't empty
    const hasValidName = name && name.trim().length >= 2;
    const hasValidStreet = street && street.trim().length >= 5;
    const hasValidCity = city && city.trim().length >= 2;
    const hasValidCountry = country && country.trim().length >= 2;
    const hasValidPhone = phone && phone.trim().length >= 10;
    
    return !!(
      hasValidName &&
      hasValidStreet &&
      hasValidCity &&
      hasValidCountry &&
      hasValidPhone
    );
  };

  useEffect(() => {
    if (isVisible && status === 'processing') {
      const validateOrderDetails = async () => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Detailed payment validation logging
          console.log('Payment Details:', {
            received: !!paymentDetails,
            paymentMethod: paymentDetails?.paymentMethod || 'none',
            phone: paymentDetails?.phone || 'none',
            network: paymentDetails?.network || 'none',
            cardNumber: paymentDetails?.cardNumber ? 'present' : 'none',
            expiryDate: paymentDetails?.expiryDate || 'none',
            cvv: paymentDetails?.cvv ? 'present' : 'none',
            hasPaymentDetails: !!paymentDetails,
          });

          // Detailed address validation logging
          console.log('Address Details:', {
            received: !!addressDetails,
            hasAddressDetails: !!addressDetails,
            fields: addressDetails ? {
              street: !!addressDetails.street && addressDetails.street.trim().length >= 5,
              city: !!addressDetails.city && addressDetails.city.trim().length >= 2,
              country: !!addressDetails.country && addressDetails.country.trim().length >= 2,
              name: !!addressDetails.name && addressDetails.name.trim().length >= 2,
              phone: !!addressDetails.phone && addressDetails.phone.trim().length >= 10,
              region: !!addressDetails.region && addressDetails.region.trim().length >= 2
            } : null
          });
          
          const hasValidPayment = validatePaymentDetails(paymentDetails);
          const hasValidAddress = validateAddressDetails(addressDetails);

          console.log('Final Validation Results:', {
            paymentValid: hasValidPayment,
            addressValid: hasValidAddress,
          });

          if (hasValidPayment && hasValidAddress) {
            setStatus('success');
          } else {
            setStatus('failed');
          }
        } catch (error) {
          console.error('Order processing error:', error);
          setStatus('failed');
        }
      };

      validateOrderDetails();
    }
  }, [isVisible, paymentDetails, addressDetails, status]);

  // Removed header and address render functions as they should not be in this modal

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <>
            <View className="w-40 h-40 rounded-full bg-[#E7F1EF] items-center justify-center mb-8">
              <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <MaterialCommunityIcons name="timer-sand" size={40} color="#fff" />
                </Animated.View>
              </View>
            </View>
            <Text className="text-2xl font-Manrope font-bold text-[#111] mb-4">Processing Order</Text>
            <Text className="text-[#666] text-center text-base leading-6">
              Please hold on while we confirm your payment.{'\n'}Don't close this app — This will only take{'\n'}a moment.
            </Text>
          </>
        );
      case 'success':
        return (
          <>
            <View className="w-40 h-40 rounded-full bg-[#E7F1EF] items-center justify-center mb-8">
              <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
                <MaterialIcons name="check" size={40} color="#fff" />
              </View>
            </View>
            <Text className="text-2xl font-Manrope font-bold text-[#111] mb-4">Order Successful</Text>
            <Text className="text-[#666] text-center text-base leading-6 mb-8">
              Congratulations! Your order has been{'\n'}placed successfully.
            </Text>
            <View className="w-full space-y-4">
              <Button 
                BtnText="Track Order"
                bgColor="bg-[#156651]"
                textColor="text-white"
                onPress={onTrackOrder}
                hasBorder={false}
              />
              <Button 
                BtnText="Go To HomePage"
                bgColor="bg-white"
                textColor="text-[#111]"
                hasBorder
                borderColor="border-neutral-200"
                onPress={handleGoToHome}
              />
            </View>
          </>
        );
      case 'failed':
        return (
          <>
            <View className="w-40 h-40 rounded-full bg-[#FFECEC] items-center justify-center mb-8">
              <View className="w-20 h-20 rounded-full bg-alert items-center justify-center">
                <MaterialIcons name="close" size={40} color="#fff" />
              </View>
            </View>
            <Text className="text-2xl font-Manrope font-bold text-[#111] mb-4">Order Failed</Text>
            <Text className="text-[#666] text-center text-base leading-6 mb-8">
              Sorry! We weren't able to place your order.
            </Text>
            <View className="w-full space-y-4">
              <Button 
                BtnText="Retry"
                bgColor="bg-alert"
                textColor="text-white"
                onPress={handleRetry}
                hasBorder={false}
              />
              <Button 
                BtnText="Contact Support"
                bgColor="bg-white"
                textColor="text-[#111]"
                hasBorder
                borderColor="border-neutral-200"
                onPress={onContactSupport}
              />
            </View>
          </>
        );
    }
  };

  const handleRetry = () => {
    setStatus('processing'); // Reset status to processing
    // The useEffect will automatically trigger the validation again
    // when the status changes to 'processing'
    if (onRetry) {
      onRetry(); // Call the parent's retry handler if provided
    }
  };

  // Reset status when modal is opened
  useEffect(() => {
    if (isVisible) {
      setStatus('processing');
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View className="flex-1 bg-black/50">
        <View className="flex-1 justify-end">
          <Animated.View 
            className="bg-white rounded-t-3xl"
            style={[
              {
                height: height * 0.55,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
                transform: [{ translateY: pan.y }],
              }
            ]}
            {...panResponder.panHandlers}
          >
            {/* Horizontal bar for closing modal */}
            <TouchableOpacity 
              className="w-full items-center pt-3 pb-2"
              onPress={onClose}
              activeOpacity={0.7}
            >
              <View className="w-16 h-1 bg-neutral-200 rounded-full" />
            </TouchableOpacity>
            
            {/* Content Container */}
            <View className="flex-1 px-6 items-center justify-center">
              {renderContent()}
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}