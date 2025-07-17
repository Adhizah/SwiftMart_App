import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface OrderTrackingData {
  orderId: string;
  orderPlacedDate: string;
  orderPlacedTime: string;
  paymentCompletedDate: string;
  paymentCompletedTime: string;
  shipmentStatus: 'Not Completed' | 'Completed' | 'In Progress';
  shipmentDate?: string;
  orderReceivedStatus: 'Not Received' | 'Received' | 'In Progress';
  orderReceivedDate?: string;
  paymentMethod: string;
}

const OrderTrackingPage = () => {
  const router = useRouter();
  const { orderId, itemId } = useLocalSearchParams();

  // Mock data - this would come from your backend API
  const trackingData: OrderTrackingData = {
    orderId: (orderId as string) || 'SWM93284',
    orderPlacedDate: 'Jan 11, 2025',
    orderPlacedTime: '07:44',
    paymentCompletedDate: 'Jan 11, 2025',
    paymentCompletedTime: '07:44',
    shipmentStatus: 'Not Completed',
    orderReceivedStatus: 'Not Received',
    paymentMethod: 'Credit/Debit card'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Received':
        return 'text-primary';
      case 'In Progress':
        return 'text-secondary';
      case 'Not Completed':
      case 'Not Received':
      default:
        return 'text-secondary';
    }
  };

  const formatDateTime = (date: string, time: string) => {
    return `${date}, ${time}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-center p-4 relative">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="absolute left-4"
        >
          <ChevronLeft size={24} color="#156651" />
        </TouchableOpacity>
        <Text className="text-Heading3 font-Manrope text-text">Order Info</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-2">
        {/* Order Info and Order ID on same line */}
        <View className="flex-row items-center mb-5">
          <Text className="text-BodyRegular font-Manrope text-neutral-60" style={{ width: '60%' }}>
            Order ID
          </Text>
          <Text className="text-BodyBold font-Manrope text-text flex-1">
            #{trackingData.orderId}
          </Text>
        </View>

        {/* Order Placed */}
        <View className="flex-row items-center mb-5">
          <Text className="text-BodyRegular font-Manrope text-neutral-60" style={{ width: '60%' }}>
            Order placed on
          </Text>
          <Text className="text-BodyBold font-Manrope text-text flex-1">
            {formatDateTime(trackingData.orderPlacedDate, trackingData.orderPlacedTime)}
          </Text>
        </View>

        {/* Payment Completed */}
        <View className="flex-row items-center mb-5">
          <Text className="text-BodyRegular font-Manrope text-neutral-60" style={{ width: '60%' }}>
            Payment completed on
          </Text>
          <Text className="text-BodyBold font-Manrope text-text flex-1">
            {formatDateTime(trackingData.paymentCompletedDate, trackingData.paymentCompletedTime)}
          </Text>
        </View>

        {/* Shipment Completed */}
        <View className="flex-row items-center mb-5">
          <Text className="text-BodyRegular font-Manrope text-neutral-60" style={{ width: '60%' }}>
            Shipment completed on
          </Text>
          <Text className={`text-BodyBold font-Manrope flex-1 ${getStatusColor(trackingData.shipmentStatus)}`}>
            {trackingData.shipmentStatus === 'Completed' && trackingData.shipmentDate
              ? trackingData.shipmentDate
              : trackingData.shipmentStatus}
          </Text>
        </View>

        {/* Order Received */}
        <View className="flex-row items-center mb-5">
          <Text className="text-BodyRegular font-Manrope text-neutral-60" style={{ width: '60%' }}>
            Order received on
          </Text>
          <Text className={`text-BodyBold font-Manrope flex-1 ${getStatusColor(trackingData.orderReceivedStatus)}`}>
            {trackingData.orderReceivedStatus === 'Received' && trackingData.orderReceivedDate
              ? trackingData.orderReceivedDate
              : trackingData.orderReceivedStatus}
          </Text>
        </View>

        {/* Payment Method */}
        <View className="flex-row items-center mb-5">
          <Text className="text-BodyRegular font-Manrope text-neutral-60" style={{ width: '60%' }}>
            Payment method
          </Text>
          <Text className="text-BodyBold font-Manrope text-text flex-1">
            {trackingData.paymentMethod}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTrackingPage;
