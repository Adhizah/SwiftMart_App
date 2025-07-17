import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { OrderListItem } from '../types';

interface OrderCardProps {
  order: OrderListItem;
  onPress: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'border-secondary text-secondary';
      case 'received':
        return 'border-primary text-primary';
      case 'completed':
        return 'border-primary text-primary';
      case 'cancelled':
        return 'border-red-400 text-red-600';
      default:
        return 'border-gray-400 text-gray-600';
    }
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4"
      style={{ 
        height: 142,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 8,
      }}
      onPress={() => onPress(order.id)}
    >
      {/* Top Row: Order ID and Status */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-800 font-Manrope">
          Order #{order.id}
        </Text>
        <View className={`px-3 py-1 rounded border ${getStatusColor(order.status)}`}>
          <Text className={`text-sm font-Manrope ${getStatusColor(order.status).split(' ')[1]}`}>
            {order.status}
          </Text>
        </View>
      </View>

      {/* Content Row */}
      <View className="flex-row justify-between items-center">
        <View style={{ width: 154 }}>
          <Text className="text-gray-600 font-Manrope mb-1">
            Total Amount: <Text className="font-bold">${order.amount.toFixed(2)}</Text>
          </Text>
          <Text className="text-gray-600 font-Manrope">
            Size: <Text className="font-bold">{order.size}</Text>
          </Text>
        </View>
        
        {/* Chevron Right */}
        <View className="ml-4">
          <ChevronRight size={20} color="#666" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
