import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Package, Truck, Clock, CreditCard, MapPin, User, Star, ShoppingCart } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const OrderInfoPage = () => {
  const router = useRouter();
  const { orderId, itemId, mode } = useLocalSearchParams();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Navigate to a specific screen if can't go back
      router.replace('/(orders)/TransactionPage');
    }
  };

  // Mock comprehensive order data
  const getOrderStatus = (orderId: string) => {
    // Map order IDs to their statuses from OrderDetailsPage
    const statusMap: Record<string, string> = {
      'SWM93284': 'In Progress',
      'SWM96254': 'In Progress', 
      'SWM87456': 'Completed',
      'SWM78901': 'Completed',
      'SWM65432': 'Cancelled'
    };
    return statusMap[orderId] || 'In Progress';
  };

  const orderInfo = {
    id: orderId || 'SWM93284',
    status: getOrderStatus(orderId as string || 'SWM93284'),
    amount: 274.13,
    orderDate: '2024-01-10',
    estimatedDelivery: '2024-01-15',
    items: [
      {
        id: 1,
        name: 'DEXO',
        price: 230.00,
        quantity: 1,
        description: 'Comfortable ergonomic office chair with lumbar support and adjustable height. Perfect for long working hours.',
        sku: 'DEXO-001',
        category: 'Furniture',
        image: require('../../assets/images/yellow-chair.png'),
        rating: 4.5,
        reviews: 128,
        features: ['Ergonomic Design', 'Lumbar Support', 'Adjustable Height', 'Swivel Base']
      },
      {
        id: 2,
        name: 'REXO',
        price: 230.00,
        quantity: 1,
        description: 'Modern living room sofa with premium fabric and comfortable cushioning.',
        sku: 'REXO-002',
        category: 'Furniture',
        image: require('../../assets/images/sofa.jpeg'),
        rating: 4.3,
        reviews: 89,
        features: ['Premium Fabric', 'Comfortable Cushioning', 'Modern Design', 'Durable Frame']
      }
    ],
    customer: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567'
    },
    shipping: {
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      method: 'Standard Delivery',
      carrier: 'UPS',
      trackingNumber: '1Z999AA1234567890'
    },
    payment: {
      method: 'Credit Card',
      cardType: 'Visa',
      last4: '1234',
      billingAddress: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    },
    timeline: [
      { status: 'Order Placed', date: '2024-01-10', time: '10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: '2024-01-10', time: '10:35 AM', completed: true },
      { status: 'Processing', date: '2024-01-11', time: '2:15 PM', completed: true },
      { status: 'Shipped', date: '2024-01-12', time: '9:00 AM', completed: true },
      { status: 'Out for Delivery', date: '2024-01-15', time: 'Pending', completed: false },
      { status: 'Delivered', date: '2024-01-15', time: 'Pending', completed: false }
    ],
    totals: {
      subtotal: 230.00,
      shipping: 15.00,
      tax: 29.13,
      total: 274.13
    }
  };

  const InfoCard = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: any }) => (
    <View className="bg-white rounded-xl p-4 mb-4" style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 8,
    }}>
      <View className="flex-row items-center mb-3">
        <Icon size={20} color="#156651" />
        <Text className="text-BodyBold font-Manrope text-text ml-2">{title}</Text>
      </View>
      {children}
    </View>
  );

  // If mode is 'item', show item details
  if (mode === 'item' && itemId) {
    const item = orderInfo.items.find(i => i.id === parseInt(itemId as string));
    
    if (!item) {
      return (
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 justify-center items-center">
            <Text className="text-BodyRegular font-Manrope text-neutral-60">Item not found</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-center p-4 relative">        <TouchableOpacity 
          onPress={handleBackPress}
          className="absolute left-4"
        >
            <ChevronLeft size={24} color="#156651" />
          </TouchableOpacity>
          <Text className="text-Heading3 font-Manrope text-text">Item Details</Text>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Product Image */}
          <View className="items-center mb-6">
            <View className="w-48 h-48 rounded-2xl overflow-hidden">
              <Image 
                source={item.image} 
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Product Info */}
          <InfoCard title="Product Information" icon={Package}>
            <View className="space-y-3">
              <View>
                <Text className="text-BodyBold font-Manrope text-text text-2xl mb-2">{item.name}</Text>
                <Text className="text-BodyBold font-Manrope text-primary text-xl">${item.price.toFixed(2)}</Text>
              </View>
              <View className="flex-row items-center">
                <Star size={16} color="#156651" fill="#156651" />
                <Text className="text-BodyRegular font-Manrope text-text ml-1">
                  {item.rating} ({item.reviews} reviews)
                </Text>
              </View>
              <View>
                <Text className="text-BodyRegular font-Manrope text-neutral-60 mb-1">Description</Text>
                <Text className="text-BodyRegular font-Manrope text-text">{item.description}</Text>
              </View>
              <View>
                <Text className="text-BodyRegular font-Manrope text-neutral-60 mb-1">SKU</Text>
                <Text className="text-BodyRegular font-Manrope text-text">{item.sku}</Text>
              </View>
              <View>
                <Text className="text-BodyRegular font-Manrope text-neutral-60 mb-1">Category</Text>
                <Text className="text-BodyRegular font-Manrope text-text">{item.category}</Text>
              </View>
              <View>
                <Text className="text-BodyRegular font-Manrope text-neutral-60 mb-1">Quantity Ordered</Text>
                <Text className="text-BodyRegular font-Manrope text-text">{item.quantity}</Text>
              </View>
            </View>
          </InfoCard>

          {/* Features */}
          <InfoCard title="Features" icon={Star}>
            <View className="space-y-2">
              {item.features.map((feature, index) => (
                <View key={index} className="flex-row items-center">
                  <View className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <Text className="text-BodyRegular font-Manrope text-text">{feature}</Text>
                </View>
              ))}
            </View>
          </InfoCard>

          {/* Order Context */}
          <InfoCard title="Order Context" icon={ShoppingCart}>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-BodyRegular font-Manrope text-neutral-60">Order ID</Text>
                <Text className="text-BodyRegular font-Manrope text-text">#{orderInfo.id}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-BodyRegular font-Manrope text-neutral-60">Order Date</Text>
                <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.orderDate}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-BodyRegular font-Manrope text-neutral-60">Status</Text>
                <Text className="text-BodyRegular font-Manrope text-secondary">{orderInfo.status}</Text>
              </View>
            </View>
          </InfoCard>

          {/* Action Buttons */}
          <View className="flex-row flex justify-between gap-2 mt-4">
            <TouchableOpacity
              className="flex-1 bg-primary py-3 rounded-lg"
              onPress={() => router.push({
                pathname: '/(orders)/OrderTrackingPage',
                params: { orderId: orderInfo.id, itemId: item.id.toString() }
              })}
            >
              <Text className="text-white text-center font-Manrope font-medium">Track Item</Text>
            </TouchableOpacity>
            {orderInfo.status.toLowerCase() === 'completed' ? (
              <TouchableOpacity
                className="flex-1 border border-primary py-3 rounded-lg"
                onPress={() => router.push({
                  pathname: '/(orders)/LeaveReviewPage',
                  params: { orderId: orderInfo.id, itemId: item.id.toString() }
                })}
              >
                <Text className="text-primary text-center font-Manrope font-medium">Leave Review</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
        <Text className="text-Heading3 font-Manrope text-text">Order Details</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Order Summary */}
        <InfoCard title="Order Summary" icon={Package}>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Order ID</Text>
              <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.id}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Date</Text>
              <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.orderDate}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Status</Text>
              <View className="bg-yellow-100 px-2 py-1 rounded">
                <Text className="text-xs font-Manrope text-yellow-800">{orderInfo.status}</Text>
              </View>
            </View>
          </View>
        </InfoCard>

        {/* Order Items */}
        <InfoCard title="Order Items" icon={Package}>
          <View className="space-y-4">
            {orderInfo.items.map((item, index) => (
              <View key={item.id} className="flex-row items-center">
                <View className="w-16 h-16 rounded-lg overflow-hidden mr-3">
                  <Image 
                    source={item.image} 
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-BodyBold font-Manrope text-text">{item.name}</Text>
                  <Text className="text-BodyRegular font-Manrope text-neutral-60">
                    Qty: {item.quantity} • ${item.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </InfoCard>

        {/* Customer Information */}
        <InfoCard title="Customer Information" icon={User}>
          <View className="space-y-2">
            <View>
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Name</Text>
              <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.customer.name}</Text>
            </View>
            <View>
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Email</Text>
              <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.customer.email}</Text>
            </View>
            <View>
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Phone</Text>
              <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.customer.phone}</Text>
            </View>
          </View>
        </InfoCard>

        {/* Shipping Information */}
        <InfoCard title="Shipping Information" icon={MapPin}>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Address</Text>
              <Text className="text-BodyRegular font-Manrope text-text flex-1 text-right">
                {orderInfo.shipping.address.street}, {orderInfo.shipping.address.city}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">State</Text>
              <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.shipping.address.state}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Zip Code</Text>
              <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.shipping.address.zipCode}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Country</Text>
              <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.shipping.address.country}</Text>
            </View>
          </View>
        </InfoCard>

        {/* Payment Information */}
        <InfoCard title="Payment Information" icon={CreditCard}>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Method</Text>
              <Text className="text-BodyRegular font-Manrope text-text">{orderInfo.payment.method}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Subtotal</Text>
              <Text className="text-BodyRegular font-Manrope text-text">${orderInfo.totals.subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Shipping</Text>
              <Text className="text-BodyRegular font-Manrope text-text">${orderInfo.totals.shipping.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-BodyRegular font-Manrope text-neutral-60">Tax</Text>
              <Text className="text-BodyRegular font-Manrope text-text">${orderInfo.totals.tax.toFixed(2)}</Text>
            </View>
            <View className="border-t border-neutral-200 pt-2 mt-2">
              <View className="flex-row justify-between">
                <Text className="text-BodyBold font-Manrope text-text">Total</Text>
                <Text className="text-BodyBold font-Manrope text-primary">${orderInfo.totals.total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </InfoCard>

        {/* Action Buttons */}
        <View className="flex-row space-x-6 mt-4">
          <TouchableOpacity
            className="flex-1 bg-primary py-3 rounded-lg"
            onPress={() => router.push({
              pathname: '/(orders)/OrderTrackingPage',
              params: { orderId: orderInfo.id }
            })}
          >
            <Text className="text-white text-center font-Manrope font-medium">Track Order</Text>
          </TouchableOpacity>
          {orderInfo.status.toLowerCase() === 'completed' ? (
            <TouchableOpacity
              className="flex-1 border border-primary py-3 rounded-lg"
              onPress={() => router.push({
                pathname: '/(orders)/LeaveReviewPage',
                params: { orderId: orderInfo.id }
              })}
            >
              <Text className="text-primary text-center font-Manrope font-medium">Leave Review</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderInfoPage;
