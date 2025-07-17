import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Info } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const OrderDetailsPage = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Navigate to a specific screen if can't go back
      router.replace('/(orders)/TransactionPage');
    }
  };

  // Mock data for different orders with their respective items
  const getOrderDetails = (orderId: string) => {
    const orderData = {
      'SWM93284': {
        id: 'SWM93284',
        items: [
          {
            id: 1,
            name: 'DEXO',
            price: 230.00,
            quantity: 1,
            image: require('../../assets/images/yellow-chair.png'),
            description: 'Comfortable ergonomic office chair',
            status: 'In Progress'
          },
          {
            id: 2,
            name: 'Office Supplies',
            price: 44.13,
            quantity: 1,
            image: require('../../assets/images/buildingblocks.jpeg'),
            description: 'Various office supplies',
            status: 'In Progress'
          }
        ]
      },
      'SWM96254': {
        id: 'SWM96254',
        items: [
          {
            id: 1,
            name: 'REXO',
            price: 590.13,
            quantity: 1,
            image: require('../../assets/images/sofa.jpeg'),
            description: 'Modern living room sofa',
            status: 'Received'
          },
          {
            id: 2,
            name: 'Apple Device',
            price: 508.00,
            quantity: 1,
            image: require('../../assets/images/computer.png'),
            description: 'Apple electronic device',
            status: 'Received'
          }
        ]
      },
      'SWM87456': {
        id: 'SWM87456',
        items: [
          {
            id: 1,
            name: 'NEXO',
            price: 450.75,
            quantity: 1,
            image: require('../../assets/images/diningtable.jpeg'),
            description: 'Elegant dining table',
            status: 'Completed'
          }
        ]
      },
      'SWM78901': {
        id: 'SWM78901',
        items: [
          {
            id: 1,
            name: 'Wireless Headphones',
            price: 320.50,
            quantity: 1,
            image: require('../../assets/images/computer.png'),
            description: 'High-quality wireless headphones',
            status: 'Completed'
          }
        ]
      },
      'SWM65432': {
        id: 'SWM65432',
        items: [
          {
            id: 1,
            name: 'Phone Case',
            price: 45.00,
            quantity: 1,
            image: require('../../assets/images/buildingblocks.jpeg'),
            description: 'Protective phone case',
            status: 'In Progress'
          },
          {
            id: 2,
            name: 'Screen Protector',
            price: 111.75,
            quantity: 1,
            image: require('../../assets/images/buildingblocks.jpeg'),
            description: 'Tempered glass screen protector',
            status: 'In Progress'
          }
        ]
      }
    };

    return orderData[orderId as keyof typeof orderData] || orderData['SWM93284'];
  };

  const orderDetails = getOrderDetails(orderId as string);

  const handleDetailPress = (itemId: number) => {
    // Navigate to item detail page using OrderInfoPage
    router.push({
      pathname: '/(orders)/OrderInfoPage',
      params: { 
        orderId: orderDetails.id,
        itemId: itemId.toString(),
        mode: 'item' // Flag to show item details instead of full order
      }
    });
  };

  const handleTrackPress = (itemId: number) => {
    // Navigate to tracking page
    router.push({
      pathname: '/(orders)/OrderTrackingPage',
      params: { 
        orderId: orderDetails.id,
        itemId: itemId.toString()
      }
    });
  };

  const handleLeaveReviewPress = (itemId: number) => {
    // Navigate to leave review page
    router.push({
      pathname: '/(orders)/LeaveReviewPage',
      params: { 
        orderId: orderDetails.id,
        itemId: itemId.toString()
      }
    });
  };

  const handleReceivedPress = (itemId: number) => {
    // Mark order as completed when received is clicked
    // In a real app, this would update the backend
    // For now, we'll just navigate to order info showing received status
    router.push({
      pathname: '/(orders)/OrderInfoPage',
      params: { 
        orderId: orderDetails.id,
        itemId: itemId.toString(),
        mode: 'received', // Flag to show order received status
        statusUpdate: 'completed' // Indicates the order should be marked as completed
      }
    });
  };

  const handleInfoPress = () => {
    // Navigate to full order details page
    router.push({
      pathname: '/(orders)/OrderInfoPage',
      params: { 
        orderId: orderDetails.id
        // No itemId or mode params - shows full order details
      }
    });
  };

  const getSecondaryButtonConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return {
          text: 'Track',
          onPress: handleTrackPress,
          style: 'bg-primary'
        };
      case 'received':
        return {
          text: 'Received',
          onPress: handleReceivedPress,
          style: 'bg-primary'
        };
      case 'completed':
        return {
          text: 'Leave a Review',
          onPress: handleLeaveReviewPress,
          style: 'bg-primary'
        };
      default:
        return {
          text: 'Track',
          onPress: handleTrackPress,
          style: 'bg-primary'
        };
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'border-secondary';
      case 'received':
        return 'border-primary';
      case 'completed':
        return 'border-primary';
      default:
        return 'border-secondary';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'text-secondary';
      case 'received':
        return 'text-primary';
      case 'completed':
        return 'text-primary';
      default:
        return 'text-secondary';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-center p-4 relative">
        <TouchableOpacity 
          onPress={handleBackPress}
          className="absolute left-4"
        >
          <ChevronLeft size={24} color="#156651" />
        </TouchableOpacity>
        <Text className="text-Heading3 font-Manrope text-text">Order #{orderDetails.id}</Text>
        <TouchableOpacity 
          className="absolute right-4"
          onPress={handleInfoPress}
        >
          <Info size={24} color="#156651" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-2">
        {/* Order Items */}
        {orderDetails.items.map((item) => (
          <View key={item.id} className="bg-white rounded-xl p-4 mb-8" style={{ 
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 8,
          }}>
            {/* Order Status Badge - Top Right */}
            <View className="absolute top-4 right-4">
              <View className={`border ${getStatusBadgeColor(item.status)} px-3 py-1 rounded`}>
                <Text className={`text-sm font-Manrope ${getStatusTextColor(item.status)}`}>
                  {item.status}
                </Text>
              </View>
            </View>

            <View className="flex-row mb-4">
              {/* Product Image */}
              <View className="w-28 h-28 rounded-lg overflow-hidden mr-4">
                <Image 
                  source={item.image} 
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Product Details */}
              <View className="flex-1">
                <Text className="text-BodyBold font-Manrope text-text mb-1">{item.name}</Text>
                <Text className="text-BodyBold font-Manrope text-text mb-2">${item.price.toFixed(2)}</Text>
                <Text className="text-BodySmallRegular font-Manrope text-neutral-60">
                  Qty: {item.quantity}
                </Text>
              </View>
            </View>

            {/* Action Buttons Below Image */}
            <View className="flex-row space-x-2 flex justify-between gap-2 ">
              <TouchableOpacity
                onPress={() => handleDetailPress(item.id)}
                className="flex-1 border border-primary rounded-lg py-3 px-4"
              >
                <Text className="text-primary text-center font-Manrope text-BodySmallBold">
                  Detail
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const buttonConfig = getSecondaryButtonConfig(item.status);
                  buttonConfig.onPress(item.id);
                }}
                className={`flex-1 ${getSecondaryButtonConfig(item.status).style} rounded-lg py-3 px-4`}
              >
                <Text className="text-white text-center font-Manrope text-BodySmallBold">
                  {getSecondaryButtonConfig(item.status).text}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsPage;
